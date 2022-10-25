import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming  } from 'react-native-reanimated'
import { colors } from '../../../colors'
import { constants } from '../../../constants'
import { images } from '../../../images'

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
      width: constants.wWidth * 0.45,
      height: constants.wWidth * 0.25,
      position: 'absolute',
      bottom: constants.wHeight * 0.12,
      zIndex: 3,
    },
    start_play_btn_bg: {
      width: constants.wWidth * 0.33,
      height: constants.wWidth * 0.63,
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
      position: 'absolute',
      zIndex: 3,
      fontSize: 27,
      fontFamily: 'Kalam-Bold',
      color: colors.white,
      lineHeight: 35,
    }
})