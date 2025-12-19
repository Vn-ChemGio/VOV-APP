import {useEffect, useState} from 'react'
import {getColors} from 'react-native-image-colors'
import {IOSImageColors} from 'react-native-image-colors/build/types'
import {useColor} from "./useColor";

export const usePlayerBackground = (imageUrl: string) => {
  const [imageColors, setImageColors] = useState<IOSImageColors | null>(null)
  const background = useColor('background');
  
  useEffect(() => {
    getColors(imageUrl, {
      fallback: background,
      cache: true,
      key: imageUrl,
    }).then((colors) => setImageColors(colors as IOSImageColors))
  }, [imageUrl, background])
  
  return {imageColors}
}
