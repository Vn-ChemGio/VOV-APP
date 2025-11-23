import React, { useRef, useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { AppHeaderScrollAnimation, AppHeaderStickyAnimation } from '@/components/features/home/AppHeader';
import AppBanners from '@/components/features/home/AppBanners';
import AppMenu from '@/components/features/home/AppMenu';
import AppRecommendsSection from '@/components/features/home/AppRecommendsSection';
import RadioChannels from '@/components/features/home/RadioChannels';
import News from '@/components/features/home/News';
import PodCasts from '@/components/features/home/PodCasts';

const HomeScreen = () => {
  const backgroundColor = useColor('background');
  const bgCard = useColor('card');
  
  const scrollY = useRef(new Animated.Value(0)).current;
  
  return (
    <View style={{flex: 1}}>
      <AppHeaderStickyAnimation scrollY={scrollY}/>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false}
        )}
        style={{
          width: '100%',
          backgroundColor,
          paddingBottom: 120,
        }}
      >
        <View style={{
          gap: 8,
          backgroundColor: bgCard,
        }}>
          {/* Section 1: Heading (logo + welcome bar) */}
          <AppHeaderScrollAnimation scrollY={scrollY}/>
          
          {/* Section 2: Carousel Image + Menu */}
          <View style={{padding: 16, gap: 16, backgroundColor}}>
            <AppBanners/>
            <AppMenu/>
          </View>
          
          {/* Section 3: Carousel Content */}
          <AppRecommendsSection/>
          
          {/* Section 4: Radio list (3x2 grid) */}
          <RadioChannels/>
          
          {/* Section 4: News */}
          <News/>
          
          {/* Section 4: PodCasts */}
          <PodCasts/>
        
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;