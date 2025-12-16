import 'react-native-gesture-handler/jestSetup'
import '@shopify/flash-list/jestSetup'
// import { setUpTests } from 'react-native-reanimated'

// setUpTests()

// jest.mock('react-native-reanimated', () => {
//   const Reanimated = require('react-native-reanimated/mock')

//   Reanimated.default.call = () => {}

//   return Reanimated
// })

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: (obj) => {
    if (!obj) return undefined
    if (Object.prototype.hasOwnProperty.call(obj, 'ios')) return obj.ios
    if (Object.prototype.hasOwnProperty.call(obj, 'android')) return obj.android
    if (Object.prototype.hasOwnProperty.call(obj, 'default')) return obj.default
    return obj
  },
}))

jest.mock('react-native', () => {
  const React = require('react')
  const platformMock = {
    OS: 'ios',
    select: (obj) => {
      if (!obj) return undefined
      if (Object.prototype.hasOwnProperty.call(obj, 'ios')) return obj.ios
      if (Object.prototype.hasOwnProperty.call(obj, 'android')) return obj.android
      if (Object.prototype.hasOwnProperty.call(obj, 'default')) return obj.default
      return obj
    },
  }

  return {
    Platform: platformMock,
    View: React.forwardRef((props, ref) => React.createElement('View', { ...props, ref })),
    Text: React.forwardRef((props, ref) => React.createElement('Text', { ...props, ref })),
    Modal: React.forwardRef((props, ref) => React.createElement('Modal', { ...props, ref })),
    Button: React.forwardRef((props, ref) => React.createElement('Button', { ...props, ref })),
    StyleSheet: {
      create: (styles) => styles,
      flatten: (style) => {
        if (!style) return {}
        if (Array.isArray(style)) {
          return style.reduce((acc, s) => ({ ...acc, ...s }), {})
        }
        return style
      },
    },
    Pressable: React.forwardRef((props, ref) => React.createElement('Pressable', { ...props, ref })),
    TextInput: React.forwardRef((props, ref) => React.createElement('TextInput', { ...props, ref })),
  }
})

jest.mock('react-native-gesture-handler', () => {
  const React = require('react')

  return {
    __esModule: true,
    Pressable: React.forwardRef((props, ref) => React.createElement('Pressable', { ...props, ref })),
    GestureHandlerRootView: React.forwardRef((props, ref) =>
      React.createElement('GestureHandlerRootView', { ...props, ref })
    ),
    TapGestureHandler: React.forwardRef((props, ref) => React.createElement('TapGestureHandler', { ...props, ref })),
    PanGestureHandler: React.forwardRef((props, ref) => React.createElement('PanGestureHandler', { ...props, ref })),
    ScrollView: React.forwardRef((props, ref) => React.createElement('ScrollView', { ...props, ref })),
    FlatList: React.forwardRef((props, ref) => React.createElement('FlatList', { ...props, ref })),
  }
})

jest.mock('@react-navigation/native', () => {
  const React = require('react')

  return {
    NavigationContainer: React.forwardRef((props, ref) =>
      React.createElement('NavigationContainer', { ...props, ref })
    ),
    useNavigation: jest.fn(() => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      dispatch: jest.fn(),
    })),
    useRoute: jest.fn(() => ({
      params: {},
    })),
  }
})

jest.mock('@react-navigation/elements', () => {
  const React = require('react')

  return {
    PlatformPressable: React.forwardRef((props, ref) => React.createElement('PlatformPressable', { ...props, ref })),
  }
})

jest.mock('react-native-reanimated', () => {
  const React = require('react')

  const createAnimatedComponent = (Component) => {
    return React.forwardRef((props, ref) => React.createElement(Component, { ...props, ref }))
  }

  return {
    __esModule: true,
    default: {
      View: React.forwardRef((props, ref) => React.createElement('View', { ...props, ref })),
      Text: React.forwardRef((props, ref) => React.createElement('Text', { ...props, ref })),
    },
    Animated: {
      View: React.forwardRef((props, ref) => React.createElement('View', { ...props, ref })),
      Text: React.forwardRef((props, ref) => React.createElement('Text', { ...props, ref })),
    },
    createAnimatedComponent,
    useAnimatedStyle: jest.fn(() => ({})),
    useSharedValue: jest.fn((initialValue) => ({
      value: initialValue,
    })),
    useAnimatedReaction: jest.fn(),
    useAnimatedScrollHandler: jest.fn(),
    withSpring: jest.fn((targetValue) => targetValue),
    withTiming: jest.fn((targetValue) => targetValue),
    withDecay: jest.fn((targetValue) => targetValue),
    runOnJS: jest.fn((fn) => fn),
    runOnUI: jest.fn((fn) => fn),
    interpolate: jest.fn((value, input, output) => {
      if (input.length === 2 && output.length === 2) {
        const [inMin, inMax] = input
        const [outMin, outMax] = output
        return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin)
      }
      return output[0]
    }),
  }
})

jest.mock('expo-symbols', () => {
  const React = require('react')

  return {
    SymbolView: React.forwardRef((props, ref) => React.createElement('SymbolView', { ...props, ref })),
  }
})

jest.mock('@expo/vector-icons/MaterialIcons', () => {
  const React = require('react')

  return React.forwardRef((props, ref) => React.createElement('MaterialIcons', { ...props, ref }))
})

jest.mock('expo-blur', () => {
  const React = require('react')

  return {
    BlurView: React.forwardRef((props, ref) => React.createElement('BlurView', { ...props, ref })),
  }
})

jest.mock('react-native-safe-area-context', () => {
  const React = require('react')

  return {
    SafeAreaView: React.forwardRef((props, ref) => React.createElement('SafeAreaView', { ...props, ref })),
    useSafeAreaInsets: jest.fn(() => ({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    })),
  }
})

jest.mock('@react-navigation/bottom-tabs', () => {
  const React = require('react')

  return {
    createBottomTabNavigator: jest.fn(() => ({
      Navigator: React.forwardRef((props, ref) => React.createElement('BottomTabNavigator', { ...props, ref })),
      Screen: React.forwardRef((props, ref) => React.createElement('BottomTabScreen', { ...props, ref })),
    })),
    useBottomTabBarHeight: jest.fn(() => 60),
  }
})

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn().mockReturnValue(true),
  isLoading: jest.fn().mockReturnValue(false),
  processFontFamily: jest.fn().mockImplementation((font) => font),
}))

jest.mock('expo-speech-recognition', () => ({
  requestPermissions: jest.fn().mockResolvedValue(true),
  startRecording: jest.fn(),
  stopRecording: jest.fn(),
  isAvailable: true,
}))

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn().mockResolvedValue(null),
  ImpactFeedbackStyle: {
    Light: 'LIGHT',
    Medium: 'MEDIUM',
    Heavy: 'HEAVY',
  },
}))
