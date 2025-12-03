import React from 'react';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Icon } from '@/components/ui/icon';
import { ArrowRightIcon, HeartIcon, MessageCircleMoreIcon } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { ShareButton } from '@/components/ui/share';
import { useColor } from '@/hooks/useColor';
import { Dimensions } from 'react-native';
import {News} from "@/types";

const {width: screenWidth} = Dimensions.get('window');

const LatestNews = ({data = []}: {data?: News[]}) => {
  const backgroundColor = useColor('background');
  const colorText = useColor('text');
  
  const shareContent = {
    message: 'Check out this amazing content!',
    url: 'https://example.com',
  };
  
  return (
    <View style={{paddingHorizontal: 16, paddingVertical: 16, gap: 12, backgroundColor}}>
      <Text variant="subtitle" style={{fontSize: 18}}>Tin mới cập nhật</Text>
      <View style={{rowGap: 12}}>
        {data.map((item, i) => (
          <Card
            key={`news-${i}`}
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
      </View>
    </View>
  );
};

export default LatestNews;