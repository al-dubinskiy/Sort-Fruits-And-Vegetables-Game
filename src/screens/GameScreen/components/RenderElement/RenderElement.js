import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { elements } from '../../../../elementsData'
import { types } from '../../../../types'
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import { constants } from '../../../../constants'
import { basketDots, basketFieldSize } from '../PickingBaskets/PickingBaskets'
import { useDispatch, useSelector } from 'react-redux'
import { updateFruits, updateVegetables } from '../../../../redux/slices/movingElements'

const ELEMENT_SIZE = {
    width: constants.wWidth * 0.2,
    height: constants.wWidth * 0.2,
}

export default function RanderElement() {
    const [isRandomingElement, setIsRandomingElement] = useState(true)
    const [curElement, setCurElement] = useState(null)

    const {fruits, vegetables} = useSelector(state => state.movingElements)
   
    const opacity = useSharedValue(1)
    const scale = useSharedValue(1)
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)

    const dispatch = useDispatch()

    const addElementInBasket = useCallback(({basketType, curElement}) => {
        console.log(basketType, curElement)
        if (basketType == curElement.data.type) { // if element type == basket for this type
            if (curElement.data.type == types.fruit) {
                dispatch(updateFruits(...elements.splice(curElement.index, 1)))
            }
            else if (curElement.data.type == types.vegetable) {
                dispatch(updateVegetables(...elements.splice(curElement.index, 1)))
            }

            opacity.value = withSpring(0)

            randomElement()
        }
       
            
    } , [])

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
            // console.log(event)
            // console.log(basketDots)
            if (absoluteY > basketDots.y1 && absoluteY< basketDots.y2) {
                // console.log(1)
                if (absoluteX > basketDots.leftBasket.x1 && absoluteX < basketDots.leftBasket.x2) // left basket
                {
                    // console.log(2)
                    translateX.value = withSpring((
                        ((basketDots.leftBasket.x2 - basketDots.leftBasket.x1) / 2)
                        - (basketFieldSize.width / 2)
                    ))
                    translateY.value = withSpring((
                        ((basketDots.y2 - basketDots.y1) / 2)
                        - (constants.wHeight / 2)
                        - (basketFieldSize.height / 2)
                    ))

                    runOnJS(addElementInBasket)(
                        { 
                            basketType: types.fruit, 
                            curElement: curElement
                        }
                    )
                }
                if (absoluteX > basketDots.rightBasket.x1 && absoluteX < basketDots.rightBasket.x2) // right basket
                {
                    // console.log(3)
                    translateX.value = withSpring(((
                        basketFieldSize.width / 2)
                        - ((basketDots.rightBasket.x2 - basketDots.rightBasket.x1) / 2)
                    ))
                    translateY.value = withSpring((
                        ((basketDots.y2 - basketDots.y1) / 2)
                        - (constants.wHeight / 2)
                        - (basketFieldSize.height / 2)
                    ))
                    // проверка на принадлежность добавленного обьекта "овощу"
                    
                    runOnJS(addElementInBasket)(
                        { 
                            basketType: types.vegetable, 
                            curElement: curElement
                        }
                    )
                }
            }
        },
    })

    const animateElementDefault = () => {
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
        scale.value = withRepeat(withSpring(1.1), -1, true)
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
        let rIndex = Math.floor(Math.random() * ((elements.length - 1) - 0) + 0);
        setCurElement({ index: rIndex, data: elements[rIndex]})
        animateElementDefault()
        setIsRandomingElement(false)
    }
    
    // Add element in basket animation 
    const addElementInBasketAnimate = ({type_of_basket}) => {
        if (type_of_basket == 'fruit') {
            
        }
        
        if (type_of_basket == 'vegetable') {
    
        }
    }

    useEffect(() => {
        // animateElementDefault()
    }, [])

    useEffect(() => {
        if (isRandomingElement) randomElement()
    }, [isRandomingElement])


    // if (isSetElementInBasket.state) console.log(777)
    if (!curElement) return null

    return (
        <GestureHandlerRootView style={styles.container}>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={[styles.element, rStyle]}>
                    <Image resizeMode='contain' source={curElement.data.img_link} style={styles.elementImg}></Image>
                </Animated.View>
            </PanGestureHandler>
            
            <TouchableOpacity onPress={() => setIsRandomingElement(true)}>
                <Text>Change</Text> 
            </TouchableOpacity>
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