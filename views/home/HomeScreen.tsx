import React, {useRef} from 'react';
import {Animated, StyleSheet} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {useColor} from "@/hooks";

import {PADDING_HORIZONTAL} from "@/theme/globals";
import {View} from "@/components/ui/view";
import {AppHeaderScrollAnimation, AppHeaderStickyAnimation} from '@/components/features/AppHeader';
import LoadingScreen from "@/components/features/loading-screen";

import {AppBanners, AppMenu, News, PodCasts, RadioChannels, Recommends} from "./components";
import {useHomePage} from "./hooks";
import {AudioFloatingPlayer} from "../audio-player";

export const HomeScreen = () => {
  const backgroundColor = useColor('background');
  const bgCard = useColor('card');
  const {bottom} = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const {isLoading, data} = useHomePage();
  
  if (isLoading) return (
    <LoadingScreen/>
  )
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
            
            {/* Section 2: Carousel Image + Menu */}
            <View style={[styles.bannerContainer, {backgroundColor}]}>
              <AppBanners data={data?.banners}/>
              <AppMenu/>
            </View>
            
            {/* Section 3: Carousel Content */}
            <Recommends data={data?.recommends}/>
            
            {/* Section 4: Radio list (3x2 grid) */}
            <RadioChannels data={data?.radios}/>
            
            {/* Section 4: News */}
            <News data={data?.news}/>
            
            {/* Section 5: PodCasts */}
            <PodCasts data={data?.podcasts}/>
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
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    width: '100%',
  },
  container: {
    gap: 8,
  },
  bannerContainer: {
    padding: PADDING_HORIZONTAL,
    gap: 16,
  }
})