import React, {useRef} from 'react';
import {View} from '@/components/ui/view';
import {Animated, StyleSheet} from "react-native";
import {useColor} from "@/hooks/useColor";
import {AppHeaderScrollAnimation, AppHeaderStickyAnimation} from "@/components/features/AppHeader";
import {Button} from "@/components/ui/button";
import {Text} from "@/components/ui/text";
import {ArrowLeftIcon, SquareMenu} from "lucide-react-native";
import {useBottomSheet} from "@/components/ui/bottom-sheet";
import {useNavigation} from "expo-router";
import {News, NewsMenu} from "./components";
import {useNewsCategories} from "@/views/news/hooks";

export const NewsScreen = () => {
  const backgroundColor = useColor('background');
  const bgCard = useColor('card');
  const {isVisible, open, close} = useBottomSheet();
  const {selectedCategoryId} = useNewsCategories();
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation()
  
  
  return <View style={{flex: 1}}>
    <AppHeaderStickyAnimation scrollY={scrollY}/>
    <Animated.ScrollView
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {y: scrollY}}}],
        {useNativeDriver: false}
      )}
      style={[styles.containerWrapper, {backgroundColor}]}
    >
      <View style={[styles.container, {backgroundColor: bgCard}]}>
        {/* Section 1: Heading (logo + welcome bar) */}
        <AppHeaderScrollAnimation scrollY={scrollY}/>
        
        {/* Section 4: PodCasts */}
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16
        }}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flex: 1,
            gap: 8,
          }}>
            <Button size='icon' variant='outline'
                    icon={ArrowLeftIcon}
                    onPress={() => {
                      if (navigation.canGoBack()) {
                        navigation.goBack();
                      }
                    }}
                    animation={true}
                    style={{
                      height: 32,
                      width: 32,
                      padding: 8,
                      flexDirection: 'row-reverse',
                    }}
            />
            <Text variant="heading" style={{fontWeight: '600'}}>Tin tức</Text>
          </View>
          <Button
            icon={SquareMenu}
            onPress={open}
            variant='link'
          >
            Danh mục
          </Button>
        </View>
        
        <News category_id={selectedCategoryId}/>
        
        <NewsMenu {...{isVisible, close}}/>
      </View>
    </Animated.ScrollView>
  </View>
};


const styles = StyleSheet.create({
  containerWrapper: {
    width: '100%',
  },
  container: {
    gap: 8,
  },
})