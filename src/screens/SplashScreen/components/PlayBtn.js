import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import { colors } from '../../../colors'
import { constants } from '../../../constants'
import { images } from '../../../images'

const playBtnSize = {
  width: constants.wWidth * 0.40,
  height: constants.wWidth * 0.25,
}

export const PlayBtn = ({goToGameScreen}) => {
  const scale = useSharedValue(1)

  const rPlayBtnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value }
      ]
    }
  }, [])

  const animatePlayBtn = () => {
    scale.value = withRepeat(withSpring(0.95), -1, true)
  }

  useEffect(() => {
    animatePlayBtn()
  }, [])

  return (
    <Animated.View style={[styles.container, rPlayBtnStyle]}>
      <TouchableOpacity style={[styles.start_play_btn]} activeOpacity={0.7} onPress={() => goToGameScreen()}>
        <Image resizeMode='stretch' source={images.pineapple_btn} style={styles.start_play_btn_bg} />
        <Text style={styles.start_play_btn_text}>Let's{'\n'}Go!</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: playBtnSize.width,
      height: playBtnSize.height,
      position: 'absolute',
      bottom: constants.wHeight * 0.05,
      zIndex: 3,
    },
    start_play_btn_bg: {
      position: 'absolute',
      zIndex: -1,
      width: playBtnSize.width * 0.7,
      height: playBtnSize.height * 2.3,
      transform: [
        { rotate: '70deg' },
        { translateY: -constants.wWidth * 0.13 },
        { translateX: -constants.wWidth * 0.02 }
      ]
    },
    start_play_btn: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    start_play_btn_text: {
      textAlign: 'center',
      fontSize: 27,
      fontFamily: 'Kalam-Bold',
      color: colors.white,
      lineHeight: 35,
    }
})