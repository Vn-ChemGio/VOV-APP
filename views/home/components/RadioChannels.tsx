import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from '@/components/ui/view';
import {Text} from '@/components/ui/text';
import {useColor} from '@/hooks/useColor';
import CardRadioChannel from "@/components/features/CardRadioChannel";
import {HoveredProvider} from '@/contexts/hover/HoveredContext';
import appConfig from "@/configs/app.config";
import {useAudio} from "@/contexts/audio/AudioProvider";
import {RadioChannel, Track} from "@/types";

export const RadioChannels = ({data = []}: { data?: RadioChannel[] }) => {
  const backgroundColor = useColor('background');
  
  const {playTrack} = useAudio();
  const tracks = data.map((item, index) => ({
    ...item,
    id: item.id?.toString() || index.toString(),
    uri: item.source_url,
    image_url: `${appConfig.apiPrefix}${item.image_url}`,
    title: item.name,
    isOnline: index !== 4
  }));
  
  const handleTrackSelect = async (selectedTrack: Track) => {
    await playTrack(selectedTrack, tracks)
  }
  
  return (
    <HoveredProvider>
      <View style={[styles.container, {backgroundColor}]}>
        <Text variant="subtitle" style={styles.title}>Chương trình Radio</Text>
        <View style={styles.contentContainer}>
          <HoveredProvider>
            {tracks.map((item, idx) => (
              <CardRadioChannel {...{
                ...item,
                idx,
                handleTrackSelect
              }} key={`radio-${idx}`}/>
            ))}
          </HoveredProvider>
        </View>
      </View>
    </HoveredProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  title: {fontSize: 18},
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  }
})