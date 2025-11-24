import React, {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import {View} from '@/components/ui/view';
import {useColor} from '@/hooks/useColor';
import {AppHeaderScrollAnimation, AppHeaderStickyAnimation} from '@/components/features/home/AppHeader';
import AppBanners, {BannerItem} from '@/components/features/home/AppBanners';
import AppMenu from '@/components/features/home/AppMenu';
import AppRecommendsSection, {RecommendItem} from '@/components/features/home/AppRecommendsSection';
import RadioChannels, {RadioChannel} from '@/components/features/home/RadioChannels';
import News, {NewsItem} from '@/components/features/home/News';
import PodCasts, {PodcastItem} from '@/components/features/home/PodCasts';
import {LoadingOverlay} from "@/components/ui/spinner";

const HomeScreen = () => {
    const backgroundColor = useColor('background');
    const bgCard = useColor('card');

    const scrollY = useRef(new Animated.Value(0)).current;

    const [data, setData] = useState<{
        banners: BannerItem[],
        recommends: RecommendItem[],
        radios: RadioChannel[],
        news: NewsItem[],
        podcasts: PodcastItem[],
    }>({news: [], banners: [], recommends: [], radios: [], podcasts: []});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('https://vov-api-production.up.railway.app');
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

                    {/* Section 2: Carousel Image + Menu */}
                    <View style={{padding: 16, gap: 16, backgroundColor}}>
                        <AppBanners data={data.banners}/>
                        <AppMenu/>
                    </View>

                    {/* Section 3: Carousel Content */}
                    <AppRecommendsSection data={data.recommends}/>

                    {/* Section 4: Radio list (3x2 grid) */}
                    <RadioChannels data={data.radios}/>

                    {/* Section 4: News */}
                    <News data={data.news}/>

                    {/* Section 4: PodCasts */}
                    <PodCasts data={data.podcasts}/>

                </View>
            </Animated.ScrollView>
        </View>
    );
};

export default HomeScreen;