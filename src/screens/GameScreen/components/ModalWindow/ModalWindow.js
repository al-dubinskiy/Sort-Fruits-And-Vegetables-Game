import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { color, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated'
import { constants } from '../../../../constants'
import { images } from '../../../../images'
import { colors } from '../../../../colors'
import GameResult from './components/GameResult'
import YouLose from './components/YouLose'

export default function ModalWindow({isShowModal, setIsShowModal}) {
  const marginTop = useSharedValue(-100)
  const scale = useSharedValue(1)

  const rModalStyle = useAnimatedStyle(() => {
    return {
      marginTop: marginTop.value + '%',
      transform: [
        { scale: scale.value }
      ]
    }
  })

  const showModal = () => {
    scale.value = withRepeat(withTiming(1.01, {duration: 700}), -1, true)
    marginTop.value = withSpring(50)
  }
  
  const hideModal = () => {
    scale.value = 1
    marginTop.value = withSpring(-100)
  }

  useEffect(() => {
    if (isShowModal) showModal() 
    else hideModal() 
  }, [isShowModal])

  return (
    <Animated.View style={[styles.game_result_modal, rModalStyle]}>
       <Image resizeMode='contain' source={images.wooden_plank_texture_modal} style={styles.bg_image}/>
       <View style={styles.content}>
          {
            true 
            ? <GameResult /> 
            : <YouLose />
          }
       </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  game_result_modal: {
    position: 'absolute',
    zIndex: 10,
    width: '100%', 
    height: constants.wHeight * 0.4,
    alignItems: 'center',
  },
  bg_image: { 
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%'
  },
  content: {
    width: '80%',
    height: '65%',
    marginTop: '3%',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
})