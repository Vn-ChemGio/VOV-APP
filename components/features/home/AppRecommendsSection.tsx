import React from 'react';
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Image} from '@/components/ui/image';
import {View} from '@/components/ui/view';
import {Text} from '@/components/ui/text';
import {Icon} from '@/components/ui/icon';
import {ArrowRightIcon, HeartIcon, MessageCircleMoreIcon} from 'lucide-react-native';
import {Button} from '@/components/ui/button';
import {ShareButton} from '@/components/ui/share';
import {ScrollView} from '@/components/ui/scroll-view';
import {Dimensions} from 'react-native';
import {useColor} from '@/hooks/useColor';
import {Recommend} from "@/types";

const {width: screenWidth} = Dimensions.get('window');

const AppRecommendsSection = ({data = []}: { data?: Recommend[] }) => {
    const colorText = useColor('text');
    const backgroundColor = useColor('background');
    const shareContent = {
        message: 'Check out this amazing content!',
        url: 'https://example.com',
    };

    return (
        <View style={{paddingVertical: 16, gap: 12, backgroundColor}}>
            <Text variant="subtitle" style={{fontSize: 18, paddingHorizontal: 16}}>
                Gợi ý cho bạn
            </Text>

            <ScrollView
                horizontal={true}
                contentContainerStyle={{gap: 16, paddingHorizontal: 16}}
                showsHorizontalScrollIndicator={false}
            >
                {data.map((item, i) => (
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
                        <Image source={{uri: item.image_url}}
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
    );
};

export default AppRecommendsSection;