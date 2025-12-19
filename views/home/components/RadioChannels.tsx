import React from 'react';
import {StyleSheet} from 'react-native';

import {View} from '@/components/ui/view';
import {Text} from '@/components/ui/text';

import {useAudio, useColor} from '@/hooks';
import {radioChannelToMediaContent} from "@/helpers";

import CardRadioChannel from "@/components/features/CardRadioChannel";
import {HoveredProvider} from '@/contexts/hover/HoveredContext';

import {MediaContent, RadioChannel} from "@/types";

export const RadioChannels = ({data = []}: { data?: RadioChannel[] }) => {
  const backgroundColor = useColor('background');
  
  const {playContent} = useAudio();
  const contents: MediaContent[] = data.map((item) => radioChannelToMediaContent(item));
  
  const handleTrackSelect = async (selectedChannel: RadioChannel) => {
    await playContent(radioChannelToMediaContent(selectedChannel), contents)
  }
  
  return (
    <HoveredProvider>
      <View style={[styles.container, {backgroundColor}]}>
        <Text variant="subtitle" style={styles.title}>Chương trình Radio</Text>
        <View style={styles.contentContainer}>
          <HoveredProvider>
            {data.map((item, idx) => (
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