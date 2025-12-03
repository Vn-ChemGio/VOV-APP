import React from 'react';
import {Carousel, CarouselItem} from '@/components/ui/carousel';
import {View} from '@/components/ui/view';
import {Image} from '@/components/ui/image';
import {BORDER_RADIUS} from '@/theme/globals';
import {Text} from '@/components/ui/text';
import {Banner} from "@/types";

const AppBanners = ({data = []}: { data?: Banner[] }) => {
    return (
        <Carousel autoPlay autoPlayInterval={5000} showIndicators showArrows={false} loop>
            {data.map((image, idx) => (
                <CarouselItem key={idx} style={{padding: 0, borderRadius: 12, borderWidth: 0, overflow: 'hidden'}}>
                    <View style={{position: 'relative', height: 240, borderRadius: 12,}}>
                        <Image
                            source={{uri: image.image_url}}
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