import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { constants } from '../../../../constants'
import { CountDownTimer } from './components/CountDownTimer'
import HeartsLife from './components/HeartsLife'
import { images } from '../../../../images'
import { GameDifficultyLevel } from './components/GameDifficultyLevel'

export default function ScoresHeader() {

  return (
    <View style={styles.container}>
        <Image resizeMode='stretch' source={images.game_header_bg} style={styles.bg_image}/>
        <View style={styles.content}>
          <CountDownTimer />
          <GameDifficultyLevel />
          <HeartsLife />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      height: constants.wHeight * 0.1,
      width: constants.wWidth,
      position: 'absolute',
      zIndex: 2,
      justifyContent: 'center',
      alignItems: 'center'
    },
    bg_image: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: -1
    },
    content: {
      width: '90%',
      height: '70%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }
})