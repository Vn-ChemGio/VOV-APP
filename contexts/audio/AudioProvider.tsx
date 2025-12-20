import React, {createContext, useCallback, useEffect, useRef, useState,} from 'react';
import {AudioPlayer, createAudioPlayer} from 'expo-audio';
import {MediaContent} from "@/types";

type AudioContextType = {
  playContent: (content: MediaContent, queue?: MediaContent[]) => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  next: () => Promise<void>;
  prev: () => Promise<void>;
  isPlaying: boolean;
  isLoading: boolean;
  currentContent?: MediaContent;
  playerRef: React.RefObject<AudioPlayer | null>;
};

export const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                         children,
                                                                       }) => {
  const playerRef = useRef<AudioPlayer>(null);
  
  const [queue, setQueue] = useState<MediaContent[]>([]);
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
  const loadAndPlay = async (content: MediaContent) => {
    const player = playerRef.current;
    if (!player) return;
    
    setIsLoading(true);
    setIsPlaying(true); // optimistic
    
    player.replace({
      uri: content.source_url,
    });
    
    // Set the lock screen metadata
    player.setActiveForLockScreen(true,
      {
        title: content.title,
        artist: content.artist,
        albumTitle: content.category,
        artworkUrl: content.image_url,
      },
      {
        showSeekBackward: true,
        showSeekForward: true,
      }
    );
    
    player.play();
  };
  
  // ===== PUBLIC API =====
  const playContent = async (content: MediaContent, list: MediaContent[] = []) => {
    if (!list.length) {
      list = [content];
    }
    
    const idx = list.findIndex(t => t.id === content.id && t.type === content.type);
    if (idx === -1) return;
    
    setQueue(list);
    setIndex(idx);
    
    await loadAndPlay(content);
  };
  
  const play = async () => {
    if (!isPlaying) setIsPlaying(true); // optimistic
    await playerRef.current?.play?.();
  };
  
  const pause = async () => {
    if (isPlaying) setIsPlaying(false); // optimistic
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
        playContent,
        play,
        pause,
        next,
        prev,
        isPlaying,
        isLoading,
        currentContent: queue[index],
        playerRef,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
