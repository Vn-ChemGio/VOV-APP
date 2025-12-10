import React from 'react';
import {Dimensions, StyleSheet} from "react-native";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {View} from "@/components/ui/view";
import {ShareButton} from "@/components/ui/share";
import {Badge} from "@/components/ui/badge";
import {Image} from '@/components/ui/image';
import {Text} from '@/components/ui/text';
import {useWebView} from "@/contexts/webviews";
import {News} from "@/types";

const {width: screenWidth} = Dimensions.get('window');

const CardNews = (item: News & { key: string }) => {
  const {openWebView} = useWebView()
  
  return (
    <Card style={styles.card}>
      <Image source={{uri: item.image_url}}
             contentFit="cover"
             variant="default"
             containerStyle={styles.cardImageContainer}
             style={styles.cardImage}
      />
      <CardHeader style={styles.cardHeader}>
        <CardTitle style={styles.cardTitle} onPress={() => openWebView(item.source_url)}>{item.title}</CardTitle>
        <Text variant="body" style={styles.cardDescription}>{item.description}</Text>
      
      </CardHeader>
      <CardFooter style={styles.cardFooter}>
        <CardDescription style={{fontSize: 10}}>{item.published_at}</CardDescription>
        
        <ShareButton
          content={{
            url: item.source_url,
            title: item.title,
            subject: item.description,
            message: item.title
          }}
          variant="link"
        />
      </CardFooter>
      <View style={styles.badgeWrapper}>
        <Badge>
          {item.category?.name}
        </Badge>
      </View>
    </Card>
  );
};


const styles = StyleSheet.create({
  card: {
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
  },
  cardImageContainer: {
    width: '100%',
    height: screenWidth * 2 / 3 * 9 / 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardImage: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardHeader: {
    display: 'flex', paddingHorizontal: 12, flex: 1, paddingVertical: 0, gap: 6
  },
  cardTitle: {fontSize: 14},
  cardDescription: {fontSize: 12},
  cardFooter: {
    paddingHorizontal: 12,
    marginTop: 0,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  badgeWrapper: {
    position: 'absolute',
    top: 8,
    right: 8,
  }
})
export default CardNews;