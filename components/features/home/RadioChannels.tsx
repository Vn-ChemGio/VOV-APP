import React from 'react';
import {Dimensions, Platform, Pressable} from 'react-native';
import {View} from '@/components/ui/view';
import {Text} from '@/components/ui/text';
import {Card} from '@/components/ui/card';
import {Image} from '@/components/ui/image';
import {useColor} from '@/hooks/useColor';
import {RadioChannel} from "@/types";
import {BlurView} from "expo-blur";
import {StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const {width: screenWidth} = Dimensions.get('window');

// Hoverable: Cross-platform hover/touchable component
const Hoverable = ({ children }: { children: (props: { hovered: boolean }) => React.ReactNode }) => {
    const [hovered, setHovered] = React.useState(false);
    if (Platform.OS === 'web') {
        return (
            <div
                style={{ width: '100%', height: '100%' }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {children({ hovered })}
            </div>
        );
    } else {
        return (
            <Pressable
                style={{ width: '100%', height: '100%' }}
                onPressIn={() => setHovered(true)}
                onPressOut={() => setHovered(false)}
            >
                {children({ hovered })}
            </Pressable>
        );
    }
};

const RadioChannels = ({data = []}: { data?: RadioChannel[] }) => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
    const backgroundColor = useColor('background');
    const borderColor = useColor('border');
    return (
        <View style={{paddingHorizontal: 16, paddingVertical: 16, gap: 12, backgroundColor}}>
            <Text variant="subtitle" style={{fontSize: 18}}>Chương trình Radio</Text>
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    rowGap: 12,
                }}
            >
                {data.map((item, idx) => (
                    <Card
                        key={`radio-${idx}`}
                        style={{
                            width: (screenWidth - 16 * 2 - 8 * 2) / 3,
                            height: (screenWidth - 16 * 2 - 8 * 2) / 3,
                            padding: 0,
                            overflow: 'hidden',
                            borderWidth: 1,
                            borderColor,
                            aspectRatio: 1,
                            position: 'relative',
                        }}
                    >
                        {/*
                          Chúng ta cần:
                          - Giữ trạng thái hover sau khi nhả tay để bấm play.
                          - Nếu click ra ngoài card hiện tại thì bỏ hover.
                          Để làm được điều đó, dùng context để quản lý card đang hover cho mỗi lần render.
                        */}
                        {(() => {
                            // Dùng context để lưu index card đang hover hoặc null
                            // (tạo context phía trên file)
                            // Ta sẽ sử dụng useState ở component cha và truyền xuống index của card được hover + hàm set.
                            // Ở đây chỉ dùng cho 1 selection. Giả định các giá trị truyền prop:
                            //   hoveredIndex: number | null
                            //   setHoveredIndex: (i:number|null)=>void

                            // Xây dựng context tạm đơn giản hơn, không cần tạo context riêng
                            // (giả định di chuyển useState và cụm này ra ngoài data.map):
                            //   const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
                            // Dưới đây truyền theo render prop:
                            // <RadioChannels data={...} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />

                            // Cần sửa thuộc tính view: không thể dùng onMouseEnter/onMouseLeave với React Native View
                            // nên sẽ tương thích chỉ với web dùng "react-native-web" bằng TouchableWithoutFeedback hoặc Pressable
                            // và pointerEvents để detect click outside

                            // ----- Đặt phần ở bên trong map(card) -----
                            // Sử dụng Pressable để xử lý hover bằng tay
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const isHovered = hoveredIndex === idx;
                            const setHovered = (v: boolean) => setHoveredIndex(v ? idx : null);

                            // Để xử lý click ra ngoài card thì nên dùng một overlay View bắt sự kiện "press" toàn màn
                            // Khi hover, thêm 1 View phủ toàn màn pointerEvents="auto", onPress thì setHoveredIndex(null)

                            return (
                                <>
                                    {isHovered && (
                                        // Bắt click ra ngoài để bỏ hover
                                        <Pressable
                                            onPress={() => setHovered(false)}
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                zIndex: 10,
                                            }}
                                            pointerEvents="auto"
                                        >
                                            {/* Không render gì trong này */}
                                        </Pressable>
                                    )}
                                    <Pressable
                                        style={{ flex: 1, width: '100%', height: '100%' }}
                                        onPress={() => setHovered(true)}
                                    >
                                        <Image
                                            source={{ uri: `https://vov-api-production.up.railway.app${item.image_url}` }}
                                            height={(screenWidth - 16 * 2 - 8 * 2) / 3}
                                            contentFit="cover"
                                            style={{ aspectRatio: 1, width: '100%', height: '100%' }}
                                        />
                                        {isHovered && (
                                            <View
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: 'rgba(0,0,0,0.35)',
                                                    // Đặt pointerEvents auto để có thể bấm được vào icon play/pause
                                                    pointerEvents: 'auto',
                                                    zIndex: 11,
                                                }}
                                            >
                                                <BlurView
                                                    style={{
                                                        ...StyleSheet.absoluteFillObject,
                                                        zIndex: 1,
                                                    }}
                                                    intensity={25}
                                                    tint="dark"
                                                />
                                                <View
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        zIndex: 2,
                                                    }}
                                                >
                                                    <Pressable
                                                        onPress={() => {
                                                            // Phát nhạc tại đây; đóng hover nếu muốn
                                                            // setHovered(false)
                                                        }}
                                                        style={{ borderRadius: 9999, overflow: 'hidden' }}
                                                    >
                                                        <Ionicons name="play-circle" size={48} color="#fff" style={{ opacity: 0.9 }} />
                                                    </Pressable>
                                                </View>
                                            </View>
                                        )}
                                    </Pressable>
                                </>
                            );
                        })()}
                    </Card>
                ))}
            </View>
        </View>
    );
};

export default RadioChannels;