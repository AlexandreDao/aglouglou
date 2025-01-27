import { View, TextInput, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { ACTIVE_COLOR, TAB_BAR_BACKGROUND_COLOR, TEXT_COLOR } from '@/constants/colors'
import { IconSymbol } from '@/components/ui/IconSymbol'

interface SearchInputProps {
  onSubmitEditing?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  searchQuery?: string
  setSearchQuery?: (value: string) => void
}

const styles = StyleSheet.create({
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
  return (
    <View style={styles.container}>
      <TextInput
        value={searchQuery}
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmitEditing={(e) => onSubmitEditing?.(e.nativeEvent.text)}
        onChangeText={setSearchQuery}
        placeholder="Search"
        placeholderTextColor={ACTIVE_COLOR}
        cursorColor={TEXT_COLOR}
        style={styles.input}
        enterKeyHint="search"
        inputMode="search"
        maxLength={124}
        returnKeyType="search"
        //selectTextOnFocus
        autoFocus
        clearButtonMode="unless-editing"
      />
      {!searchQuery?.trim() && (
        <Pressable style={styles.iconContainer}>
          <IconSymbol name="mic" color={TEXT_COLOR} />
        </Pressable>
      )}
    </View>
  )
}

export default SearchInput
