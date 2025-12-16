import { View, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { ACTIVE_COLOR, TAB_BAR_BACKGROUND_COLOR, TEXT_COLOR } from '@/constants/colors'
import { IconSymbol } from '@/components/IconSymbol'
import SpeechRecognitionModal from '@/components/SpeechRecognitionModal'

export interface SearchInputRef {
  focus: () => void
}

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
    width: 48,
  },
  container: {
    alignItems: 'center',
    backgroundColor: TAB_BAR_BACKGROUND_COLOR,
    borderColor: ACTIVE_COLOR,
    borderRadius: 14,
    borderWidth: 2,
    flex: 1,
    flexDirection: 'row',
    marginVertical: 8,
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
    color: TEXT_COLOR,
    flex: 1,
    height: 48,
  },
  inputCleared: {
    paddingHorizontal: 8,
  },
  inputDirty: {
    paddingLeft: 8,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
})

const SearchInput = forwardRef<SearchInputRef, SearchInputProps>(
  ({ onSubmitEditing, onFocus, onBlur, searchQuery, setSearchQuery }, ref) => {
    const inputRef = useRef<TextInput>(null)
    const isSearchQueryCleared = !searchQuery?.trim()
    const [isOpen, setIsOpen] = useState(false)

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
    }))

    return (
      <View style={styles.row}>
        <View style={styles.container}>
          <TextInput
            testID="search-input"
            ref={inputRef}
            value={searchQuery}
            onFocus={onFocus}
            onBlur={onBlur}
            onSubmitEditing={(e) => {
              onSubmitEditing?.(e?.nativeEvent?.text)
            }}
            submitBehavior="blurAndSubmit"
            onChangeText={setSearchQuery}
            placeholder={'Try typing "Irish"'}
            placeholderTextColor={ACTIVE_COLOR}
            cursorColor={TEXT_COLOR}
            style={[styles.input, isSearchQueryCleared ? styles.inputCleared : styles.inputDirty]}
            enterKeyHint="search"
            inputMode="search"
            returnKeyType="search"
            maxLength={256}
            autoCapitalize="none"
            autoFocus
            enablesReturnKeyAutomatically
          />
          {!isSearchQueryCleared && (
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
        {isSearchQueryCleared && (
          <Pressable style={styles.iconContainer} onPress={() => setIsOpen(true)}>
            <IconSymbol name="mic" color={TEXT_COLOR} />
          </Pressable>
        )}
        {isOpen && (
          <SpeechRecognitionModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onResult={(value) => {
              setSearchQuery?.(value)
              onSubmitEditing?.(value)
            }}
          />
        )}
      </View>
    )
  }
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
