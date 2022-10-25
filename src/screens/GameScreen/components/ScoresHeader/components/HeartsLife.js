import { Image, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../../../../images'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

export default function HeartsLife({isRemoveHeart, setIsRemoveHeart}) {
  const [hearts, setHearts] = useState({
    visibleCount: 3,
    data: [
      { id: 1, scale: useSharedValue(1) },
      { id: 2, scale: useSharedValue(1) },
      { id: 3, scale: useSharedValue(1) },
    ]
  })

  const rHeartStyle = hearts.data.map((heart) => {
    return useAnimatedStyle(() => {
      return {
        transform: [
          { scale: heart.scale.value },
        ]
      }
    })
  })
  
  const removeHeartAnimate = () => {
    hearts.data[hearts.visibleCount - 1].scale.value = withSpring(0)

    setTimeout(() => {
      setHearts({...hearts, visibleCount: --hearts.visibleCount})
      setIsRemoveHeart(false)
    }, 1700)
  }

  useEffect(() => {
    if (isRemoveHeart) removeHeartAnimate()
  }, [isRemoveHeart])

  if (!rHeartStyle) return null
  
  return (
    <View style={styles.hearts_life}>
        { 
            hearts.data.map((_, index) => {
                return (
                <Animated.View style={[styles.heart, rHeartStyle[index]]} key={index}>
                    <Image resizeMode='contain' source={images.heart_life} style={styles.heart_img}/> 
                </Animated.View>
                )
            })
        }
    </View>
  )
}

const styles = StyleSheet.create({
    hearts_life: {
      width: '33%',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    heart: {
      width: 35,
      height: 35,
    },
    heart_img: {
      width: '100%',
      height: '100%',
    }
})