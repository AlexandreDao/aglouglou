import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface FavItemProps {
  img: string
  name: string
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
    backgroundColor: '#0553',
  },
})

function FavItem({img, name, isFavorite, onPress}: FavItemProps) {
  return (
    <Pressable style={styles.container}>
      <Image
      style={styles.image}
      source={img} 
      placeholder={{ blurhash }}
      contentFit="cover"
      transition={1000}
      allowDownscaling
      />
      <Text>{name}</Text>
      <Pressable style={{paddingHorizontal: 16}} onPress={onPress}>
        <IconSymbol name="star.fill" size={32} color={isFavorite ? "red" : "gray"} />
      </Pressable>
    </Pressable>
  )
}

export default FavItem