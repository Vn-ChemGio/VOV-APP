import {useEffect, useState} from 'react'
import {getColors, ImageColorsResult} from 'react-native-image-colors'
import {useColor} from "./useColor";

export const usePlayerBackground = (imageUrl: string) => {
  const [imageColors, setImageColors] = useState<ImageColorsResult | null>(null)
  const background = useColor('background');
  
  useEffect(() => {
    getColors(imageUrl, {
      fallback: background,
      cache: true,
      key: imageUrl,
    }).then((colors) => setImageColors(colors))
  }, [imageUrl, background])
  
  return {imageColors}
}
