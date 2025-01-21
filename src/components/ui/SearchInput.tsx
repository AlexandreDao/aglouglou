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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: ACTIVE_COLOR,
    color: TEXT_COLOR,
    backgroundColor: TAB_BAR_BACKGROUND_COLOR,
    marginVertical: 8,
    height: 48,
    paddingHorizontal: 8,
    borderRadius: 14,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: ACTIVE_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
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
