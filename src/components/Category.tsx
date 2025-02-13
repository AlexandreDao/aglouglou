import React from 'react'
import { View, Text, ColorValue, StyleSheet, TextStyle } from 'react-native'
import { TEXT_COLOR } from '@/constants/colors'

interface CategoryProps {
  title: string
  backgroundColor?: ColorValue
  textStyle?: TextStyle
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  text: {
    color: TEXT_COLOR,
    fontSize: 12,
  },
})

const Category = ({ title, textStyle, backgroundColor = 'grey' }: CategoryProps) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, textStyle]} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
    </View>
  )
}

export default Category
