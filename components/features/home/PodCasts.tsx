import React, { useState } from 'react';
import { Text } from '@/components/ui/text';
import { ScrollView } from '@/components/ui/scroll-view';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { View } from '@/components/ui/view';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { PauseIcon, PlayIcon } from 'lucide-react-native';
import { useColor } from '@/hooks/useColor';
import { Dimensions } from 'react-native';

export const podcasts = [
  {
    cover: 'https://vov2.vov.vn/sites/default/files/styles/front_medium/public/2025-11/481467353_3827583790719028_7129256577207251207_n.jpg',
    title: 'Phụ nữ hơn nhau cách sống, không phải may mắn',
    description: '[VOV2] - Cuộc sống không ai giống ai, người có điều kiện, người khó khăn, người được yêu chiều, người phải tự lập. Nhưng chính cách chúng ta chọn đối diện với mọi việc mới tạo nên giá trị của bản thân.',
    source: 'https://vov2.vov.vn/sites/default/files/2025-11/1211_linh_linh.mp3'
  }, {
    cover: 'https://vov2.vov.vn/sites/default/files/styles/front_medium/public/2025-10/thac-sy-Nguyen-Ba-Manh.jpg',
    title: 'Biết chấp nhận thất bại khi nghiên cứu khoa học mới có thể vươn tới thành công',
    description: 'VOV2] - ThS. Nguyễn Bá Mạnh, Viện Hóa học – người vừa nhận được Giải thưởng Quả Cầu Vàng 2025 cho rằng tinh thần vượt khó, chấp nhận thất bại chính là tinh thần của nghiên cứu khoa học.',
    source: 'https://vov2.vov.vn/sites/default/files/2025-10/v2_23.10_gddt.mp3',
  }, {
    cover: 'https://vov2.vov.vn/sites/default/files/styles/front_medium/public/2025-11/ngoai-binh-bong-chuyen.png',
    title: 'Ngoại binh bóng chuyền: Cú hích chuyên nghiệp hay con dao hai lưỡi?',
    description: '[VOV2] - Thuê ngoại binh là xu thế tất yếu trong quá trình chuyên nghiệp hóa bóng chuyền Việt Nam. Tuy nhiên, nếu không có chiến lược rõ ràng, sự phát triển này có thể trở thành con dao hai lưỡi, làm tổn thương chính nền tảng nội địa.',
    source: 'https://vov2.vov.vn/sites/default/files/2025-11/15-11_chill_the_thao.mp3'
  }, {
    cover: 'https://vov2.vov.vn/sites/default/files/styles/front_medium/public/2025-11/Hanh-phuc-trong-tam-tay.jpg',
    title: 'Hạnh phúc trong tầm tay',
    description: '[VOV2] - Để có được tình yêu, chúng ta cần tỉnh táo, suy xét mọi khía cạnh. Đừng chỉ vì chạy theo một hình bóng để rồi vuột mất hạnh phúc trong tay. Đó là gợi ý của chuyên gia tâm lý Vũ Thu Hà dành cho người đàn ông không biết chọn con tim hay theo lý trí',
    source: 'https://vov2.vov.vn/sites/default/files/2025-11/tram_sac_cam_xuc.mp3'
  }
];
const {width: screenWidth} = Dimensions.get('window');

const PodCasts = ({data = podcasts}: {data?: typeof podcasts}) => {
  const backgroundColor = useColor('background');
  const borderColor = useColor('border');
  
  // State to track which podcast item is being played (for blur view)
  const [playingPodcastIndex, setPlayingPodcastIndex] = useState<number | null>(null);
  
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
        {data.map((item, i) => (
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
              <Image source={{uri: item.cover}}
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
                      ? () => <PauseIcon color={backgroundColor} size={32} strokeWidth={2}/>
                      : () => <PlayIcon color={backgroundColor} size={32} strokeWidth={2}/>
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
      </ScrollView>
    </View>
  );
};

export default PodCasts;