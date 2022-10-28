import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import ScoresHeader from './components/ScoresHeader/ScoresHeader'
import RenderElement from './components/RenderElement/RenderElement'
import { images } from '../../images'
import ModalWindow from './components/ModalWindow/ModalWindow'
import PickingBaskets from './components/PickingBaskets/PickingBaskets'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setNavigation } from '../../redux/slices/appVars'

export default function GameScreen({navigation}) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setNavigation(navigation))
  }, [])

  return (
    <View style={styles.container}>
        <Image resizeMode='cover' source={images.wooden_plank_bg} style={styles.bg_image}/>
        <ScoresHeader />
        <PickingBaskets />
        <RenderElement />
        <ModalWindow />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bg_image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 0
    },
})