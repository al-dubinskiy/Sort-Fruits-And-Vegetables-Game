import { Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { types, typesGameEndReason } from '../../../../types'
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import { constants } from '../../../../constants'
import { basketDots, basketFieldSize } from '../PickingBaskets/PickingBaskets'
import { useDispatch, useSelector } from 'react-redux'
import { setIsHighlightBasket, setIsRemoveHeart, updateFruits, updateVegetables } from '../../../../redux/slices/movingElements'
import { setGameEndState } from '../../../../redux/slices/gameConfigure'

const ELEMENT_SIZE = {
    width: constants.wWidth * 0.2,
    height: constants.wWidth * 0.2,
}

export default function RanderElement() {
    const elements = useSelector(state => state.movingElements.elements)
    const [curElement, setCurElement] = useState(null)

    const opacity = useSharedValue(1)
    const scale = useSharedValue(1)
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)

    const dispatch = useDispatch()

    const addElementInBasket = ({basketType}) => {
        opacity.value = withSpring(0)
        if (basketType == curElement.data.type) { // if element type == basket for this type
            if (curElement.data.type == types.fruit) {
                dispatch(updateFruits(curElement))
            }
            else if (curElement.data.type == types.vegetable) {
                dispatch(updateVegetables(curElement))
            }
        }
        else { // highlight of basket if getted error
            if (curElement.data.type == types.fruit)
                dispatch(setIsHighlightBasket({right: true}))
            else if (curElement.data.type == types.vegetable)
                dispatch(setIsHighlightBasket({left: true}))

            setTimeout(() => {
                dispatch(setIsHighlightBasket({left: false, right: false}))
                dispatch(setIsRemoveHeart(true))
            }, 1000)
            randomElement()
        }
    }

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value
            context.translateY = translateY.value
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX
            translateY.value = event.translationY + context.translateY
        },
        onEnd: (event) => {
            let absoluteY = event.absoluteY - ELEMENT_SIZE.height / 2
            let absoluteX = event.absoluteX - ELEMENT_SIZE.width / 2
            if (absoluteY > basketDots.y1 && absoluteY< basketDots.y2) {
                if (absoluteX > basketDots.leftBasket.x1 && absoluteX < basketDots.leftBasket.x2) // left basket
                {
                    translateX.value = withSpring((
                        ((basketDots.leftBasket.x2 - basketDots.leftBasket.x1) / 2)
                        - (basketFieldSize.width / 2)
                    ))
                    translateY.value = withSpring((
                        ((basketDots.y2 - basketDots.y1) / 2)
                        - (constants.wHeight / 2)
                        - (basketFieldSize.height / 2)
                    ))

                    runOnJS(addElementInBasket)({ basketType: types.fruit })
                }
                if (absoluteX > basketDots.rightBasket.x1 && absoluteX < basketDots.rightBasket.x2) // right basket
                {
                    translateX.value = withSpring(((
                        basketFieldSize.width / 2)
                        - ((basketDots.rightBasket.x2 - basketDots.rightBasket.x1) / 2)
                    ))
                    translateY.value = withSpring((
                        ((basketDots.y2 - basketDots.y1) / 2)
                        - (constants.wHeight / 2)
                        - (basketFieldSize.height / 2)
                    ))

                    runOnJS(addElementInBasket)({ basketType: types.vegetable })
                }
            }
        },
    })

    const animateElementDefault = () => {
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
        opacity.value = withSpring(1)
    }
    
    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale: scale.value },
               
            ],
            opacity: opacity.value 
        }
    })

    const randomElement = () => {
        animateElementDefault()
        let rIndex = Math.floor(Math.random() * ((elements.length - 1) - 0) + 0);
        let cur_element = { index: rIndex, data: elements[rIndex] }
        setCurElement(cur_element)
    }

    useEffect(() => {
        scale.value = withRepeat(withSpring(1.1), -1, true)
    }, [])

    useEffect(() => {
        if (elements.length) randomElement()
        else {
            dispatch(setGameEndState({
                value: true,
                reason: typesGameEndReason.youWin
            }))
        } 
    }, [elements])

    if (!curElement) return null
    return (
        <GestureHandlerRootView style={styles.container}>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={[styles.element, rStyle]}>
                    <Image resizeMode='contain' source={curElement.data.img_link} style={styles.elementImg}/>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        position: 'absolute', 
        width: basketFieldSize.width, 
        height: '100%', 
        left: (constants.wWidth - basketFieldSize.width) / 2, 
        alignItems: 'center',
        zIndex: 3,
    },
    element: { 
        position: 'absolute',
        zIndex: 3,
        width: ELEMENT_SIZE.width,
        height: ELEMENT_SIZE.height,
        bottom: 50,
    },
    elementImg: {
        width: '100%',
        height: '100%',
    },
})