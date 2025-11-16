import React, { useRef, useState } from 'react';
import { Animated, Dimensions, TouchableOpacity } from 'react-native';
import { View } from '@/components/ui/view';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { ScrollView } from '@/components/ui/scroll-view';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselItem } from '@/components/ui/carousel';
import { Icon } from '@/components/ui/icon';
import { useColor } from '@/hooks/useColor';
import {
  ArrowRightIcon,
  HeartIcon,
  MessageCircleMoreIcon,
  Music,
  Newspaper,
  PauseIcon,
  PlayIcon,
  Podcast,
  Radio
} from 'lucide-react-native';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BORDER_RADIUS } from '@/theme/globals';
import AppHeader from '@/components/features/AppHeader';
import { ShareButton } from '@/components/ui/share';
import { Button } from '@/components/ui/button';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const bg = useColor('background');
  const bgCard = useColor('card');
  const border = useColor('border');
  const foreground = useColor('foreground');
  const primary = useColor('primary');
  const colorText = useColor('text');
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const {top, bottom} = useSafeAreaInsets();
  
  // State to track which podcast item is being played (for blur view)
  const [playingPodcastIndex, setPlayingPodcastIndex] = useState<number | null>(null);
  
  const scrollHeaderOpacity = scrollY.interpolate({
    inputRange: [0, 28, 32],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });
  
  const menuItems = [
    {key: 'radios', label: 'Radio', icon: Radio},
    {key: 'news', label: 'News', icon: Newspaper},
    {key: '(musics)', label: 'Music', icon: Music},
    {key: 'podcast', label: 'Podcast', icon: Podcast},
  ];
  const {width: screenWidth} = Dimensions.get('window');
  
  const recommendItems = [
    {
      key: 'rec1',
      src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=300&fit=crop',
      title: 'Chill Vibes',
      description: 'This image showcases the beauty of nature with its vibrant colors and serene atmosphere.',
      is_liked: false,
      likes: 0,
      comments: 10,
    },
    {
      key: 'rec2',
      src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop',
      title: 'Daily Mix',
      description: 'This image showcases the beauty of nature with its vibrant colors and serene atmosphere, of nature with its vibrant colors and serene atmosphere. ',
      is_liked: true,
      likes: 20,
      comments: 10,
    },
    {
      key: 'rec3',
      src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop',
      title: 'Focus Beats',
      description: 'This image showcases the beauty of nature with its vibrant colors and serene atmosphere.',
      is_liked: false,
      likes: 100,
      comments: 10,
    },
    {
      key: 'rec4', src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop',
      title: 'Top Hits',
      description: 'This image showcases the beauty of nature with its vibrant colors and serene atmosphere.',
      is_liked: false,
      likes: 100,
      comments: 10,
    },
  ];
  
  const podcastItems = [
    {
      cover: 'https://vov2.vov.vn/sites/default/files/styles/front_medium/public/2025-11/481467353_3827583790719028_7129256577207251207_n.jpg',
      title: 'Phụ nữ hơn nhau cách sống, không phải may mắn',
      description: '[VOV2] - Cuộc sống không ai giống ai, người có điều kiện, người khó khăn, người được yêu chiều, người phải tự lập. Nhưng chính cách chúng ta chọn đối diện với mọi việc mới tạo nên giá trị của bản thân.',
      source: 'https://vov2.vov.vn/sites/default/files/2025-11/1211_linh_linh.mp3'
    }, {
      cover: 'https://vov2.vov.vn/sites/default/files/styles/front_medium/public/2025-10/thac-sy-Nguyen-Ba-Manh.jpg',
      title: 'Biết chấp nhận thất bại khi nghiên cứu khoa học mới có thể vươn tới thành công',
      description: 'VOV2] - ThS. Nguyễn Bá Mạnh, Viện Hóa học – người vừa nhận được Giải thưởng Quả Cầu Vàng 2025 cho rằng tinh thần vượt khó, chấp nhận thất bại chính là tinh thần của nghiên cứu khoa học.',
      source: 'https://vov2.vov.vn/sites/default/files/2025-10/v2_23.10_gddt.mp3',
    }, {
      cover: 'https://vov2.vov.vn/sites/default/files/styles/front_medium/public/2025-11/ngoai-binh-bong-chuyen.png',
      title: 'Ngoại binh bóng chuyền: Cú hích chuyên nghiệp hay con dao hai lưỡi?',
      description: '[VOV2] - Thuê ngoại binh là xu thế tất yếu trong quá trình chuyên nghiệp hóa bóng chuyền Việt Nam. Tuy nhiên, nếu không có chiến lược rõ ràng, sự phát triển này có thể trở thành con dao hai lưỡi, làm tổn thương chính nền tảng nội địa.',
      source: 'https://vov2.vov.vn/sites/default/files/2025-11/15-11_chill_the_thao.mp3'
    }, {
      cover: 'https://vov2.vov.vn/sites/default/files/styles/front_medium/public/2025-11/Hanh-phuc-trong-tam-tay.jpg',
      title: 'Hạnh phúc trong tầm tay',
      description: '[VOV2] - Để có được tình yêu, chúng ta cần tỉnh táo, suy xét mọi khía cạnh. Đừng chỉ vì chạy theo một hình bóng để rồi vuột mất hạnh phúc trong tay. Đó là gợi ý của chuyên gia tâm lý Vũ Thu Hà dành cho người đàn ông không biết chọn con tim hay theo lý trí',
      source: 'https://vov2.vov.vn/sites/default/files/2025-11/tram_sac_cam_xuc.mp3'
    }
  ];
  
  const radioGridItems = [
    require('@/assets/images/vov-channels/vov-1.png'),
    require('@/assets/images/vov-channels/vov-2.png'),
    require('@/assets/images/vov-channels/vov-3.png'),
    require('@/assets/images/vov-channels/vov-4.png'),
    require('@/assets/images/vov-channels/vov-5.png'),
    require('@/assets/images/vov-channels/vov-6.png'),
  ];
  
  const shareContent = {
    message: 'Check out this amazing content!',
    url: 'https://example.com',
  };
  const router = useRouter();
  return (
    <View style={{flex: 1}}>
      <AppHeader scrollY={scrollY}/>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false}
        )}
        style={{
          width: '100%',
          backgroundColor: bg,
          paddingBottom: 120,
        }}
      >
        <View style={{
          gap: 8,
          backgroundColor: bgCard,
        }}>
          {/* Section 1: Heading (logo + welcome bar) */}
          <Animated.View style={[{
            paddingBottom: 8,
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: border,
            backgroundColor: bg,
            paddingTop: top + 32,
          }, {
            opacity: scrollHeaderOpacity,
          }]}
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
                  source={require('../assets/images/logo-square.png')}
                  width={40}
                  height={40}
                  variant="rounded"
                  containerStyle={{borderWidth: 1, borderColor: border, padding: 4}}
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
          </Animated.View>
          
          {/* Section 2: Carousel + Menu */}
          <View style={{padding: 16, gap: 16, backgroundColor: bg}}>
            <Carousel autoPlay autoPlayInterval={5000} showIndicators showArrows={false} loop>
              {[
                {
                  uri: 'https://vietnam.travel/sites/default/files/styles/top_banner/public/2022-07/shutterstock_1788780452.jpg',
                  title: '',
                  description: '',
                },
                {
                  uri: 'https://www.theodmgroup.com/wp-content/uploads/2022/08/Vietnam-National-Day-800x524.jpg',
                  title: '',
                  description: '',
                },
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
                    {
                      (image.title || image.description) && <View
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          borderBottomLeftRadius: BORDER_RADIUS,
                          borderBottomRightRadius: BORDER_RADIUS,
                          padding: 12,
                        }}
                      >
                        {
                          image.title && <Text
                            variant="title"
                            style={{
                              color: 'white',
                              fontSize: 14,
                              marginBottom: 4,
                            }}
                          >
                            {image.title}
                          </Text>
                        }
                        {image.description && <Text
                          style={{
                            color: 'white',
                            opacity: 0.9,
                            fontSize: 12,
                          }}
                        >
                          {image.description}
                        </Text>}
                      </View>
                    }
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
                  onPress={()=> router.navigate(item.key as any)}
                >
                  <Icon name={item.icon} color={primary} size={24}/>
                  <Text style={{color: foreground}}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Section 3: Recommends (horizontal scroll with 4 card images) */}
          <View style={{paddingVertical: 16, gap: 12, backgroundColor: bg,}}>
            <Text variant="subtitle" style={{fontSize: 18, paddingHorizontal: 16}}>
              Gợi ý cho bạn
            </Text>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{gap: 16, paddingHorizontal: 16}}
              showsHorizontalScrollIndicator={false}
            >
              {recommendItems.map((item, i) => (
                <Card
                  key={i}
                  style={{
                    width: screenWidth * 2 / 3,
                    borderRadius: 16,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                    gap: 12,
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                  }}
                >
                  <Image source={{uri: item.src}}
                         contentFit="cover"
                         variant="default"
                         containerStyle={{
                           width: '100%',
                           height: screenWidth * 2 / 3 * 9 / 16,
                           borderTopLeftRadius: 12,
                           borderTopRightRadius: 12,
                           borderBottomLeftRadius: 0,
                           borderBottomRightRadius: 0,
                         }}
                         style={{
                           borderTopLeftRadius: 12,
                           borderTopRightRadius: 12,
                           borderBottomLeftRadius: 0,
                           borderBottomRightRadius: 0,
                         }}
                  />
                  <CardHeader style={{paddingHorizontal: 12, flex: 1, paddingVertical: 0}}>
                    <CardTitle style={{fontSize: 14}}>{item.title}</CardTitle>
                    <CardDescription style={{fontSize: 12}}>
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter style={{
                    paddingHorizontal: 12,
                    marginTop: 0,
                    paddingBottom: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                      <Text>Read more</Text>
                      <Icon name={ArrowRightIcon} size={18} color={colorText}/>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Button size="ghost-icon" variant="ghost" icon={HeartIcon}/>
                      <Button size="ghost-icon" variant="ghost" icon={MessageCircleMoreIcon}/>
                      <ShareButton
                        content={shareContent}
                        size="ghost-icon"
                        variant="ghost"
                      />
                    </View>
                  </CardFooter>
                </Card>
              ))}
            </ScrollView>
          </View>
          
          {/* Section 4: Radio list (3x2 grid) */}
          <View style={{paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16, gap: 12, backgroundColor: bg,}}>
            <Text variant="subtitle" style={{fontSize: 18}}>Chương trình Radio</Text>
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
                    width: (screenWidth - 16 * 2 - 8 * 2) / 3,
                    height: (screenWidth - 16 * 2 - 8 * 2) / 3,
                    padding: 0,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: border,
                    aspectRatio: 1
                  }}
                >
                  <Image source={src} height={(screenWidth - 16 * 2 - 8 * 2) / 3} contentFit="cover" style={{
                    aspectRatio: 1
                  }}/>
                </Card>
              ))}
            </View>
          </View>
          
          {/* Section 4: News */}
          <View style={{paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16, gap: 12, backgroundColor: bg,}}>
            <Text variant="subtitle" style={{fontSize: 18}}>Tin mới cập nhật</Text>
            <View style={{rowGap: 12}}>
              {recommendItems.map((item, i) => (
                <Card
                  key={i}
                  style={{
                    width: '100%',
                    borderRadius: 16,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                    gap: 12,
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                  }}
                >
                  <Image source={{uri: item.src}}
                         contentFit="cover"
                         variant="default"
                         containerStyle={{
                           width: '100%',
                           height: screenWidth * 2 / 3 * 9 / 16,
                           borderTopLeftRadius: 12,
                           borderTopRightRadius: 12,
                           borderBottomLeftRadius: 0,
                           borderBottomRightRadius: 0,
                         }}
                         style={{
                           borderTopLeftRadius: 12,
                           borderTopRightRadius: 12,
                           borderBottomLeftRadius: 0,
                           borderBottomRightRadius: 0,
                         }}
                  />
                  <CardHeader style={{paddingHorizontal: 12, flex: 1, paddingVertical: 0}}>
                    <CardTitle style={{fontSize: 14}}>{item.title}</CardTitle>
                    <CardDescription style={{fontSize: 12}}>
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter style={{
                    paddingHorizontal: 12,
                    marginTop: 0,
                    paddingBottom: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                      <Text>Read more</Text>
                      <Icon name={ArrowRightIcon} size={18} color={colorText}/>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Button size="ghost-icon" variant="ghost" icon={HeartIcon}/>
                      <Button size="ghost-icon" variant="ghost" icon={MessageCircleMoreIcon}/>
                      <ShareButton
                        content={shareContent}
                        size="ghost-icon"
                        variant="ghost"
                      />
                    </View>
                  </CardFooter>
                </Card>
              ))}
            </View>
          </View>
          
          
          <View style={{paddingVertical: 16, gap: 12, backgroundColor: bg,}}>
            <Text variant="subtitle" style={{fontSize: 18, paddingHorizontal: 16}}>
              Podcast mới
            </Text>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{gap: 16, paddingHorizontal: 16}}
              showsHorizontalScrollIndicator={false}
            >
              {podcastItems.map((item, i) => (
                <Card
                  key={i}
                  style={{
                    width: screenWidth * 2 / 3,
                    borderRadius: 16,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                    gap: 12,
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                  }}
                >
                  <View
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: screenWidth * 2 / 3 * 9 / 16,
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      overflow: 'hidden',
                    }}
                  >
                    <Image source={{uri: item.cover}}
                           contentFit="cover"
                           variant="default"
                           containerStyle={{
                             width: '100%',
                             height: '100%',
                             borderTopLeftRadius: 12,
                             borderTopRightRadius: 12,
                             borderBottomLeftRadius: 0,
                             borderBottomRightRadius: 0,
                           }}
                           style={{
                             borderTopLeftRadius: 12,
                             borderTopRightRadius: 12,
                             borderBottomLeftRadius: 0,
                             borderBottomRightRadius: 0,
                           }}
                    />
                    {/* Play button centered on image */}
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        size="icon"
                        variant="outline"
                        icon={playingPodcastIndex === i ? () => <PauseIcon color={bg} size={32} strokeWidth={2}/> : () => <PlayIcon color={bg} size={32} strokeWidth={2}/>}
                        onPress={() => {
                          setPlayingPodcastIndex(playingPodcastIndex === i ? null : i);
                        }}
                        style={{
                          width: 72,
                          height: 72,
                          borderWidth: 4,
                          borderColor: bg,
                        }}
                      />
                    </View>
                  
                  </View>
                  <CardHeader style={{paddingHorizontal: 12, flex: 1, paddingVertical: 0}}>
                    <CardTitle style={{fontSize: 14}}>{item.title}</CardTitle>
                    <CardDescription style={{fontSize: 12}}>
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </ScrollView>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;