import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAppDispatch } from '@/hooks/store/useAppDisptach';
import { addToFavorite, removeFromFavorite } from '@/store/slices/favoritesSlice';
import { CocktailDetail } from '@/types/Cocktail';
import { ACTIVE_COLOR, INACTIVE_COLOR, TEXT_COLOR } from '@/constants/colors';

interface FavItemProps {
  item: CocktailDetail
  isFavorite: boolean
  onPress: () => void
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    color: TEXT_COLOR,
  }
})

function FavItem({item, isFavorite, onPress}: FavItemProps) {
  const dispatch = useAppDispatch()
  
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
      style={styles.image}
      source={item.thumbnail}
      placeholder={{ blurhash }}
      contentFit="cover"
      transition={1000}
      allowDownscaling
      />
      <Text style={styles.text}>{item.name}</Text>
      <Pressable 
        style={{paddingHorizontal: 16}} 
        onPress={() => {
          if (isFavorite) {
            dispatch(removeFromFavorite(item.id))
          }
          else {
            dispatch(addToFavorite(item))
          }
        }}
      >
        <IconSymbol name="star.fill" size={32} color={isFavorite ? ACTIVE_COLOR : INACTIVE_COLOR} />
      </Pressable>
    </Pressable>
  )
}

export default FavItem