import { Image, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated'
import { constants } from '../../../../constants'
import { images } from '../../../../images'
import GameResult from './components/GameResult'
import YouLose from './components/YouLose'
import { useDispatch, useSelector } from 'react-redux'
import YouWin from './components/YouWin'
import { typesGameEndReason } from '../../../../types'
import { resetGameConfigureState } from '../../../../redux/slices/gameConfigure'
import { resetCollectedElements, resetHeartsLife, resetElements } from '../../../../redux/slices/movingElements'

export default function ModalWindow() {
  const dispatch = useDispatch()
  /* For reset game configure */
  const { countDownTime } = useSelector(state => state.gameConfigure.gameDifficultyLevel)
  if (!countDownTime) return null

  const resetGame = () => {
    dispatch(resetGameConfigureState()) // reset game end reason
    dispatch(resetHeartsLife()) // reset hearts life state
    dispatch(resetCollectedElements()) // reset collected fruits and vegetables
    dispatch(resetElements()) // reset initial list of elements
  }
  /* --- */

  const {gameEndState} = useSelector(state => state.gameConfigure)
  const [typeModal, setTypeModal] = useState(null)

  const marginTop = useSharedValue(-120)
  const scale = useSharedValue(1)

  const rModalStyle = useAnimatedStyle(() => {
    return {
      marginTop: marginTop.value + '%',
      transform: [
        { scale: scale.value }
      ]
    }
  })

  const showModal = (type) => {
    scale.value = withRepeat(withTiming(1.01, {duration: 700}), -1, true)
    marginTop.value = withSpring(50)
    setTypeModal(type)
  }
  
  const hideModal = () => {
    scale.value = 1
    marginTop.value = withSpring(-120)
  }

  useEffect(() => {
    if (gameEndState.value) showModal(gameEndState.reason)
    else hideModal()
  }, [gameEndState.value])

  if (!gameEndState) return null

  return (
    <Animated.View style={[styles.game_result_modal, rModalStyle]}>
       <Image resizeMode='stretch' source={images.wooden_plank_texture_modal} style={styles.bg_image}/>
       <View style={styles.content}>
          {
            typeModal == typesGameEndReason.timeIsUp 
            ? <GameResult resetGame={resetGame}/> 
            : typeModal == typesGameEndReason.youLose
            ? <YouLose resetGame={resetGame}/>
            : typeModal == typesGameEndReason.youWin
            ? <YouWin resetGame={resetGame}/>
            : null
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
    height: constants.wHeight * 0.55,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  bg_image: { 
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%'
  },
  content: {
    marginTop: '5%',
    width: '80%',
    height: '75%',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
})