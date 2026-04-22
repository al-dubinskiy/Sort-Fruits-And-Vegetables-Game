import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScoresHeader from './components/ScoresHeader/ScoresHeader'
import RenderElement from './components/RenderElement/RenderElement'
import { images } from '../../images'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import ModalWindow from './components/ModalWindow/ModalWindow'
import PickingBaskets from './components/PickingBaskets/PickingBaskets'
import { elements } from '../../elementsData'
import { types } from '../../types'

export default function GameScreen() {
  const [isRemoveHeart, setIsRemoveHeart] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)

  const opacity = useSharedValue(0)

  const screenStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value 
    }
  }, [])

  useEffect(() => {
    opacity.value = withTiming(1, {duration: 1500})
  }, [])

  return (
    <Animated.View style={[styles.container, screenStyle]}>
        <Image resizeMode='cover' source={images.wooden_plank_bg} style={styles.bg_image}/>
        <ScoresHeader isRemoveHeart={isRemoveHeart} setIsRemoveHeart={setIsRemoveHeart} />
        <PickingBaskets />
        <RenderElement />
        <ModalWindow isShowModal={isShowModal} setIsShowModal={setIsShowModal} />

        <TouchableOpacity style={{position: 'absolute', zIndex: 10, bottom: 30, backgroundColor: 'yellow'}} onPress={() => setIsRemoveHeart(true)}>
          <Text>Remove heart</Text> 
        </TouchableOpacity>
        <TouchableOpacity style={{marginBottom: 100, position: 'absolute', zIndex: 10, bottom: 30, backgroundColor: 'yellow'}} onPress={() => setIsShowModal(!isShowModal)}>
          <Text>Modal</Text> 
        </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bg_image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 0
    },
})