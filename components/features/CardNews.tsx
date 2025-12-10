import React from 'react';
import {Dimensions, Pressable, StyleSheet} from "react-native";
import {BlurView} from "expo-blur";
import {Ionicons} from "@expo/vector-icons";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {View} from "@/components/ui/view";
import {ShareButton} from "@/components/ui/share";
import {Badge} from "@/components/ui/badge";
import {Image} from '@/components/ui/image';
import {Text} from '@/components/ui/text';
import {useWebView} from "@/contexts/webviews";
import {Hoverable} from "@/contexts/hover/HoveredContext";
import {News} from "@/types";

const CardNews = (item: News & { idx: number }) => {
  const {openWebView} = useWebView()
  const onPress = () => {
    openWebView(item.source_url)
  }
  return (
    <Card style={styles.card}>
      <Hoverable hoveredValue={item.idx}>
        {(isHovered, setHovered) => (
          <>
            {/* Overlay to dismiss hover when isHovered */}
            {isHovered && (
              <Pressable
              onPress={() => setHovered(false)}
              style={{position: 'absolute', inset: 0, zIndex: 10}}
              pointerEvents="box-none"   // <-- change this line
            >
                {/* empty overlay */}
              </Pressable>
            )}
            <Pressable
              style={{flex: 1, width: '100%', height: '100%'}}
              onPress={() => setHovered(true)}
            >
              <Image source={{uri: item.image_url}}
                     contentFit="cover"
                     variant="default"
                     containerStyle={styles.cardImageContainer}
                     style={styles.cardImage}
              />
              {isHovered && (
                <View style={styles.contentContainerHoveredWrapper}>
                  <View style={{
                    position: 'absolute',
                    zIndex: 1,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    overflow: 'hidden',
                    inset: 0,
                  }}>
                    <BlurView
                      style={{flex: 1}}
                      intensity={5}
                      tint="dark"
                    />
                  </View>
                  <View style={styles.contentContainerHovered}>
                    <Pressable onPress={()=> {openWebView(item.source_url)}} style={styles.onPress}>
                      <Ionicons name="play-circle" size={48} color="#fff" style={{opacity: 0.9}}/>
                    </Pressable>
                  </View>
                </View>
              )}
            </Pressable>
            
            <CardHeader style={styles.cardHeader}>
              <CardTitle style={styles.cardTitle}   numberOfLines={2}onPress={() => {
                setHovered(true);
                onPress();
              }}>{item.title}</CardTitle>
              <Text variant="body" style={styles.cardDescription}   numberOfLines={3} ellipsizeMode="tail">{item.description}</Text>
            
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
          </>
        )}
      </Hoverable>
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
    aspectRatio: 16/9,
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
  },
  
  contentContainerHoveredWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    pointerEvents: 'auto',
    zIndex: 11,
  },
  contentContainerHovered: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    borderRadius: 12
  },
  onPress: {
    borderRadius: 9999, overflow: 'hidden'
  }
})
export default CardNews;