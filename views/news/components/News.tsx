import React from 'react';
import {View} from '@/components/ui/view';
import {useNews} from "../hooks";
import LoadingScreen from "@/components/features/loading-screen";
import {HoveredProvider} from "@/contexts/hover/HoveredContext";
import CardNews from "@/components/features/CardNews";

export const News = ({category_id}: { category_id: number }) => {
  const {isLoading, options} = useNews(category_id);
  
  return isLoading ? <LoadingScreen/> : (
    <View style={{paddingHorizontal: 16, paddingBottom: 120, gap: 16}}>
      <HoveredProvider>
        {(options || [])?.map((item, idx) => (
          <CardNews {...{
            ...item,
            idx,
            style: {width: '100%'}
          }} key={`news-${idx}`}/>
        ))}
      </HoveredProvider>
    </View>
  )
}