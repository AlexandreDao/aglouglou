import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { INACTIVE_COLOR } from '@/constants/colors'
import { IconSymbol } from '@/components/ui/IconSymbol'

const Fab = () => {
  return (
    <Pressable>
       <IconSymbol size={28} name="magnifyingglass" color={INACTIVE_COLOR} />
    </Pressable>
  )
}

export default Fab