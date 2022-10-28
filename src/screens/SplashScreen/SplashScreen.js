import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { ScreenCaption } from './components/ScreenCaption'
import { PlayBtn } from './components/PlayBtn'
import { ToogleDifficulty } from './components/ToogleDifficulty/ToogleDifficulty'

export default function SplashScreen({navigation}) {

  const goToGameScreen = () => {
    navigation.navigate('GameScreen')
  }

  return (
    <View style={[styles.container]}>
      <Image source={require('../../assets/images/veg_fruits_bg.png')} style={styles.bg_image}/>
      <View style={styles.content}>
        <ScreenCaption />
        <ToogleDifficulty />
        <PlayBtn goToGameScreen={goToGameScreen}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bg_image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 0
    },
    content: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        zIndex: 2,
    },
})