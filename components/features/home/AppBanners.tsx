import React from 'react';
import { Carousel, CarouselItem } from '@/components/ui/carousel';
import { View } from '@/components/ui/view';
import { Image } from '@/components/ui/image';
import { BORDER_RADIUS } from '@/theme/globals';
import { Text } from '@/components/ui/text';

const dataRecommends = [
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
];
const AppBanners = ({data  = dataRecommends}: {data?: typeof dataRecommends}) => {
  return (
    <Carousel autoPlay autoPlayInterval={5000} showIndicators showArrows={false} loop>
      {data.map((image, idx) => (
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
  );
};

export default AppBanners;