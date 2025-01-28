import { View, TextInput, Pressable, StyleSheet, InteractionManager, Keyboard } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { ACTIVE_COLOR, TAB_BAR_BACKGROUND_COLOR, TEXT_COLOR } from '@/constants/colors'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useFocusEffect } from 'expo-router'

interface SearchInputProps {
  onSubmitEditing?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  searchQuery?: string
  setSearchQuery?: (value: string) => void
}

const styles = StyleSheet.create({
  clearBtnContainer: {
    alignItems: 'center',
    borderRadius: 14,
    height: 48,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    width: 48,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  iconContainer: {
    alignItems: 'center',
    borderColor: ACTIVE_COLOR,
    borderRadius: 24,
    borderWidth: 2,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  input: {
    backgroundColor: TAB_BAR_BACKGROUND_COLOR,
    borderColor: ACTIVE_COLOR,
    borderRadius: 14,
    borderWidth: 2,
    color: TEXT_COLOR,
    flex: 1,
    height: 48,
    marginVertical: 8,
    paddingHorizontal: 8,
  },
})

function SearchInput({ onSubmitEditing, onFocus, onBlur, searchQuery, setSearchQuery }: SearchInputProps) {
  const inputRef = useRef<TextInput>(null)

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
      return () => clearTimeout(timer)
    }, [])
  )

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        value={searchQuery}
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmitEditing={(e) => {
          onSubmitEditing?.(e.nativeEvent.text)
        }}
        submitBehavior="blurAndSubmit"
        onChangeText={setSearchQuery}
        placeholder="Search"
        placeholderTextColor={ACTIVE_COLOR}
        cursorColor={TEXT_COLOR}
        style={styles.input}
        enterKeyHint="search"
        inputMode="search"
        maxLength={256}
        returnKeyType="search"
        selectTextOnFocus
      />
      {!searchQuery?.trim() ? (
        <Pressable style={styles.iconContainer}>
          <IconSymbol name="mic" color={TEXT_COLOR} />
        </Pressable>
      ) : (
        <Pressable
          style={styles.clearBtnContainer}
          onPress={() => {
            if (inputRef.current) {
              setSearchQuery?.('')
              inputRef.current.clear()
            }
          }}
        >
          <IconSymbol name="xmark.circle.fill" color={TEXT_COLOR} />
        </Pressable>
      )}
    </View>
  )
}

export default SearchInput
