import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { ScreenCaption } from './components/ScreenCaption'
import { PlayBtn } from './components/PlayBtn'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

export default function SplashScreen({navigation}) {
  const opacity = useSharedValue(1)

  const screenStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value 
    }
  }, [])
  
  const hideScreenAnimate = () => {
    opacity.value = withTiming(0, {duration: 1000})
  }

  const goToGameScreen = () => {
    hideScreenAnimate()

    setTimeout(() => {
      navigation.navigate('GameScreen')
    }, 1700)
  }

  return (
    <Animated.View style={[styles.container, screenStyle]}>
      <Image source={require('../../assets/images/veg_fruits_bg.png')} style={styles.bg_image}/>
      <View style={styles.content}>
        <ScreenCaption />
        <PlayBtn goToGameScreen={goToGameScreen}/>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bg_image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 0
    },
    content: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        zIndex: 2,
    },
})