import React, { useRef } from 'react';
import { Link } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Animated, View } from 'react-native';
import { MusicHeader } from '@/components/features/MusicHeader';

const HomeScreen = () => {
  const handleSharePress = () => {
  };
  const handleBlockPress = () => {
  };
  
  const scrollY = useRef(new Animated.Value(0)).current;
  
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <MusicHeader scrollY={scrollY} title="Library" />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingTop: 120 }}
      >
        <Link href="/(tabs)">
          <Link.Trigger>
            <Text>Music Page</Text>
          </Link.Trigger>
          <Link.Preview style={{width: 300, height: 200}}/>
          <Link.Menu>
            <Link.MenuAction title="Share" icon="square.and.arrow.up" onPress={handleSharePress}/>
            <Link.MenuAction title="Block" icon="nosign" destructive onPress={handleBlockPress}/>
          </Link.Menu>
        </Link>
        
        <Link href="/profile">
          <Link.Trigger><Text>Profile</Text></Link.Trigger>
          <Link.Preview style={{width: 300, height: 200}}/>
          <Link.Menu>
            <Link.MenuAction title="Share" icon="square.and.arrow.up" onPress={handleSharePress}/>
            <Link.MenuAction title="Block" icon="nosign" destructive onPress={handleBlockPress}/>
          </Link.Menu>
        </Link>
        {Array.from({ length: 40 }).map((_, i) => (
          <Text
            key={i}
            style={{
              padding: 20,
              fontSize: 18,
              borderBottomWidth: 0.5,
              borderBottomColor: "#e0e0e0",
            }}
          >
            Song {i + 1}
          </Text>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;