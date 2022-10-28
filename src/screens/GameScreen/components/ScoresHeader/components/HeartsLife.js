import { Image, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { images } from '../../../../../images'
import { useDispatch, useSelector } from 'react-redux'
import { takeOffHeart } from '../../../../../redux/slices/movingElements'
import { typesGameEndReason } from '../../../../../types'
import { setGameEndState } from '../../../../../redux/slices/gameConfigure'

export default function HeartsLife() {
  const { visibleCount, data, isRemoveHeart } = useSelector(state => state.movingElements.heartsLife)
  if (!data ) return null

  const dispatch = useDispatch()
  
  const removeHeart = () => {
    dispatch(takeOffHeart())
  }

  useEffect(() => {
    if (isRemoveHeart) removeHeart()
  }, [isRemoveHeart])

  useEffect(() => {
    if (visibleCount == 0) 
      dispatch(setGameEndState({
        value: true,
        reason: typesGameEndReason.youLose
      }))
  }, [visibleCount])
  
  return (
    <View style={styles.hearts_life}>
        { 
          data.map((heart, index) => {
              return (
              <View style={[styles.heart, { opacity: heart.isVisible ? 1 : 0}]} key={index}>
                  <Image resizeMode='contain' source={images.heart_life} style={styles.heart_img}/> 
              </View>
              )
          })
        }
    </View>
  )
}

const styles = StyleSheet.create({
    hearts_life: {
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