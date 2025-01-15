import { View, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

function Separator() {
  return <View style={styles.separator} />
}

export default Separator
