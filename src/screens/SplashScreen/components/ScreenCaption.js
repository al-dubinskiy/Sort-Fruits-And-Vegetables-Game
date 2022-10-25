import {Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated'
import { colors } from '../../../colors'
import { images } from '../../../images'
import { constants } from '../../../constants'

const caption_size = {
  wWidth: constants.wWidth,
  wHeight: constants.wHeight * 0.43
}

export const ScreenCaption = () => {
  const marginTop = useSharedValue(-caption_size.wHeight)
  const rotateX = useSharedValue(-5)

  const rCaptionStyle = useAnimatedStyle(() => {
    return {
      marginTop: marginTop.value,
      transform: [
        { rotateX: `${rotateX.value}deg`}
      ]
    }
  }, [])

  const animateCaption = () => {
    marginTop.value = withSpring(0)
    rotateX.value = withRepeat(withTiming(-20, {duration: 2000}), -1, true)
  }

  useEffect(() => {
    animateCaption()
  }, [])

  return (
    <Animated.View style={[styles.container, rCaptionStyle]}>
        <Image resizeMode='contain' source={images.caption_bg} style={styles.caption_bg} />
        <Text style={styles.caption_text}>Sort all{'\n'}vegetables{'\n'}and fruits!</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: caption_size.wWidth,
      height: caption_size.wHeight,
      justifyContent: 'center',
      alignItems: 'center',
      transform: [
        { rotateX: '10deg'},
      ],
    },
    caption_text: {
      fontSize: 50,
      fontFamily: 'Gaegu-Bold',
      color: colors.white,
      textAlign: 'center',
      paddingTop: caption_size.wHeight * 0.15
    },
    caption_bg: {
      position: 'absolute',
      zIndex: 0,
      width: '95%', 
      height: '100%',
      left: '2.5%',
    }
})