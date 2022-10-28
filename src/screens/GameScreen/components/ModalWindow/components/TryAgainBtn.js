import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../../../../colors'
import { images } from '../../../../../images'
import { constants } from '../../../../../constants'

export default function TryAgainBtn({resetGame}) {
  
  return (
    <TouchableOpacity style={styles.btn} onPress={() => resetGame()}>
        <Image resizeMode='stretch' source={images.cucumber_btn} style={styles.btn_img}/>
        <Text style={styles.btn_txt}>Try again</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    height: constants.wWidth * 0.15,
    width: constants.wWidth * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  btn_img: {
    position: 'absolute',
    zIndex: -1,
    height: '100%',
    width: '100%',
  },
  btn_txt: {
    width: '80%',
    fontSize: 25,
    fontFamily: 'Gaegu-Bold',
    color: colors.white,
    textAlign: 'center'
  },
})