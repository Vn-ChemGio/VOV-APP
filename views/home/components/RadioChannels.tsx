import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from '@/components/ui/view';
import {Text} from '@/components/ui/text';
import CardRadioChannel from "@/components/features/CardRadioChannel";
import {useColor} from '@/hooks/useColor';
import {HoveredProvider} from '@/contexts/hover/HoveredContext';
import {RadioChannel} from "@/types";

export const RadioChannels = ({data = []}: { data?: RadioChannel[] }) => {
  const backgroundColor = useColor('background');
  return (
    <HoveredProvider>
      <View style={[styles.container, {backgroundColor}]}>
        <Text variant="subtitle" style={styles.title}>Chương trình Radio</Text>
        <View style={styles.contentContainer}>
          {data.map((item, idx) => (
            <CardRadioChannel {...{...item, idx}} key={`radio-${idx}`}/>
          ))}
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