import React, {useEffect, useRef, useState} from 'react';
import {View} from '@/components/ui/view';
import {Animated, Dimensions} from "react-native";
import {useColor} from "@/hooks/useColor";
import {PodcastItem} from "@/components/features/home/PodCasts";
import {LoadingOverlay} from "@/components/ui/spinner";
import {AppHeaderScrollAnimation, AppHeaderStickyAnimation} from "@/components/features/home/AppHeader";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Image} from "@/components/ui/image";
import {Button} from "@/components/ui/button";
import {PauseIcon, PlayIcon} from "lucide-react-native";

const {width: screenWidth} = Dimensions.get('window');

const PodCastScreen = () => {
    const backgroundColor = useColor('background');
    const bgCard = useColor('card');
    const borderColor = useColor('border');

    const scrollY = useRef(new Animated.Value(0)).current;

    const [data, setData] = useState<PodcastItem[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // State to track which podcast item is being played (for blur view)
    const [playingPodcastIndex, setPlayingPodcastIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('https://vov-api-production.up.railway.app/podcasts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return loading ? <LoadingOverlay visible={true}/> : (
        <View style={{flex: 1}}>
            <AppHeaderStickyAnimation scrollY={scrollY}/>
            <Animated.ScrollView
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: false}
                )}
                style={{
                    width: '100%',
                    backgroundColor,
                    paddingBottom: 120,
                }}
            >
                <View style={{
                    gap: 8,
                    backgroundColor: bgCard,
                }}>
                    {/* Section 1: Heading (logo + welcome bar) */}
                    <AppHeaderScrollAnimation scrollY={scrollY}/>

                    {/* Section 4: PodCasts */}

                    <View style={{padding: 16, paddingBottom: 120, gap: 16}}>
                        {data?.map((item, i) => (
                            <Card
                                key={i}
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
                                <View
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: screenWidth * 2 / 3 * 9 / 16,
                                        borderTopLeftRadius: 12,
                                        borderTopRightRadius: 12,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Image source={{uri: item.image_url}}
                                           contentFit="cover"
                                           variant="default"
                                           containerStyle={{
                                               width: '100%',
                                               height: '100%',
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
                                    {/* Play button centered on image */}
                                    <View
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            icon={
                                                playingPodcastIndex === i
                                                    ? () => <PauseIcon color={backgroundColor} size={32}
                                                                       strokeWidth={2}/>
                                                    : () => <PlayIcon color={backgroundColor} size={32}
                                                                      strokeWidth={2}/>
                                            }
                                            onPress={() => {
                                                setPlayingPodcastIndex(playingPodcastIndex === i ? null : i);
                                            }}
                                            style={{
                                                width: 72,
                                                height: 72,
                                                borderWidth: 4,
                                                borderColor: borderColor,
                                            }}
                                        />
                                    </View>

                                </View>
                                <CardHeader style={{paddingHorizontal: 12, flex: 1, paddingVertical: 0}}>
                                    <CardTitle style={{fontSize: 14}}>{item.title}</CardTitle>
                                    <CardDescription style={{fontSize: 12}}>
                                        {item.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </View>
                </View>
            </Animated.ScrollView>
        </View>
    );
};

export default PodCastScreen;