import {Icon} from '@/components/ui/icon';
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,} from '@/components/ui/sheet';
import {Text} from '@/components/ui/text';
import {View} from '@/components/ui/view';
import {Image} from '@/components/ui/image';
import {useColor} from '@/hooks/useColor';
import {Bell, Home, Mail, MoonStar, Settings, ShieldUser, Sun} from 'lucide-react-native';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {SheetForm} from "@/components/demo/sheet/sheet-form";
import {useModeToggle} from "@/hooks/useModeToggle";
import {Button} from "@/components/ui/button";

export function SheetNavigation() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  
  const textColor = useColor('text');
  const mutedColor = useColor('textMuted');
  const borderColor = useColor('border');
  const {bottom} = useSafeAreaInsets()
  
  const {toggleMode, isDark} = useModeToggle();
  
  const navigationItems = [
    {id: 'home', label: 'Home', icon: Home},
    {id: 'notifications', label: 'Thông báo', icon: Bell},
    {id: 'messages', label: 'Góp ý - Hỗ trợ', icon: Mail},
    {id: 'rule', label: 'Riêng tư & bảo mật', icon: ShieldUser},
    {id: 'settings', label: isDark ? 'Giao diện sáng' : 'Giao diện tối', icon: isDark ? Sun : MoonStar},
  ];
  
  const handleItemPress = (itemId: string) => {
    if(itemId == 'settings') {
      return toggleMode()
    }
    setActiveItem(itemId);
    setOpen(false);
  };
  
  return (
    <Sheet open={open} onOpenChange={setOpen} side="left">
      <SheetTrigger asChild>
        <Button size='icon' icon={Settings}  variant='outline'/>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <Image
            source={require('@/assets/images/logo-square.png')}
            width={64}
            height={64}
            variant="rounded"
            containerStyle={{borderWidth: 1, borderColor, padding: 4}}
          />
          
          <SheetTitle>VOV Giải trí</SheetTitle>
          <SheetDescription>
            Thông tin - Giải trí Tổng hợp
          </SheetDescription>
        </SheetHeader>
        <View style={{flex: 1, justifyContent: 'space-between', paddingBottom: bottom}}>
          <View style={styles.navigationContainer}>
            {navigationItems.map((item) => {
              const name = item.icon;
              const isActive = activeItem === item.id;
              
              if (item.id == 'messages') {
                return <SheetForm isActive={isActive} key={item.id}/>
              }
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.navigationItem,
                    {
                      backgroundColor: isActive
                        ? `${textColor}10`
                        : 'transparent',
                      borderColor,
                    },
                  ]}
                  onPress={() => handleItemPress(item.id)}
                >
                  <Icon
                    name={name}
                    size={20}
                    color={isActive ? textColor : mutedColor}
                  />
                  <Text
                    style={[
                      styles.navigationText,
                      {color: isActive ? textColor : mutedColor},
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          
          <Text style={{paddingHorizontal: 16}}>Phiên bản: 0.0.1</Text>
          <Text style={{paddingHorizontal: 16}}>VOV-The Voice of Vietnam</Text>
        </View>
      </SheetContent>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    padding: 16,
    gap: 8,
    flex: 1,
  },
  navigationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  navigationText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
