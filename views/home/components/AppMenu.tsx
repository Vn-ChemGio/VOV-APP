import React from 'react';
import {StyleSheet, TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";
import {Music, Newspaper, Podcast, Radio} from "lucide-react-native";
import {useColor} from "@/hooks/useColor";
import {View} from "@/components/ui/view";
import {Icon} from "@/components/ui/icon";
import {Text} from "@/components/ui/text";
import {Menu} from "@/types";

const menus: Menu[] = [
  {key: 'radios', label: 'Radio', icon: Radio},
  {key: 'news', label: 'News', icon: Newspaper},
  {key: '(musics)', label: 'Music', icon: Music},
  {key: 'podcast', label: 'Podcast', icon: Podcast},
];

export const AppMenu = ({data = menus}: { data?: Menu[] }) => {
  const borderColor = useColor('border');
  const foregroundColor = useColor('foreground');
  const primaryColor = useColor('primary');
  
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <TouchableOpacity
          key={item.key}
          activeOpacity={0.8}
          style={[styles.itemContainer, {borderColor}]}
          onPress={() => router.navigate(item.key as any)}
        >
          <Icon name={item.icon} color={primaryColor} size={24} style={styles.itemIcon}/>
          <Text style={[styles.itemLabel, {color: foregroundColor}]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: 'transparent',
    gap: 6,
  },
  itemIcon: {},
  itemLabel: {}
})
