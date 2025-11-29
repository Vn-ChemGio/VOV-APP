import React, {useRef} from 'react';
import {Text} from '@/components/ui/text';
import {ScrollView} from '@/components/ui/scroll-view';
import {Card, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {View} from '@/components/ui/view';
import {Image} from '@/components/ui/image';
import {Button} from '@/components/ui/button';
import {PauseIcon, PlayIcon} from 'lucide-react-native';
import {useColor} from '@/hooks/useColor';
import {Dimensions} from 'react-native';
import TrackPlayer, {Track, useActiveTrack, useIsPlaying} from "react-native-track-player";
import {useQueue} from "@/stores/queue";

export interface PodcastItem {
    id: number;
    title: string;
    description: string;
    image_url: string;
    source_url: string;
}

const {width: screenWidth} = Dimensions.get('window');

const PodCasts = ({data = [], id = 'all'}: { data?: PodcastItem[], id?: string }) => {
    const backgroundColor = useColor('background');
    const borderColor = useColor('border');
    
    const queueOffset = useRef(0)
    const {activeQueueId, setActiveQueueId} = useQueue()
    
    const tracks: Track[] = data.map(item => ({...item, url: item.source_url, artwork: item.image_url}));
    
    const handleTrackSelect = async (selectedTrack: Track) => {
        console.log(selectedTrack)
        const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.source_url)
        
        if (trackIndex === -1) return
        
        const isChangingQueue = id !== activeQueueId
        
        if (isChangingQueue) {
            const beforeTracks: Track[] = tracks.slice(0, trackIndex)
            const afterTracks: Track[] = tracks.slice(trackIndex + 1)
            
            await TrackPlayer.reset()
            
            // we construct the new queue
            await TrackPlayer.add(selectedTrack)
            await TrackPlayer.add(afterTracks)
            await TrackPlayer.add(beforeTracks)
            
            await TrackPlayer.play()
            
            queueOffset.current = trackIndex
            setActiveQueueId(id)
        } else {
            const nextTrackIndex =
                trackIndex - queueOffset.current < 0
                    ? data.length + trackIndex - queueOffset.current
                    : trackIndex - queueOffset.current
            
            await TrackPlayer.skip(nextTrackIndex)
            TrackPlayer.play()
        }
    }
    
    const {playing} = useIsPlaying()
    
    const activeTrackUrl = useActiveTrack()?.url;
    
    return (
        <View style={{paddingHorizontal: 16, paddingVertical: 16, gap: 12, backgroundColor}}>
            <Text variant="subtitle" style={{fontSize: 18}}>
                Podcast mới
            </Text>
            <ScrollView
                horizontal={true}
                contentContainerStyle={{gap: 16}}
                showsHorizontalScrollIndicator={false}
            >
                {tracks.map((item, i) => (
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
                                        ((activeTrackUrl === item.url) && playing) ? () => <PauseIcon
                                                color={backgroundColor} size={32}
                                                strokeWidth={2}/>
                                            : () => <PlayIcon color={backgroundColor} size={32} strokeWidth={2}/>
                                    }
                                    onPress={() => handleTrackSelect(item)}
                                    disabled={activeTrackUrl === item.url && playing}
                                    style={{
                                        width: 72,
                                        height: 72,
                                        borderWidth: 4,
                                        borderColor: backgroundColor,
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
            </ScrollView>
        </View>
    );
};

export default PodCasts;