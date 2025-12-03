import React, {useRef} from 'react';
import {View} from '@/components/ui/view';
import {Animated, Dimensions, TouchableOpacity} from "react-native";
import {useColor} from "@/hooks/useColor";
import {LoadingOverlay} from "@/components/ui/spinner";
import {AppHeaderScrollAnimation, AppHeaderStickyAnimation} from "@/components/features/home/AppHeader";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Image} from "@/components/ui/image";
import {Button} from "@/components/ui/button";
import {Text} from "@/components/ui/text";
import {CircleArrowLeftIcon, SquareMenu} from "lucide-react-native";
import {BottomSheet, useBottomSheet} from "@/components/ui/bottom-sheet";
import {useNavigation} from "expo-router";
import {usePodcast, usePodcastCategories} from "@/views/podcasts/hooks/usePodCasts";
import {PodcastCategory} from "@/types";
import {usePodcastCategoriesStore} from "@/views/podcasts/stores";

const {width: screenWidth} = Dimensions.get('window');

export const PodcastScreen = () => {
    const backgroundColor = useColor('background');
    const bgCard = useColor('card');
    const {isVisible, open, close} = useBottomSheet();
    const {selectedCategoryId} = usePodcastCategories();
    const scrollY = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation()
    
    
    return <View style={{flex: 1}}>
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
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 16,
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flex: 1,
                        gap: 8,
                    }}>
                        <Button size='ghost-icon' variant='ghost'
                                icon={() => <CircleArrowLeftIcon size={32} strokeWidth={1}/>}
                                onPress={() => {
                                    if (navigation.canGoBack()) {
                                        navigation.goBack();
                                    }
                                }}
                                animation={true}
                                style={{
                                    padding: 0,
                                }}
                        />
                        <Text variant="heading">Podcasts</Text>
                    </View>
                    <Button size='ghost-icon' variant='ghost' icon={() => <SquareMenu size={32} strokeWidth={1}/>}
                            onPress={open}
                            animation={true}
                            style={{
                                padding: 0,
                            }}
                    />
                </View>
                
                <PodcastListItem category_id={selectedCategoryId}/>
                
                <PodcastsMenu {...{isVisible, close}}/>
            </View>
        </Animated.ScrollView>
    </View>
};

const PodcastsMenu = ({isVisible, close}: { isVisible: boolean; close: () => void }) => {
    const {setSelectedCategoryId, categories} = usePodcastCategoriesStore();
    
    const renderMenuItem = ({item}: { item: PodcastCategory }) => (
        <TouchableOpacity
            style={{
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(0,0,0,0.1)',
            }}
            onPress={() => {
                setSelectedCategoryId(item.id);
                close()
            }}
            key={item.id}
        >
            <Text variant='body' style={{fontWeight: '600'}}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );
    
    return <BottomSheet
        isVisible={isVisible}
        onClose={close}
        title='Danh mục'
        snapPoints={[0.5, 0.8]}
    >
        {categories.map(item => renderMenuItem({item}))}
    </BottomSheet>
}

const PodcastListItem = ({category_id}: { category_id: number }) => {
    const {isLoading, options} = usePodcast(category_id);
    const borderColor = useColor('border');
    
    return isLoading ? <LoadingOverlay visible={true}/> : (
        <View style={{paddingHorizontal: 16, paddingBottom: 120, gap: 16}}>
            {(options || [])?.map((item, i) => (
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
    )
}