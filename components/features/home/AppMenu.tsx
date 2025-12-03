import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Music, Newspaper, Podcast, Radio } from 'lucide-react-native';
import { useColor } from '@/hooks/useColor';
import { useRouter } from 'expo-router';
import {Menu} from "@/types";


const dataMenuItems: Menu[] = [
  {key: 'radios', label: 'Radio', icon: Radio},
  {key: 'news', label: 'News', icon: Newspaper},
  {key: '(musics)', label: 'Music', icon: Music},
  {key: 'podcast', label: 'Podcast', icon: Podcast},
];

const AppMenu = ({data = dataMenuItems} : {data?: Menu[]}) => {
  const borderColor = useColor('border');
  const foregroundColor = useColor('foreground');
  const primaryColor = useColor('primary');
  
  const router = useRouter();
  
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
      }}
    >
      {data.map((item) => (
        <TouchableOpacity
          key={item.key}
          activeOpacity={0.8}
          style={{
            flex: 1,
            alignItems: 'center',
            paddingVertical: 12,
            borderWidth: 1,
            borderColor: borderColor,
            borderRadius: 12,
            backgroundColor: 'transparent',
            gap: 6,
          }}
          onPress={() => router.navigate(item.key as any)}
        >
          <Icon name={item.icon} color={primaryColor} size={24}/>
          <Text style={{color: foregroundColor}}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AppMenu;