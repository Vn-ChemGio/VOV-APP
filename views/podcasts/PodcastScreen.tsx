import React, {useRef} from 'react';
import {Animated, StyleSheet} from "react-native";
import {useNavigation} from "expo-router";
import {ArrowLeftIcon, SquareMenu} from "lucide-react-native";

import {useColor} from "@/hooks";

import {View} from '@/components/ui/view';
import {Button} from "@/components/ui/button";
import {Text} from "@/components/ui/text";
import {useBottomSheet} from "@/components/ui/bottom-sheet";

import {AppHeaderScrollAnimation, AppHeaderStickyAnimation} from "@/components/features/AppHeader";

import {usePodcastCategories} from "./hooks";
import {Podcasts, PodcastsMenu} from "./components";
import {AudioFloatingPlayer} from "@/views/audio-player";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export const PodcastScreen = () => {
  const backgroundColor = useColor('background');
  const bgCard = useColor('card');
  const {bottom} = useSafeAreaInsets();
  
  const {isVisible, open, close} = useBottomSheet();
  const {selectedCategoryId} = usePodcastCategories();
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation()
  
  return (
    <>
      <View style={{flex: 1}}>
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
                <Text variant="heading" style={{fontWeight: '600'}}>Podcasts</Text>
              </View>
              <Button
                icon={SquareMenu}
                onPress={open}
                variant='link'
              >
                Danh mục
              </Button>
            </View>
            
            <Podcasts category_id={selectedCategoryId}/>
            
            <PodcastsMenu {...{isVisible, close}}/>
          </View>
        </Animated.ScrollView>
      </View>
      <AudioFloatingPlayer
        style={{
          position: 'absolute',
          left: 8,
          right: 8,
          bottom: Math.max(bottom, 32),
        }}
      />
    </>
  )
};

const styles = StyleSheet.create({
  containerWrapper: {
    width: '100%',
  },
  container: {
    gap: 8,
  },
})