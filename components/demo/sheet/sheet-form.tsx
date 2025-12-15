import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import React, { useState } from 'react';
import {Alert, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Icon} from "@/components/ui/icon";
import {Mail} from "lucide-react-native";

export function SheetForm({isActive}: {isActive: boolean}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const textColor = useColor('text');
  const backgroundColor = useColor('background');
  const borderColor = useColor('border');
  const mutedColor = useColor('textMuted');

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    Alert.alert('Success', 'Form submitted successfully!');
    setFormData({ name: '', email: '', message: '' });
    setOpen(false);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen} side="left">
      <SheetTrigger asChild>
        <TouchableOpacity
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
            name={Mail}
            size={20}
            color={isActive ? textColor : mutedColor}
          />
          <Text
            style={[
              styles.navigationText,
              {color: isActive ? textColor : mutedColor},
            ]}
          >
            Góp ý - Hỗ trợ
          </Text>
        </TouchableOpacity>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Góp ý</SheetTitle>
          <SheetDescription>
            Mời bạn điền vào các nội dung dưới đây, chúng tôi sẽ trả lời sớm nhất có thể,
          </SheetDescription>
        </SheetHeader>
        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: textColor }]}>Họ và tên</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor,
                  backgroundColor,
                  color: textColor,
                },
              ]}
              value={formData.name}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, name: text }))
              }
              placeholder='Nguyễn Văn A'
              placeholderTextColor={mutedColor}
            />
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: textColor }]}>Số điện thoại</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor,
                  backgroundColor,
                  color: textColor,
                },
              ]}
              value={formData.email}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, email: text }))
              }
              placeholder='+84 987 654 321'
              placeholderTextColor={mutedColor}
              keyboardType='email-address'
              autoCapitalize='none'
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: textColor }]}>Thư điện tử</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor,
                  backgroundColor,
                  color: textColor,
                },
              ]}
              value={formData.email}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, email: text }))
              }
              placeholder='nguyenvana@tencongty.com'
              placeholderTextColor={mutedColor}
              keyboardType='email-address'
              autoCapitalize='none'
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: textColor }]}>Nội dung muốn gửi</Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                {
                  borderColor,
                  backgroundColor,
                  color: textColor,
                },
              ]}
              value={formData.message}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, message: text }))
              }
              placeholder='Tôi muốn góp ý về ...'
              placeholderTextColor={mutedColor}
              multiline
              numberOfLines={4}
              textAlignVertical='top'
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={handleSubmit}>
              Gửi
            </Button>
            <Button
              variant='outline'
              style={styles.button}
              onPress={handleReset}
            >
              Làm lại
            </Button>
          </View>
        </View>
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
