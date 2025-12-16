import { View, Text, Modal, StyleSheet, Button, Alert, Linking, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconSymbol } from '@/components/IconSymbol'
import { ACTIVE_COLOR, BACKDROP_COLOR, BACKGROUND_COLOR, TEXT_COLOR } from '@/constants/colors'
// import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition'
import { PermissionStatus } from 'expo-modules-core'
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler'

const styles = StyleSheet.create({
  backdrop: {
    alignItems: 'center',
    backgroundColor: BACKDROP_COLOR,
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: ACTIVE_COLOR,
    borderRadius: 58,
    padding: 16,
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: 8,
    gap: 20,
    justifyContent: 'center',
    paddingVertical: 48,
    width: '95%',
  },
  text: {
    color: TEXT_COLOR,
    fontSize: 18,
    paddingHorizontal: 16,
  },
})

interface SpeechRecognitionModalProps {
  isOpen: boolean
  setIsOpen?: (value: boolean) => void
  onResult?: (value: string) => void
}

const SpeechRecognitionModal = ({ isOpen, setIsOpen, onResult }: SpeechRecognitionModalProps) => {
  const [isRecognizing, setIsRecognizing] = useState(true)
  const [transcript, setTranscript] = useState('')
  // TODO: add animation when speaking and redirect to app settings when refusing permission
  //  useSpeechRecognitionEvent('volumechange', (event) => {
  //    // a value between -2 and 10. <= 0 is inaudible
  //    console.log('Volume changed to:', event.value)
  //  })
  // useSpeechRecognitionEvent('start', () => setIsRecognizing(true))
  // useSpeechRecognitionEvent('end', () => {
  //   setIsRecognizing(false)
  // })
  // useSpeechRecognitionEvent('result', (event) => {
  //   const result = event.results[0]?.transcript.toLowerCase() || ''
  //   if (event.isFinal) {
  //     onResult?.(result)
  //     setIsOpen?.(false)
  //   }
  //   setTranscript(result)
  // })
  // useSpeechRecognitionEvent('error', (event) => {
  //   console.error('speechRecognitionEvent:', event.error, event.message)
  // })
  // // TODO: history fav not working and add throttle to fav/unfav
  // const startSpeechRecognition = () => {
  //   ExpoSpeechRecognitionModule.requestPermissionsAsync()
  //     .then((result) => {
  //       if (result.status === PermissionStatus.DENIED && Platform.OS === 'android') {
  //         setIsRecognizing(false)
  //         Alert.alert('', 'Microphone access need. Go to Android settings, tap permissions, and tap allow', [
  //           { text: 'DiSMISS' },
  //           {
  //             text: 'GO TO SETTINGS',
  //             onPress: () => {
  //               Linking.openSettings().catch((e) => console.error('openSettings', e))
  //             },
  //           },
  //         ])
  //       }
  //       if (result.granted) {
  //         ExpoSpeechRecognitionModule.start({
  //           lang: 'en-US',
  //           interimResults: true,
  //           maxAlternatives: 1,
  //           continuous: false,
  //           requiresOnDeviceRecognition: true,
  //           addsPunctuation: false,
  //           androidIntentOptions: { EXTRA_LANGUAGE_MODEL: 'web_search' },
  //           iosTaskHint: 'confirmation',
  //           iosCategory: {
  //             category: 'record',
  //             categoryOptions: ['allowBluetooth'],
  //             mode: 'voicePrompt',
  //           },
  //           volumeChangeEventOptions: {
  //             enabled: true,
  //             intervalMillis: 300,
  //           },
  //         })
  //       }
  //     })
  //     .catch((e) => console.error('speechRecognitionPermission', e))
  // }

  useEffect(() => {
    // startSpeechRecognition()
    // return () => ExpoSpeechRecognitionModule.abort()
  }, [])

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={isOpen}
      animationType="fade"
      onRequestClose={() => setIsOpen?.(false)}
    >
      <GestureHandlerRootView>
        <View style={styles.backdrop}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {
              setIsOpen?.(false)
            }}
            accessible={false}
          />
          <View style={styles.modalContainer}>
            <Pressable
              style={styles.iconContainer}
              onPress={() => {
                // if (isRecognizing) {
                //   ExpoSpeechRecognitionModule.stop()
                // } else {
                //   startSpeechRecognition()
                // }
              }}
            >
              <IconSymbol name="mic.fill" color={BACKGROUND_COLOR} size={42} />
            </Pressable>
            <Text style={styles.text} numberOfLines={2}>
              {transcript ? `"${transcript}"` : !isRecognizing ? "Didn't catch that" : 'Speak now'}
            </Text>
            {!isRecognizing && !transcript && (
              <Button title="Try again" color={ACTIVE_COLOR} /> //onPress={startSpeechRecognition} />
            )}
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  )
}

export default SpeechRecognitionModal
