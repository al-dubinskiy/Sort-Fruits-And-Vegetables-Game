import React, { useEffect, useState } from 'react'
import { colors } from '../../../../colors'
import { images } from '../../../../images'
import { constants } from '../../../../constants';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';
import { Image, StyleSheet, Text, View } from 'react-native';
import { types } from '../../../../types';
import { elements } from '../../../../elementsData';
import { useSelector } from 'react-redux';

export const basketFieldSize = {
    width: constants.wWidth * 0.9,
    height: constants.wHeight * 0.3
}

export const basketDots = { // backets fiels
    leftBasket: {
        x1: constants.wWidth * 0.05,
        x2: (basketFieldSize.width / 2),
    },
    rightBasket: {
        x1: constants.wWidth * 0.05 + (basketFieldSize.width / 2),
        x2: (basketFieldSize.width / 2) + (basketFieldSize.width / 2),
    },
    y1: basketFieldSize.height * 0.17,
    y2: basketFieldSize.height * 0.17 + basketFieldSize.height,
}

const randomRange = {
    leftBasket: {
        minX: basketDots.leftBasket.x1,
        maxX: basketDots.leftBasket.x2
    },
    rightBasket: {
        minX: basketDots.rightBasket.x1,
        maxX: basketDots.rightBasket.x2
    },
    minY: basketDots.y1,
    maxY: basketDots.y2,
}

export default function PickingBaskets() {

    const {fruits, vegetables} = useSelector(state => state.movingElements)
    console.log(fruits)

    const [isHighlightBasket, setIsHighlightBasket] = useState({
        left: true,
        right: false
    })

    const rotate = useSharedValue(10)

    const rotateBasketStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotateX: rotate.value + 'deg' }
            ]
        }
    })

    const drawElementsInBasket = (data) => {
        return data.map((el, idx) => {
            return <Image key={idx} source={el.img_link} style={[
                    styles.basket_el,
                    {
                        left: Math.floor(Math.random() * (50 - 10) + 10) + '%',
                        top: Math.floor(Math.random() * (50 - 10) + 10) + '%',
                    }
                ]}/>
        })
    }

    useEffect(() => {
        rotate.value = withRepeat(withTiming(10, {duration: 700}) , -1, true)
    }, [])

    return (
        <View style={styles.picking_baskets}>
            <View style={[styles.backet, isHighlightBasket.left ? styles.highlight_basket : null]}>
                <Animated.View style={[{width: '100%', height: '100%'}, rotateBasketStyle]}>
                    <Image source={images.basket_empty} style={styles.basket_bg}/>
                    {
                      drawElementsInBasket(fruits)
                    }
                </Animated.View>
                <View style={styles.content_count}>
                    <Text style={styles.count}>5/10</Text>
                    <Text style={styles.type}>Fruits</Text>
                </View>
            </View>

            <View style={[styles.backet, isHighlightBasket.right ? styles.highlight_basket : null]}>
                <Animated.View style={[{width: '100%', height: '100%'}, rotateBasketStyle]}>
                    <Image source={images.basket_empty} style={styles.basket_bg}/> 
                    {
                      drawElementsInBasket(vegetables)
                    }
                </Animated.View>
                <View style={styles.content_count}>
                    <Text style={styles.count}>5/10</Text>
                    <Text style={styles.type}>Vegetables</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    picking_baskets: {
        position: 'absolute',
        zIndex: 1,
        width: basketFieldSize.width,
        height: basketFieldSize.height,
        left: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: constants.wHeight * 0.17,
    },
    backet: {
        width: constants.wWidth * 0.4,
        height: constants.wWidth * 0.4,
        borderRadius: 30,
        padding: 5,
        alignItems: 'center'
    },
    basket_bg: {
        position: 'absolute',
        zIndex: -1,
        width: '100%',
        height: '100%',
    },
    highlight_basket: {
        shadowColor: colors.lightRed,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.9,
        shadowRadius: 1.65,
        elevation: 6,
    },
    basket_el: {
        position: 'absolute', 
        zIndex: 3,
        width: constants.wWidth * 0.1,
        height: constants.wWidth * 0.1,
    },
    content_count: {
        position: 'absolute',
        zIndex: 1,
        bottom: -constants.wHeight * 0.03,
        borderRadius: 10,
        backgroundColor: colors.lightBrown,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
    },
    count: {
        fontSize: 25,
        fontFamily: 'Gaegu-Bold',
        color: colors.white
    },
    type: {
        fontSize: 20,
        fontFamily: 'Gaegu-Bold',
        color: colors.white
    },
})