import { StyleSheet, View } from 'react-native'
import React from 'react'
import { constants } from '../../../../constants'
import { CountDownTimer } from './components/CountDownTimer'
import HeartsLife from './components/HeartsLife'

export default function ScoresHeader({isRemoveHeart, setIsRemoveHeart}) {
  return (
    <View style={styles.container}>
        <CountDownTimer initialTime={{min: 7, sec: 0}} />
        <HeartsLife isRemoveHeart={isRemoveHeart} setIsRemoveHeart={setIsRemoveHeart}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      height: constants.wHeight * 0.1,
      width: constants.wWidth,
      position: 'absolute',
      zIndex: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
      paddingHorizontal: 15
    },
})