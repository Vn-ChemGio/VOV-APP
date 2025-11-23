import React from 'react';
import { Dimensions } from 'react-native';
import { View } from '@/components/ui/view';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { useColor } from '@/hooks/useColor';

const radioChannels = [
  require('@/assets/images/vov-channels/vov-1.png'),
  require('@/assets/images/vov-channels/vov-2.png'),
  require('@/assets/images/vov-channels/vov-3.png'),
  require('@/assets/images/vov-channels/vov-4.png'),
  require('@/assets/images/vov-channels/vov-5.png'),
  require('@/assets/images/vov-channels/vov-6.png'),
];

const {width: screenWidth} = Dimensions.get('window');

const RadioChannels = ({data = radioChannels}: {data?: typeof radioChannels}) => {
  const backgroundColor = useColor('background');
  const borderColor = useColor('border');
  return (
    <View style={{paddingHorizontal: 16, paddingVertical: 16, gap: 12, backgroundColor}}>
      <Text variant="subtitle" style={{fontSize: 18}}>Chương trình Radio</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          rowGap: 12,
        }}
      >
        {data.map((src, idx) => (
          <Card
            key={`radio-${idx}`}
            style={{
              width: (screenWidth - 16 * 2 - 8 * 2) / 3,
              height: (screenWidth - 16 * 2 - 8 * 2) / 3,
              padding: 0,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor,
              aspectRatio: 1
            }}
          >
            <Image source={src} height={(screenWidth - 16 * 2 - 8 * 2) / 3} contentFit="cover" style={{
              aspectRatio: 1
            }}/>
          </Card>
        ))}
      </View>
    </View>
  );
};

export default RadioChannels;