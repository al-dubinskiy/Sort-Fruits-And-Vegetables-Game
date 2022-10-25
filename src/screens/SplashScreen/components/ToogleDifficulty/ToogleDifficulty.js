import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated'
import { images } from '../../../../images'
import { colors } from '../../../../colors'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import { constants } from '../../../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { setGameDifficultyLevel } from '../../../../redux/slices/gameConfigure'

const toggleContainer = {
  width: (constants.wWidth * 0.12) * 3,
  height: constants.wWidth * 0.12,
}

const moveElementSize = {
  width: toggleContainer.height,
  height: toggleContainer.height,
}

const toggleFieldCoord = {
  x1: (constants.wWidth - toggleContainer.width) / 2,
  x2: toggleContainer.width + moveElementSize.width,
}

const toggleBtnsRange = {
  1: {
    x1: toggleFieldCoord.x1,
    x2: toggleFieldCoord.x1 + moveElementSize.width,
  },
  2: {
    x1: toggleFieldCoord.x1 + moveElementSize.width,
    x2: toggleFieldCoord.x1 + (moveElementSize.width * 2),
  },
  3: {
    x1: toggleFieldCoord.x1 + (moveElementSize.width * 2),
    x2: toggleFieldCoord.x2,
  }
}

export const ToogleDifficulty = () => {
    const toogleBtnsBgColors = [colors.lightGreen, colors.lightOrange, colors.lightRed]
    const opacity = useSharedValue(1)
    const translateX = useSharedValue(0)
    const backgroundColor = useSharedValue(toogleBtnsBgColors[0])

    const gameDifficultyLevel = useSelector(state => state.gameConfigure.gameDifficultyLevel)
    const dispatch = useDispatch()

    const rMovingBlockStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            backgroundColor: backgroundColor.value,
            transform: [
              { translateX: translateX.value }
            ]
        }
    }, [])

    const updateDispatch = useCallback((level) => {
      dispatch(setGameDifficultyLevel(level))
    }, [])

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
          context.translateX = translateX.value
        },
        onActive: (event, context) => {
          let absoluteX_left = event.absoluteX - (constants.wWidth * 0.13 / 2)
          let absoluteX_right = event.absoluteX + (constants.wWidth * 0.13 / 2)

          // console.log(toggleFieldCoord)
          // console.log(event)
          // console.log(absoluteX_left)
          // console.log(absoluteX_right)

          if (absoluteX_left > toggleFieldCoord.x1 && absoluteX_right < toggleFieldCoord.x2)
            translateX.value = event.translationX + context.translateX
        },
        onEnd: (event, context) => {
          let mElementRightSide = event.absoluteX 

          if (mElementRightSide > toggleBtnsRange[3].x1) // 3 button
          {
            translateX.value = withSpring(moveElementSize.width * 2)
            runOnJS(updateDispatch)(3)
          }
          else if (mElementRightSide > toggleBtnsRange[2].x1) // 2 button
          {
            translateX.value = withSpring(moveElementSize.width)
            runOnJS(updateDispatch)(2)
          }
          else if (mElementRightSide > toggleBtnsRange[1].x1) { // 1 button
            translateX.value = withSpring(0)
            runOnJS(updateDispatch)(1)
          }
        },
    })

    useEffect(() => {
        
    }, [])

  return (
    <GestureHandlerRootView style={[styles.container]}>
       <Image resizeMode='stretch' source={images.wooden_plank_with_lives_bg} style={styles.container_bg} />
       <Text style={[styles.caption_text, { color: colors.white }]}>Difficulty level</Text>
        <View style={styles.toggle_container}>
          <View style={styles.btns}>
              <Text style={[styles.btn_text, { color: colors.lightRed }]}>1</Text>
          </View>
          <View style={styles.btns}>
              <Text style={[styles.btn_text, { color: colors.lightOrange }]}>2</Text>
          </View>
          <View style={styles.btns}>
              <Text style={[styles.btn_text, { color: colors.lightRed }]}>3</Text>
          </View>

          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={[styles.moving_block, rMovingBlockStyle]}>
              
              <TouchableOpacity>
                <Text style={styles.cur_btn_text}>{ gameDifficultyLevel }</Text>
              </TouchableOpacity> 
            </Animated.View>
          </PanGestureHandler>
        </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
    container: {
      width: constants.wWidth * 0.7,
      height: constants.wWidth * 0.40,
      position: 'absolute',
      left: (constants.wWidth * 0.3) / 2,
      bottom: constants.wHeight * 0.3,
      zIndex: 3,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: '5%',
    },
    container_bg: {
      position: 'absolute',
      zIndex: -1,
      width: '100%',
      height: '100%',
    },  
    toggle_container: {
      width: toggleContainer.width,
      height: toggleContainer.height,
      backgroundColor: colors.white,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    caption_text: {
      position: 'absolute',
      zIndex: 3,
      top: '45%',
      fontFamily: 'Gaegu-Bold',
      fontSize: 25,
      color: colors.white
    },
    moving_block: {
      position: 'absolute',
      zIndex: 5,
      width: moveElementSize.width,
      height: moveElementSize.height,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },  
    cur_btn_text: {
      fontFamily: 'Gaegu-Bold',
      fontSize: 25,
      color: colors.white
    },
    btns: {
      height: '100%',
      width: '33.3%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    btn_text: {
      fontFamily: 'Gaegu-Bold',
      fontSize: 25,
    }
})