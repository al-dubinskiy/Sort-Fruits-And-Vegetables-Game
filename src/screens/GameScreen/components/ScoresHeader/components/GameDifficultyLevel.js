import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../../../../../colors';

export const GameDifficultyLevel = () => {
    const {level, colorIndicator} = useSelector(state => state.gameConfigure.gameDifficultyLevel)
    if (!level) return null

    return (
        <View style={styles.container}>
          <Text style={styles.caption}>D.l</Text>
          <View style={[styles.level, { backgroundColor: colorIndicator }]}>
              <Text style={styles.level_text}>{level}</Text>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    caption: {
        fontSize: 25,
        fontFamily: 'Gaegu-Bold',
        color: colors.white,
    },
    level: {
        height: 50,
        width: 50,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    level_text: {
        fontFamily: 'Gaegu-Bold',
        fontSize: 25,
        color: colors.white
    }
})