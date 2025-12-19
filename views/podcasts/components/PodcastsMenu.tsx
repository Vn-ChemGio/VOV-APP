import React from 'react';
import {TouchableOpacity} from "react-native";

import {Text} from "@/components/ui/text";
import {BottomSheet} from "@/components/ui/bottom-sheet";

import {usePodcastCategoriesStore} from "../stores";
import {PodcastCategory} from "@/types";

export const PodcastsMenu = ({isVisible, close}: { isVisible: boolean; close: () => void }) => {
  const {setSelectedCategoryId, categories} = usePodcastCategoriesStore();
  
  const renderMenuItem = ({item}: { item: PodcastCategory }) => (
    <TouchableOpacity
      style={{
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
      }}
      onPress={() => {
        setSelectedCategoryId(item.id);
        close()
      }}
      key={item.id}
    >
      <Text variant='heading' style={{
        fontWeight: '600',
      }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  
  return <BottomSheet
    isVisible={isVisible}
    onClose={close}
    title='Danh mục'
    snapPoints={[0.5, 0.8]}
  >
    {categories.map(item => renderMenuItem({item}))}
  </BottomSheet>
}