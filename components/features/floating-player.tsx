import {StyleSheet, TouchableOpacity, View, ViewProps} from 'react-native';
import {Image} from 'expo-image';
import {unknownTrackImageUri} from '@/constants/images';
import {PlayPauseButton, SkipToNextButton, SkipToPreviousButton} from './player-controls';
import {MovingText} from '@/components/features/moving-text';
import {useColor} from '@/hooks/useColor';
import {useActiveTrack} from "react-native-track-player";
import {useLastActiveTrack} from "@/hooks/useLastActiveTrack";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export const FloatingPlayer = ({style}: ViewProps) => {
    const {bottom} = useSafeAreaInsets();
    //const displayedTrack = {title: 'La la la'};
    const text = useColor('text');
    const backgroundColor = useColor('background');
    
    const activeTrack = useActiveTrack()
    const lastActiveTrack = useLastActiveTrack()
    
    const displayedTrack = activeTrack ?? lastActiveTrack
    
    const handlePress = () => {
    }
    
    if (!displayedTrack) return null
    
    
    return (
        <TouchableOpacity onPress={() => {
        }} activeOpacity={0.9} style={[styles.container, {
            backgroundColor, bottom: bottom,
            position: 'absolute',
            left: 8,
            right: 8
        }]}>
            <>
                <Image
                    source={{
                        uri: displayedTrack?.artwork ?? unknownTrackImageUri,
                    }}
                    style={styles.trackArtworkImage}
                />
                
                <View style={styles.trackTitleContainer}>
                    <MovingText
                        style={{...styles.trackTitle, color: text}}
                        text={displayedTrack.title ?? ''}
                        animationThreshold={25}
                    />
                </View>
                
                <View style={styles.trackControlsContainer}>
                    <SkipToPreviousButton iconSize={22}/>
                    <PlayPauseButton iconSize={24}/>
                    <SkipToNextButton iconSize={22}/>
                </View>
            </>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 12,
        paddingVertical: 10,
    },
    trackArtworkImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    trackTitleContainer: {
        flex: 1,
        overflow: 'hidden',
        marginLeft: 10,
    },
    trackTitle: {
        fontSize: 18,
        fontWeight: '600',
        paddingLeft: 10,
    },
    trackControlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 20,
        marginRight: 16,
        paddingLeft: 16,
    },
});
