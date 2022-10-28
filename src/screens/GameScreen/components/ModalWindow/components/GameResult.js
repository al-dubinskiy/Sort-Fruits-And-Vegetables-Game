import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../../../colors'
import { images } from '../../../../../images'
import { constants } from '../../../../../constants'
import { useSelector } from 'react-redux'
import TryAgainBtn from './TryAgainBtn'

export default function GameResult({resetGame}) {
  const {fruits, vegetables} = useSelector(state => state.movingElements)
  if (!fruits || !vegetables) return null

  return (
      <View style={styles.content}>
        <Text style={styles.caption_modal}>Game result</Text>

        <View style={styles.result_row}>
          <Image resizeMode='contain' source={images.basket_with_fruits_full} style={styles.basket_image}/>
          <View style={styles.caption_wrapper}>
            <Text style={styles.count}>{fruits.length}</Text>
            <Text style={styles.caption}>fruits</Text>
          </View>
        </View>

        <View style={styles.result_row}>
          <Image resizeMode='contain' source={images.basket_with_vegetables_full} style={styles.basket_image}/>
          <View style={styles.caption_wrapper}>
            <Text style={styles.count}>{vegetables.length}</Text>
            <Text style={styles.caption}>vegetables</Text>
          </View>
        </View>

        <TryAgainBtn resetGame={resetGame} />
      </View>
  )
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption_modal: {
    fontSize: 35,
    fontFamily: 'Kalam-Bold',
    color: colors.white,
    textAlign: 'center'
  },
  result_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  basket_image: {
    height: constants.wWidth * 0.12,
    width: constants.wWidth * 0.12,
  },
  caption_wrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  count: {
    marginLeft: 15,
    fontSize: 35,
    fontFamily: 'Gaegu-Bold',
    color: '#fff'
  },
  caption: {
    fontSize: 30,
    fontFamily: 'Gaegu-Bold',
    color: '#fff',
    marginLeft: 10
  },
})