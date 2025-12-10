import React from 'react';
import {StyleSheet} from "react-native";
import {Text} from '@/components/ui/text';
import {View} from '@/components/ui/view';
import {useColor} from '@/hooks/useColor';
import CardNews from "@/components/features/CardNews";
import {News as NewsItem} from "@/types";

export const News = ({data = []}: { data?: NewsItem[] }) => {
  const backgroundColor = useColor('background');
  
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text variant="subtitle" style={styles.title}>Tin mới cập nhật</Text>
      <View style={styles.contentContainer}>
        {data.slice(0, 5).map((item, i) => (
          <CardNews {...item} key={`news-${i}`}/>
        ))}
      </View>
    </View>);
};

const styles = StyleSheet.create({
  container: {
    padding: 16, gap: 12
  },
  title: {
    fontSize: 18
  },
  contentContainer: {
    rowGap: 12
  }
})