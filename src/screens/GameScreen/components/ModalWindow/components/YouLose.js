import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../../../../colors'
import { images } from '../../../../../images'
import { constants } from '../../../../../constants'

export default function YouLose() {

  return (
    <View style={styles.content}>
      <Text style={styles.caption_modal}>You Lose</Text>

      <TouchableOpacity style={styles.result_row}>
        <Image resizeMode='contain' source={images.basket_with_fruits_full} style={styles.basket_image}/>
        <Text style={styles.caption}>Try Again</Text>
      </TouchableOpacity>

      <View style={styles.reason_row}>
        <Image resizeMode='contain' source={images.basket_with_vegetables_full} style={styles.reason_image}/>
        <Text style={styles.reason_text}>...</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
  },
  caption_modal: {
    fontSize: 35,
    fontFamily: 'Kalam-Bold',
    color: colors.white,
    textAlign: 'center'
  },
  reason_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  reason_image: {
    height: constants.wWidth * 0.13,
    width: constants.wWidth * 0.13,
  },
  reason_text: {
    fontSize: 30,
    fontFamily: 'Gaegu-Bold',
    color: '#fff',
    marginLeft: 10
  },
})