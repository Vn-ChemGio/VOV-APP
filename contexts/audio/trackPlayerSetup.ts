import TrackPlayer, {
  Capability,
  AppKilledPlaybackBehavior,
} from 'react-native-track-player';

export async function setupTrackPlayer() {
  await TrackPlayer.setupPlayer({
    waitForBuffer: true,
  });
  
  await TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior:
      AppKilledPlaybackBehavior.ContinuePlayback,
    },
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
    progressUpdateEventInterval: 1,
  });
}
