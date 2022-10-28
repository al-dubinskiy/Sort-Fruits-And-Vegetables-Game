import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../../../../colors'
import { images } from '../../../../../images'
import { constants } from '../../../../../constants'
import { useSelector } from 'react-redux'

export default function YouWin({resetGame}) {
  const { navigation } = useSelector(state => state.appVars)

  const exit = () => {
    resetGame()
    navigation.pop()
  }

  return (
    <View style={styles.content}>
      <Text style={styles.caption_modal}>You Win</Text>

      <TouchableOpacity style={styles.btn} onPress={() => exit()}>
        <Image resizeMode='stretch' source={images.carrot_btn} style={styles.btn_img}/>
        <Text style={styles.btn_txt}>Exit</Text>
      </TouchableOpacity>
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
    textAlign: 'center',
    marginBottom: 5
  },
  btn: {
    height: constants.wWidth * 0.25,
    width: constants.wWidth * 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn_img: {
    position: 'absolute',
    zIndex: -1,
    height: '100%',
    width: '100%',
  },
  btn_txt: {
    width: '80%',
    fontSize: 30,
    fontFamily: 'Gaegu-Bold',
    color: '#fff',
    textAlign: 'center'
  },
})