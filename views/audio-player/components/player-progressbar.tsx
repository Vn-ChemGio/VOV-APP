import {useState} from "react";
import {StyleSheet, ViewProps} from 'react-native'
import {useColor} from "@/hooks";

export const PlayerProgressbar = ({style}: ViewProps) => {
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
  
  
  return null;
}

const styles = StyleSheet.create({
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 20,
  },
  timeText: {
    opacity: 0.75,
    letterSpacing: 0.7,
    fontWeight: '500',
  },
  progressBar: {
    // Additional styling if needed
  },
})
