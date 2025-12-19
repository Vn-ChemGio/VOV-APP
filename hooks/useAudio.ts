import {useContext} from "react";
import {AudioContext} from "@/contexts/audio/AudioProvider";

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error('useAudio must be used inside AudioProvider');
  }
  return ctx;
};
