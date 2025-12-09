import React from 'react';
import {Text} from '@/components/ui/text';
import {View} from '@/components/ui/view';
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Image} from '@/components/ui/image';
import {ShareButton} from '@/components/ui/share';
import {useColor} from '@/hooks/useColor';
import {Dimensions} from 'react-native';
import {News} from "@/types";
import {useWebView} from "@/contexts/webviews";
import {Badge} from "@/components/ui/badge";

const {width: screenWidth} = Dimensions.get('window');

const LatestNews = ({data = []}: { data?: News[] }) => {
  const backgroundColor = useColor('background');
  
  const {openWebView} = useWebView()
  return (
    <View style={{paddingHorizontal: 16, paddingVertical: 16, gap: 12, backgroundColor}}>
      <Text variant="subtitle" style={{fontSize: 18}}>Tin mới cập nhật</Text>
      <View style={{rowGap: 12}}>
        {data.slice(0, 5).map((item, i) => (
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
            <CardHeader style={{display: 'flex', paddingHorizontal: 12, flex: 1, paddingVertical: 0, gap: 6}}>
              <CardTitle style={{fontSize: 14}} onPress={() => openWebView(item.source_url)}>{item.title}</CardTitle>
              <Text variant="body" style={{fontSize: 12}}>{item.description}</Text>
            
            </CardHeader>
            <CardFooter style={{
              paddingHorizontal: 12,
              marginTop: 0,
              paddingBottom: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <CardDescription style={{fontSize: 10}}>{item.published_at}</CardDescription>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ShareButton
                  content={{
                    url: item.source_url,
                    title: item.title,
                    subject: item.description,
                    message: item.description
                  }}
                  variant="link"
                />
              </View>
            </CardFooter>
            <View style={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}>
              <Badge>
                {item.category?.name}
              </Badge>
            </View>
          </Card>
        ))}
      </View>
    </View>
  );
};

export default LatestNews;