import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from '@/components/ui/sheet';
import {Text} from '@/components/ui/text';
import {useColor} from '@/hooks/useColor';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from "@/components/ui/icon";
import {Bell, Home, Mail, Menu, MoonStar, ShieldUser, Sun} from "lucide-react-native";
import {useModeToggle} from "@/hooks/useModeToggle";
import {Image} from "@/components/ui/image";
import {useAudio} from "@/hooks";

export function SheetRadioSchedules() {
  const [open, setOpen] = useState(false);
  
  const textColor = useColor('text');
  const mutedColor = useColor('textMuted');
  const borderColor = useColor('border');
  
  const {isDark} = useModeToggle();
  
  const {currentContent} = useAudio()
  
  const navigationItems = [
    {id: 'home', label: 'Home', icon: Home},
    {id: 'notifications', label: 'Thông báo', icon: Bell},
    {id: 'messages', label: 'Góp ý - Hỗ trợ', icon: Mail},
    {id: 'rule', label: 'Riêng tư & bảo mật', icon: ShieldUser},
    {id: 'settings', label: isDark ? 'Giao diện sáng' : 'Giao diện tối', icon: isDark ? Sun : MoonStar},
  ];
  
  
  return (
    <Sheet open={open} onOpenChange={setOpen} side="right">
      <SheetTrigger asChild>
        <Button size='icon' icon={Menu} variant='outline'/>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <Image
            source={require('@/assets/images/logo-square.png')}
            width={48}
            height={48}
            variant="rounded"
            containerStyle={{borderWidth: 1, borderColor, padding: 4}}
          />
          <SheetTitle>Lịch phát sóng</SheetTitle>
        </SheetHeader>
        <ScrollView>
          <View style={styles.navigationContainer}>
            {navigationItems.map((item) => {
              const isActive = item.id === 'home';
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
                >
                  <Icon
                    name={item.icon}
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
        </ScrollView>
      </SheetContent>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 24,
    gap: 20,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  button: {
    flex: 1,
  },
  navigationContainer: {
    display: 'flex',
    flexDirection: 'column',
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
