import React from 'react';
import {StyleSheet} from "react-native";
import {Carousel, CarouselItem} from '@/components/ui/carousel';
import {View} from '@/components/ui/view';
import {Image} from '@/components/ui/image';
import {Text} from '@/components/ui/text';
import {BORDER_RADIUS} from '@/theme/globals';
import {Banner} from "@/types";

export const AppBanners = ({data = []}: { data?: Banner[] }) => {
  return (
    <Carousel autoPlay autoPlayInterval={5000} showIndicators showArrows={false} loop>
      {data.map((image, idx) => (
        <CarouselItem key={idx} style={styles.carouselItemWrapper}>
          <View style={styles.carouselItemContainer}>
            <Image source={{uri: image.image_url}} style={styles.carouselItemImage} contentFit="cover"/>
            {
              (image.title || image.description) && (<View style={styles.carouselItemTitleContainer}>
                {
                  image.title && <Text variant="title" style={styles.carouselItemTitle}>{image.title}</Text>
                }
                {
                  image.description && <Text style={styles.carouselItemDescription}>{image.description}</Text>
                }
              </View>)
            }
          </View>
        </CarouselItem>
      ))}
    </Carousel>
  );
};

const styles = StyleSheet.create({
  carouselItemWrapper: {
    padding: 0, borderRadius: 12, borderWidth: 0, overflow: 'hidden'
  },
  carouselItemContainer: {
    position: 'relative', height: 240, borderRadius: 12,
  },
  carouselItemImage: {
    width: '100%',
    height: 240,
    borderRadius: BORDER_RADIUS,
  },
  carouselItemTitleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    padding: 12,
  },
  carouselItemTitle: {
    color: 'white',
    fontSize: 14,
    marginBottom: 4,
  },
  carouselItemDescription: {
    color: 'white',
    opacity: 0.9,
    fontSize: 12,
  }
})