import React, {createContext, useCallback, useRef, useState,} from 'react';
import TrackPlayer, {Event, State, Track, useTrackPlayerEvents,} from 'react-native-track-player';
import {MediaContent} from '@/types';

type AudioContextType = {
  playContent: (content: MediaContent, queue?: MediaContent[]) => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  next: () => Promise<void>;
  prev: () => Promise<void>;
  isPlaying: boolean;
  isLoading: boolean;
  currentContent?: MediaContent;
};

export const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                         children,
                                                                       }) => {
  const queueRef = useRef<MediaContent[]>([]);
  const indexRef = useRef(0);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentContent, setCurrentContent] = useState<MediaContent>();
  
  // ===== TRACKPLAYER EVENTS =====
  useTrackPlayerEvents(
    [Event.PlaybackState, Event.PlaybackQueueEnded],
    async event => {
      if (event.type === Event.PlaybackState) {
        setIsPlaying(event.state === State.Playing);
        if (event.state === State.Playing) {
          setIsLoading(false);
        }
      }
      
      // ⭐ auto next (foreground + background)
      if (event.type === Event.PlaybackQueueEnded && !event.position) {
        await next();
      }
    }
  );
  
  // ===== INTERNAL =====
  const buildTrack = (c: MediaContent): Track => ({
    id: `${c.type}_${c.id}`,
    url: c.source_url,
    title: c.title,
    artist: c.artist,
    album: c.category,
    artwork: c.image_url,
  });
  
  const loadAndPlay = async (content: MediaContent) => {
    setIsLoading(true);
    setIsPlaying(true); // optimistic
    
    await TrackPlayer.reset();
    await TrackPlayer.add(buildTrack(content));
    await TrackPlayer.play();
    
    setCurrentContent(content);
  };
  
  // ===== PUBLIC API =====
  const playContent = async (
    content: MediaContent,
    list: MediaContent[] = []
  ) => {
    if (!list.length) list = [content];
    
    const idx = list.findIndex(
      t => t.id === content.id && t.type === content.type
    );
    if (idx === -1) return;
    
    queueRef.current = list;
    indexRef.current = idx;
    
    await loadAndPlay(content);
  };
  
  const play = async () => {
    if (!isPlaying) setIsPlaying(true);
    await TrackPlayer.play();
  };
  
  const pause = async () => {
    if (isPlaying) setIsPlaying(false);
    await TrackPlayer.pause();
  };
  
  const next = useCallback(async () => {
    const ni = indexRef.current + 1;
    const q = queueRef.current;
    if (!q[ni]) return;
    
    indexRef.current = ni;
    await loadAndPlay(q[ni]);
  }, []);
  
  const prev = async () => {
    const pi = indexRef.current - 1;
    const q = queueRef.current;
    if (!q[pi]) return;
    
    indexRef.current = pi;
    await loadAndPlay(q[pi]);
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
        currentContent,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
