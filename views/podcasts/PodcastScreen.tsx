import React, {useRef} from 'react';
import {View} from '@/components/ui/view';
import {Animated} from "react-native";
import {useColor} from "@/hooks/useColor";
import {AppHeaderScrollAnimation, AppHeaderStickyAnimation} from "@/components/features/AppHeader";
import {Button} from "@/components/ui/button";
import {Text} from "@/components/ui/text";
import {CircleArrowLeftIcon, SquareMenu} from "lucide-react-native";
import {useBottomSheet} from "@/components/ui/bottom-sheet";
import {useNavigation} from "expo-router";
import {usePodcastCategories} from "@/views/podcasts/hooks/usePodcasts";
import {Podcasts, PodcastsMenu} from "./components";

export const PodcastScreen = () => {
  const backgroundColor = useColor('background');
  const bgCard = useColor('card');
  const {isVisible, open, close} = useBottomSheet();
  const {selectedCategoryId} = usePodcastCategories();
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
      style={{
        width: '100%',
        backgroundColor: bgCard,
        paddingTop: 16,
        paddingBottom: 120,
      }}
    >
      <View style={{
        gap: 8,
        backgroundColor: backgroundColor,
      }}>
        {/* Section 1: Heading (logo + welcome bar) */}
        <AppHeaderScrollAnimation scrollY={scrollY}/>
        
        {/* Section 4: PodCasts */}
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
        }}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flex: 1,
            gap: 8,
          }}>
            <Button size='icon' variant='ghost'
                    icon={() => <CircleArrowLeftIcon size={32} strokeWidth={1}/>}
                    onPress={() => {
                      if (navigation.canGoBack()) {
                        navigation.goBack();
                      }
                    }}
                    animation={true}
                    style={{
                      padding: 0,
                    }}
            />
            <Text variant="heading">Podcasts</Text>
          </View>
          <Button size='icon' variant='ghost' icon={() => <SquareMenu size={32} strokeWidth={1}/>}
                  onPress={open}
                  animation={true}
                  style={{
                    padding: 0,
                  }}
          />
        </View>
        
        <Podcasts category_id={selectedCategoryId}/>
        
        <PodcastsMenu {...{isVisible, close}}/>
      </View>
    </Animated.ScrollView>
  </View>
};

