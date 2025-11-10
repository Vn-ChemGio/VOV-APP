import React, { useRef } from 'react';
import { Animated, Dimensions, TouchableOpacity } from 'react-native';
import { View } from '@/components/ui/view';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { ScrollView } from '@/components/ui/scroll-view';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselItem } from '@/components/ui/carousel';
import { Icon } from '@/components/ui/icon';
import { useColor } from '@/hooks/useColor';
import { Music, Newspaper, Podcast, Radio } from 'lucide-react-native';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { MusicHeader } from '@/components/features/MusicHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BORDER_RADIUS } from '@/theme/globals';

const HomeScreen = () => {
  const bg = useColor('background');
  const bgCard = useColor('card');
  const border = useColor('border');
  const foreground = useColor('foreground');
  const primary = useColor('primary');
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const {top, bottom} = useSafeAreaInsets();
  const menuItems = [
    {key: 'radio', label: 'Radio', icon: Radio},
    {key: 'news', label: 'News', icon: Newspaper},
    {key: 'music', label: 'Music', icon: Music},
    {key: 'podcast', label: 'Podcast', icon: Podcast},
  ];
  const {width: screenWidth} = Dimensions.get('window');
  
  const recommendItems = [
    {
      key: 'rec1',
      src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=300&fit=crop',
      title: 'Chill Vibes'
    },
    {
      key: 'rec2',
      src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop',
      title: 'Daily Mix'
    },
    {
      key: 'rec3',
      src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop',
      title: 'Focus Beats'
    },
    {
      key: 'rec4', src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop',
      title: 'Top Hits'
    },
  ];
  
  const gradients = [
    ['#ff9a9e', '#fecfef'],
    ['#a18cd1', '#fbc2eb'],
    ['#fad0c4', '#ffd1ff'],
    ['#ffecd2', '#fcb69f'],
    ['#a8edea', '#fed6e3'],
    ['#d299c2', '#fef9d7'],
    ['#89f7fe', '#66a6ff'],
  ];
  
  const radioGridItems = [
    require('../assets/images/momo/deposit.png'),
    require('../assets/images/momo/withdraw.png'),
    require('../assets/images/momo/qr.png'),
    require('../assets/images/momo/scan.png'),
    require('../assets/images/momo/deposit-circle.png'),
    require('../assets/images/momo/withdraw-circle.png'),
  ];
  
  return (
    <View style={{flex: 1}}>
      <MusicHeader scrollY={scrollY} title="Library"/>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false}
        )}
        contentContainerStyle={{paddingTop: top + 32}}
        style={{
          width: '100%',
          backgroundColor: bg,
        }}
      >
        <View style={{
          gap: 8,
          backgroundColor: bgCard,
        }}>
          {/* Section 1: Heading (logo + welcome bar) */}
          <View style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: border,
            backgroundColor: bg,
          }}
          >
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8,
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 12
              }}>
                <Image
                  source={require('../assets/images/icon.png')}
                  width={40}
                  height={40}
                  variant="rounded"
                  containerStyle={{borderWidth: 1, borderColor: border}}
                />
                <View style={{gap: 2}}>
                  <Text style={{fontSize: 16}}>
                    VOV - Đài Tiếng nói Việt Nam
                  </Text>
                  <Text variant="caption" style={{fontSize: 12}}>
                    Welcome, Wind Blade!
                  </Text>
                </View>
              </View>
              <ModeToggle/>
            </View>
          </View>
          
          {/* Section 2: Carousel + Menu */}
          <View style={{padding: 16, gap: 16, backgroundColor: bg}}>
            <Carousel autoPlay autoPlayInterval={5000} showIndicators showArrows={false} loop>
              {[
                {
                  uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
                  title: 'Mountain Landscape',
                  description: 'Breathtaking mountain views',
                },
                {
                  uri: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop',
                  title: 'Forest Path',
                  description: 'Peaceful forest walking trail',
                },
                {
                  uri: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=400&h=300&fit=crop',
                  title: 'Ocean Sunset',
                  description: 'Golden hour by the sea',
                },
                {
                  uri: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=300&fit=crop',
                  title: 'Desert Dunes',
                  description: 'Vast desert landscape',
                },
              ].map((image, idx) => (
                <CarouselItem key={idx} style={{padding: 0, borderRadius: 12, borderWidth: 0, overflow: 'hidden'}}>
                  <View style={{position: 'relative', height: 240, borderRadius: 12,}}>
                    <Image
                      source={{uri: image.uri}}
                      style={{
                        width: '100%',
                        height: 240,
                        borderRadius: BORDER_RADIUS,
                      }}
                      contentFit="cover"
                    />
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        borderBottomLeftRadius: BORDER_RADIUS,
                        borderBottomRightRadius: BORDER_RADIUS,
                        padding: 16,
                      }}
                    >
                      <Text
                        variant="title"
                        style={{
                          color: 'white',
                          fontSize: 18,
                          marginBottom: 4,
                        }}
                      >
                        {image.title}
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          opacity: 0.9,
                          fontSize: 14,
                        }}
                      >
                        {image.description}
                      </Text>
                    </View>
                  </View>
                </CarouselItem>
              ))}
            </Carousel>
            
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  activeOpacity={0.8}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    paddingVertical: 12,
                    borderWidth: 1,
                    borderColor: border,
                    borderRadius: 12,
                    backgroundColor: 'transparent',
                    gap: 6,
                  }}
                >
                  <Icon name={item.icon} color={primary} size={24}/>
                  <Text style={{color: foreground}}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* Section 3: Recommends (horizontal scroll with 4 card images) */}
          <View style={{padding: 16, gap: 12, backgroundColor: bg,}}>
            <Text variant="subtitle" style={{fontSize: 18}}>
              Gợi ý cho bạn
            </Text>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{gap: 16, alignItems: 'center'}}
              showsHorizontalScrollIndicator={false}
            >
              {recommendItems.map((item, i) => (
                <View
                  key={i}
                  style={{
                    width: screenWidth * 2 / 3,
                    borderRadius: 12,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                    gap: 12,
                  }}
                >
                  <Image source={{uri: item.src}}
                         contentFit="cover"
                         containerStyle={{
                           width: '100%',
                           height: screenWidth * 2 / 3 * 9 / 16,
                           borderRadius: 12,
                         }}
                  />
                  <View style={{
                    width: '100%',
                    gap: 4,
                  }}>
                    <Text variant="body" style={{fontSize: 16}}>
                      {item.title}
                    </Text>
                    <View style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                      <Text variant="caption" style={{fontSize: 12}}>
                        Đang phát
                      </Text>
                      <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                      }}>
                      
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          
          {/* Section 4: Radio list (3x2 grid) */}
          <View style={{paddingHorizontal: 16, paddingTop: 24, gap: 12, backgroundColor: bg,}}>
            <Text variant="title">Popular Radio</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                rowGap: 12,
              }}
            >
              {radioGridItems.map((src, idx) => (
                <Card
                  key={`radio-${idx}`}
                  style={{
                    width: '32%',
                    padding: 0,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: border,
                  }}
                >
                  <Image source={src} height={90} contentFit="cover"/>
                </Card>
              ))}
            </View>
          </View>
        
        
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;