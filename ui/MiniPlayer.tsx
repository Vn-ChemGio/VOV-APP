// src/ui/MiniPlayer.tsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useAudio } from '@/contexts/audio/AudioProvider';

export default function MiniPlayer() {
  const {
    currentTrack,
    isPlaying,
    play,
    pause,
    next,
  } = useAudio();
  
  // Không có track → không render (Spotify behavior)
  if (!currentTrack) return null;
  
  return (
    <View style={styles.container}>
      {/* Track info */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {currentTrack.title}
        </Text>
        {currentTrack.artist ? (
          <Text style={styles.artist} numberOfLines={1}>
            {currentTrack.artist}
          </Text>
        ) : null}
      </View>
      
      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={isPlaying ? pause : play}
          hitSlop={10}
        >
          <Text style={styles.controlText}>
            {isPlaying ? '⏸' : '▶️'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={next} hitSlop={10}>
          <Text style={styles.controlText}>⏭</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#333',
    backgroundColor: '#111',
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  artist: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  controlText: {
    color: '#fff',
    fontSize: 20,
  },
});
