import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../../../colors'
import TryAgainBtn from './TryAgainBtn'

export default function YouLose({resetGame}) {
  
  return (
    <View style={styles.content}>
      <Text style={styles.caption_modal}>You Lose</Text>

      <TryAgainBtn resetGame={resetGame} />
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  caption_modal: {
    fontSize: 35,
    fontFamily: 'Kalam-Bold',
    color: colors.white,
    textAlign: 'center'
  },
})