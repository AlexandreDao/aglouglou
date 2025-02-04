import { StyleSheet, Text, TextStyle, TextProps } from 'react-native'
import React from 'react'
import { ACTIVE_COLOR } from '@/constants/colors'
import { normalizeString } from '@/utils/stringUtils'

interface HighlightTextProps {
  textToHighlight?: string
  numberOfLines?: number
  children: string
  style?: TextStyle
}

const styles = StyleSheet.create({
  highlightedText: {
    color: ACTIVE_COLOR,
  },
})

const HighlightText = ({ textToHighlight, children, style, numberOfLines }: HighlightTextProps) => {
  if (!textToHighlight)
    return (
      <Text style={style} numberOfLines={numberOfLines}>
        {children}
      </Text>
    )

  const normalizedTextToHighlight = normalizeString(textToHighlight).toLocaleLowerCase()
  const regex = new RegExp(`(${normalizedTextToHighlight})`, 'gi')
  const parts = children.split(regex)
  const highlightIndex = parts.findIndex((p) => normalizeString(p).toLocaleLowerCase() === normalizedTextToHighlight)
  const ratio = highlightIndex / parts.length
  let ellipsizeMode: TextProps['ellipsizeMode']

  if (ratio > 0.6) {
    ellipsizeMode = 'tail'
  } else if (ratio < 0.4) {
    ellipsizeMode = 'head'
  } else {
    ellipsizeMode = 'middle'
  }

  return (
    <Text style={style} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>
      {parts.map((part, index) =>
        index === highlightIndex ? (
          <Text key={index} style={styles.highlightedText}>
            {part}
          </Text>
        ) : (
          <Text key={`highlighttext-${index}`}>{part}</Text>
        )
      )}
    </Text>
  )
}

export default HighlightText
