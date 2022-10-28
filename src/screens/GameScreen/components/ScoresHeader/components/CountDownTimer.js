import React from 'react'
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../../../colors';
import { setGameEndState } from '../../../../../redux/slices/gameConfigure';
import { typesGameEndReason } from '../../../../../types';

export const CountDownTimer = () => {
    const {countDownTime} = useSelector(state => state.gameConfigure.gameDifficultyLevel)
    const {value} = useSelector(state => state.gameConfigure.gameEndState)
    if (!countDownTime) return null

    const [timer, setTimer] = useState({
        min: 0,
        sec: 0,
    })

    const dispatch = useDispatch()

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (timer.sec > 0) {
                setTimer({...timer, sec: timer.sec - 1})
            }
            if (timer.sec === 0) {
                if (timer.min === 0) {
                    clearInterval(myInterval)
                    dispatch(setGameEndState({
                        value: true,
                        reason: typesGameEndReason.timeIsUp
                    }))
                } else {
                    setTimer({
                        min: timer.min - 1,
                        sec: 59
                    })
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
        };
    });

    useEffect(()=> {
        if (!value) setTimer({
            min: countDownTime.min,
            sec: countDownTime.sec,
        })
    }, [value])

    return (
        <View style={styles.game_timer}>
          <Text style={styles.game_timer_text}>{timer.min}:{timer.sec}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    game_timer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderRadius: 20,
        backgroundColor: colors.white,
        paddingHorizontal: 15
    },
    game_timer_text: {
        fontSize: 37,
        fontFamily: 'Gaegu-Bold',
        color: colors.lightBrown,
    },
})

// useEffect(() => {
//     let myInterval = setInterval(() => {
//         if (seconds > 0) {
//             setSeconds(seconds - 1);
//         }
//         if (seconds === 0) {
//             if (minutes === 0) {
//                 clearInterval(myInterval)
//                 dispatch(setGameEndState({
//                     value: true,
//                     reason: typesGameEndReason.timeIsUp
//                 }))
//             } else {
//                 setMinutes(minutes - 1);
//                 setSeconds(59);
//             }
//         } 
//     }, 1000)
//     return ()=> {
//         clearInterval(myInterval);
//     };
// });