import React from 'react';
import {Dimensions, StyleSheet} from "react-native";
import {View} from "@/components/ui/view";
import {Text} from "@/components/ui/text";
import {ScrollView} from "@/components/ui/scroll-view";
import {Image} from "@/components/ui/image";
import {ShareButton} from "@/components/ui/share";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {useColor} from "@/hooks/useColor";
import {Recommend} from "@/types";

const {width: screenWidth} = Dimensions.get('window');

export const Recommends = ({data = []}: { data?: Recommend[] }) => {
  const backgroundColor = useColor('background');
  
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text variant="subtitle" style={styles.title}>Gợi ý cho bạn</Text>
      
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, i) => (
          <Card key={i} style={styles.card}>
            <Image source={{uri: item.image_url}}
                   contentFit="cover"
                   variant="default"
                   containerStyle={styles.cardImageWrapper}
                   style={styles.cardImage}
            />
            <View style={{flex: 1, gap: 4, justifyContent: 'space-between'}}>
              <CardHeader style={styles.cardHeader}>
                <CardTitle style={styles.cardTitle}>{item.title}</CardTitle>
                <CardDescription
                  style={styles.cardDescription}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.description}
                </CardDescription>
              </CardHeader>
              
              <CardFooter style={styles.cardFooter}>
                <CardDescription
                  style={styles.cardDescription}>{item.published_at || new Date().toLocaleDateString()}</CardDescription>
                <ShareButton
                  content={{
                    url: item.source_url,
                    title: item.title,
                    subject: item.description,
                    message: item.title,
                  }}
                  variant="link"
                />
              </CardFooter>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16, gap: 12
  },
  title: {
    fontSize: 18, paddingHorizontal: 16
  },
  contentContainer: {
    gap: 16, paddingHorizontal: 16
  },
  card: {
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
  },
  cardImageWrapper: {
    position: 'relative',
    height: screenWidth * 2 / 3 * 9 / 16,
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardHeader: {paddingHorizontal: 12, flex: 1, paddingVertical: 0},
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
  
})

export default Recommends;