import { Icon } from '@/components/ui/icon';
import React, { useRef } from 'react';
import { Animated, Image, ScrollView, StatusBar, StyleSheet, TextInput, View, } from 'react-native';
import { Bell, Music, Newspaper, Podcast, Radio, Search } from 'lucide-react-native';

import {Text} from '@/components/ui/text'
import { SafeAreaView } from 'react-native-safe-area-context';

export const getFeatureViewAnimation = (animatedValue, outputX: number) => {
  const TRANSLATE_X_INPUT_RANGE = [0, 80];
  const translateY = {
    translateY: animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    }),
  };
  return {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: TRANSLATE_X_INPUT_RANGE,
          outputRange: [0, outputX],
          extrapolate: 'clamp',
        }),
      },
      translateY,
    ],
  };
};

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const UPPER_HEADER_HEIGHT = 32;
const UPPER_HEADER_PADDING_TOP = 4;
const LOWER_HEADER_HEIGHT = 96;

export default function MomoHeader() {
  
  console.log('render layout profile')
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const lastOffsetY = useRef(0);
  const scrollDirection = useRef('');
  
  const depositViewAnimation = getFeatureViewAnimation(animatedValue, 36);
  const withdrawViewAnimation = getFeatureViewAnimation(animatedValue, -16);
  const qrViewAnimation = getFeatureViewAnimation(animatedValue, -56);
  const scanViewAnimation = getFeatureViewAnimation(animatedValue, -92);
  
  const featureIconCircleAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };
  const featureNameAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 30],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 30],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };
  const featureIconAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };
  
  const textInputAnimation = {
    transform: [
      {
        scaleX: animatedValue.interpolate({
          inputRange: [0, 50],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      },
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 25],
          outputRange: [0, -100],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };
  
  const colors = [
    "#ef4444", "#f97316", "#facc15", "#4ade80", "#22d3ee",
    "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6", "#a3e635",
    "#f59e0b", "#10b981", "#38bdf8", "#6366f1", "#d946ef",
    "#fb7185", "#84cc16", "#0ea5e9", "#c084fc", "#f43f5e",
  ];
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
      
      <SafeAreaView>
        <View style={styles.upperHeaderPlaceholder}/>
      </SafeAreaView>
      
      <SafeAreaView style={styles.header}>
        <View style={styles.upperHeader}>
          <View style={styles.searchContainer}>
            <Icon name={Search} color="white" size={20} style={[styles.icon16, {marginLeft: 8}]}/>
            <AnimatedTextInput
              placeholder="Tìm kiếm"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              style={[styles.searchInput, textInputAnimation]}
            />
          </View>
          
          <Icon name={Bell} color="white" size={20} style={styles.bell}/>
          <Image
            source={require('@/assets/images/momo/avatar.png')}
            style={styles.avatar}
          />
        </View>
        
        <View style={[styles.lowerHeader]}>
          <Animated.View style={[styles.feature, depositViewAnimation]}>
            <Animated.View style={[styles.featureIcon, featureIconAnimation]}>
              <Radio size={20} color="white"/>
            </Animated.View>
            
            <Animated.View style={[styles.icon32, featureIconCircleAnimation]}>
              <Radio size={20} color="#AF0C6E" strokeWidth={2.5} />
            </Animated.View>
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              RADIO
            </Animated.Text>
          </Animated.View>
          
          <Animated.View style={[styles.feature, withdrawViewAnimation]}>
            <Animated.View style={[styles.featureIcon, featureIconAnimation]}>
              <Newspaper size={20} color="white" />
            </Animated.View>
            
            <Animated.View style={[styles.icon32, featureIconCircleAnimation]}>
              <Newspaper size={20} color="#AF0C6E" strokeWidth={2.5} />
            </Animated.View>
            
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              TIN TỨC
            </Animated.Text>
          </Animated.View>
          
          <Animated.View style={[styles.feature, qrViewAnimation]}>
            <Animated.View style={[styles.featureIcon, featureIconAnimation]}>
              <Music size={20} color="white" />
            </Animated.View>
            
            <Animated.View style={[styles.icon32, featureIconCircleAnimation]}>
              <Music size={20} color="#AF0C6E" strokeWidth={2.5} />
            </Animated.View>
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              ÂM NHẠC
            </Animated.Text>
          </Animated.View>
          
          <Animated.View style={[styles.feature, scanViewAnimation]}>
            <Animated.View style={[styles.featureIcon, featureIconAnimation]}>
              <Podcast size={20} color="white" />
            </Animated.View>
            
            <Animated.View style={[styles.icon32, featureIconCircleAnimation]}>
              <Podcast size={20} color="#AF0C6E" strokeWidth={2.5} />
            </Animated.View>
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              PODCAST
            </Animated.Text>
          </Animated.View>
        </View>
      </SafeAreaView>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={e => {
          const offsetY = e.nativeEvent.contentOffset.y;
          scrollDirection.current =
            offsetY - lastOffsetY.current > 0 ? 'down' : 'up';
          lastOffsetY.current = offsetY;
          animatedValue.setValue(offsetY);
        }}
        onScrollEndDrag={() => {
          scrollViewRef.current?.scrollTo({
            y: scrollDirection.current === 'down' ? 100 : 0,
            animated: true,
          });
        }}
        scrollEventThrottle={16}>
        <View style={styles.spaceForHeader}/>
        <View style={styles.scrollViewContent}>
        
        {
          Array.from({ length: 50 }).map((_, i) => {
            const color = colors[i % colors.length]; // loop through colors
            return (
              <View
                key={i}
                style={{
                  height: 200,
                  width: "100%",
                  backgroundColor: 'red',
                  borderRadius: 12,
                  marginBottom: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
                  Card {i + 1}
                </Text>
              </View>
            );
          })
        }
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon16: {
    width: 16,
    height: 16,
  },
  icon32: {
    width: 32,
    height: 32,
    backgroundColor: 'white',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperHeaderPlaceholder: {
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
  },
  header: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#AF0C6E',
  },
  upperHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  featureIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: 8,
  },
  bell: {
    width: 16,
    height: 16,
    marginHorizontal: 32,
  },
  avatar: {
    width: 28,
    height: 28,
  },
  lowerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: LOWER_HEADER_HEIGHT,
    paddingHorizontal: 16,
  },
  searchInput: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: 'white',
    borderRadius: 4,
    paddingVertical: 4,
    paddingLeft: 32,
  },
  feature: {
    alignItems: 'center',
  },
  featureName: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 14,
    color: '#FFFFFF',
    marginTop: 12,
  },
  spaceForHeader: {
    height: LOWER_HEADER_HEIGHT,
  },
  scrollViewContent: {
   // height: 1000,
    backgroundColor: 'white',
  },
});