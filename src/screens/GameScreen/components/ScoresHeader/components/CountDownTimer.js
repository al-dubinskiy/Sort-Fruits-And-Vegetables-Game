import React from 'react'
import { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../../../colors';
import { images } from '../../../../../images';

export const CountDownTimer = ({ initialTime }) => {
    const [minutes, setMinutes] = useState(initialTime.min);
    const [seconds, setSeconds] = useState(initialTime.sec);

    useEffect(()=>{
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
        };
    });

    return (
        <View style={styles.game_timer}>
          <Image resizeMode='contain' source={images.game_timer_bg} style={styles.game_timer_bg}/>
          <Text style={styles.game_timer_text}>{minutes}:{seconds}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    game_timer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: '100%',
    },
    game_timer_bg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 0
    }, 
    game_timer_text: {
        position: 'absolute',
        zIndex: 1,
        top: '25%',
        fontSize: 37,
        fontFamily: 'Gaegu-Bold',
        color: colors.white,
    },
})