import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../../../colors'
import { images } from '../../../../../images'
import { constants } from '../../../../../constants'

export default function GameResult() {
  return (
      <View style={styles.content}>
        <Text style={styles.caption_modal}>Game result</Text>

        <View style={styles.result_row}>
          <Image resizeMode='contain' source={images.basket_with_fruits_full} style={styles.basket_image}/>
          <View style={styles.caption_wrapper}>
            <Text style={styles.count}>25</Text>
            <Text style={styles.caption}>fruits</Text>
          </View>
        </View>

        <View style={styles.result_row}>
          <Image resizeMode='contain' source={images.basket_with_vegetables_full} style={styles.basket_image}/>
          <View style={styles.caption_wrapper}>
            <Text style={styles.count}>30</Text>
            <Text style={styles.caption}>vegetables</Text>
          </View>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between'
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