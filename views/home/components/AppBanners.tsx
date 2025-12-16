import React from 'react';
import {StyleSheet} from "react-native";
import {Carousel, CarouselItem} from '@/components/ui/carousel';
import {Image} from '@/components/ui/image';
import {BORDER_RADIUS} from '@/theme/globals';
import {Banner} from "@/types";

export const AppBanners = ({data = []}: { data?: Banner[] }) => {
  return (
    <Carousel autoPlay autoPlayInterval={5000} showIndicators showArrows={false} loop>
      {data.map((image, idx) => (
        <CarouselItem key={idx} style={styles.carouselItemWrapper}>
          <Image source={{uri: image.image_url}} containerStyle={styles.carouselItemImage} contentFit="cover"/>
        </CarouselItem>
      ))}
    </Carousel>
  );
};

const styles = StyleSheet.create({
  carouselItemWrapper: {
    padding: 0,
    height: 240,
  },
  carouselItemImage: {
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
})