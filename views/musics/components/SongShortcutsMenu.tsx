import {MenuView} from '@react-native-menu/menu'
import {PropsWithChildren} from 'react'

import {MusicSong} from "@/types";

type SongShortcutsMenuProps = PropsWithChildren<{ song: MusicSong }>

export const SongShortcutsMenu = ({song, children}: SongShortcutsMenuProps) => {
  
  const handlePressAction = (id: string) => {
  
  }
  
  const isFavorite = true;
  return (
    <MenuView
      onPressAction={({nativeEvent: {event}}) => handlePressAction(event)}
      actions={[
        {
          id: isFavorite ? 'remove-from-favorites' : 'add-to-favorites',
          title: isFavorite ? 'Remove from favorites' : 'Add to favorites',
          image: isFavorite ? 'star.fill' : 'star',
        },
        {
          id: 'add-to-playlist',
          title: 'Add to playlist',
          image: 'plus',
        },
      ]}
    >
      {children}
    </MenuView>
  )
}
