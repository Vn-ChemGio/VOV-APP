// src/audio/AudioProvider.tsx

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import {AudioPlayer, createAudioPlayer} from 'expo-audio';
import {Track} from "@/types";

type AudioContextType = {
  playTrack: (track: Track, queue: Track[]) => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  next: () => Promise<void>;
  prev: () => Promise<void>;
  isPlaying: boolean;
  isLoading: boolean;
  currentTrack?: Track;
  playerRef: React.RefObject<AudioPlayer>;
};

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                         children,
                                                                       }) => {
  const playerRef = useRef<any>(null);
  
  const [queue, setQueue] = useState<Track[]>([]);
  const [index, setIndex] = useState(0);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // ===== INIT PLAYER =====
  useEffect(() => {
    const player = createAudioPlayer();
    playerRef.current = player;
    
    const sub = player.addListener(
      'playbackStatusUpdate',
      (status: any) => {
        // Sync isPlaying with native if needed
        if (typeof status?.isPlaying === 'boolean') {
          setIsPlaying(prev =>
            prev !== status.isPlaying ? status.isPlaying : prev
          );
          
          if (status.isPlaying) {
            setIsLoading(false); // load finished
          }
        }
        
        // ⭐ auto next (foreground + background)
        if (status?.didJustFinish) {
          next();
        }
      }
    );
    
    return () => {
      sub?.remove?.();
      player?.release?.();
      playerRef.current = null;
    };
  }, [next]);
  
  // ===== LOAD & PLAY =====
  const loadAndPlay = async (track: Track) => {
    const player = playerRef.current;
    if (!player) return;
    
    setIsLoading(true);
    setIsPlaying(true); // optimistic
    
    await player.replace({
      uri: track.uri,
      metadata: {
        title: track.title,
        artist: track.artist,
      },
    });
    
    await player.play();
  };
  
  // ===== PUBLIC API =====
  const playTrack = async (track: Track, list: Track[]) => {
    const idx = list.findIndex(t => t.id === track.id);
    if (idx === -1) return;
    
    setQueue(list);
    setIndex(idx);
    
    await loadAndPlay(track);
  };
  
  const play = async () => {
    if(!isPlaying) setIsPlaying(true); // optimistic
    await playerRef.current?.play?.();
  };
  
  const pause = async () => {
    if(isPlaying) setIsPlaying(false); // optimistic
    await playerRef.current?.pause?.();
  };
  
  const next = useCallback(async () => {
    setIndex(prev => {
      const ni = prev + 1;
      if (!queue[ni]) return prev;
      
      loadAndPlay(queue[ni]);
      return ni;
    });
  }, [queue]);
  
  const prev = async () => {
    const pi = index - 1;
    if (!queue[pi]) return;
    
    setIndex(pi);
    await loadAndPlay(queue[pi]);
  };
  
  return (
    <AudioContext.Provider
      value={{
        playTrack,
        play,
        pause,
        next,
        prev,
        isPlaying,
        isLoading,
        currentTrack: queue[index],
        playerRef,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error('useAudio must be used inside AudioProvider');
  }
  return ctx;
};
