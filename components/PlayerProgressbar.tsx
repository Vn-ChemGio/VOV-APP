import {colors, fontSize} from '@/constants/tokens'
import {defaultStyles} from '@/styles'
import {StyleSheet, Text, View, ViewProps} from 'react-native'
import {useCallback, useEffect, useState} from "react";
import {useColor} from "@/hooks/useColor";
import {AudioWaveform} from "@/components/ui/audio-waveform";
import {useAudio} from "@/contexts/audio/AudioProvider";
import {Progress} from "@/components/ui/progress";

export const PlayerProgressBar = ({style}: ViewProps) => {
  // Enhanced waveform data - more bars for smoother visualization
  const [waveformData] = useState<number[]>(
    Array.from({length: 60}, (_, i) => {
      // Create more varied and realistic waveform pattern
      const base1 = Math.sin((i / 60) * Math.PI * 6) * 0.4 + 0.5;
      const base2 = Math.sin((i / 60) * Math.PI * 2.5) * 0.3 + 0.4;
      const noise = (Math.random() - 0.5) * 0.25;
      const peak = Math.random() < 0.15 ? Math.random() * 0.4 : 0; // Occasional peaks
      return Math.max(0.15, Math.min(0.95, (base1 + base2) / 2 + noise + peak));
    })
  );
  
  // Theme colors
  const redColor = useColor('destructive');
  const mutedColor = useColor('textMuted');
  
  
  const {playerRef} = useAudio()
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current.isLoaded && !isSeeking) {
        const currentTime = playerRef.current.currentTime || 0;
        const totalDuration = playerRef.current.duration || 0;
        
        setDuration(totalDuration);
        setPosition(currentTime);
        
        // Check if the audio finished
        if (currentTime >= totalDuration && totalDuration > 0) {
          playerRef.current.seekTo(0);
          playerRef.current.pause(); // Ensure it's paused
        }
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [playerRef.current, isSeeking]);
  
  // Unified seeking function
  const seekToPosition = useCallback(
    (newPosition: number) => {
      if (playerRef.current.isLoaded && duration > 0) {
        const clampedPosition = Math.max(0, Math.min(duration, newPosition));
        playerRef.current.seekTo(clampedPosition).then(r => {
        });
        setPosition(clampedPosition);
      }
    },
    [playerRef.current, duration]
  );
  
  // Handle waveform seeking
  const handleWaveformSeek = useCallback(
    (seekPercentage: number) => {
      if (duration > 0) {
        const newPosition = (seekPercentage / 100) * duration;
        seekToPosition(newPosition);
      }
    },
    [duration, seekToPosition]
  );
  
  // Handle progress bar seeking
  const handleProgressSeek = useCallback(
    (progressValue: number) => {
      if (duration > 0) {
        const newPosition = (progressValue / 100) * duration;
        seekToPosition(newPosition);
      }
    },
    [duration, seekToPosition]
  );
  
  // Handle seeking start/end for smooth updates
  const handleSeekStart = useCallback(() => {
    setIsSeeking(true);
  }, []);
  
  const handleSeekEnd = useCallback(() => {
    setIsSeeking(false);
  }, []);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const progressPercentage = duration > 0 ? (position / duration) * 100 : 0;
  
  return (
    <View style={style}>
      <AudioWaveform
        data={waveformData}
        isPlaying={playerRef.current.playing}
        progress={progressPercentage}
        onSeek={handleWaveformSeek}
        onSeekStart={handleSeekStart}
        onSeekEnd={handleSeekEnd}
        height={80}
        barCount={60}
        barWidth={4}
        barGap={1.5}
        activeColor={redColor}
        inactiveColor={mutedColor}
        animated={true}
        showProgress={true}
        interactive={true} // Enable seeking
      />
      
      <Progress
        value={progressPercentage}
        onValueChange={handleProgressSeek}
        onSeekStart={handleSeekStart}
        onSeekEnd={handleSeekEnd}
        interactive={true}
        height={6}
        style={styles.progressBar}
      />
      
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        
        <Text style={styles.timeText}>
          {'-'} {formatTime(duration - position)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 20,
  },
  timeText: {
    ...defaultStyles.text,
    color: colors.text,
    opacity: 0.75,
    fontSize: fontSize.xs,
    letterSpacing: 0.7,
    fontWeight: '500',
  },
  progressBar: {
    // Additional styling if needed
  },
})
