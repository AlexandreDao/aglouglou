import React from 'react'
import { View, Text, ColorValue, StyleSheet } from 'react-native'
import { TEXT_COLOR } from '@/constants/colors'

interface CategoryProps {
  title: string
  backgroundColor?: ColorValue
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  text: {
    color: TEXT_COLOR,
    fontSize: 12,
  },
})

function Category({ title, backgroundColor = 'grey' }: CategoryProps) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
    </View>
  )
}

export default Category
