import { colors } from "./colors"

export const types = {
    fruit: 'fruit',
    vegetable: 'vegetable'
}

export const typesGameEndReason = {
    timeIsUp: 'timeIsUp',
    youLose: 'youLose',
    youWin: 'youWin',
}

export const gameDifficultyLevels = [
    {
        level: 1,
        colorIndicator: colors.lightGreen,
        countDownTime: {min: 1, sec: 30}
    },
    {
        level: 2,
        colorIndicator: colors.lightOrange,
        countDownTime: {min: 1, sec: 0}
    },
    {
        level: 3,
        colorIndicator: colors.lightRed,
        countDownTime: {min: 0, sec: 45}
    },
]
