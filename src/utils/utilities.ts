import type { IPosition, INumberUtility, ITimeUtility, ILogInUtility } from './types'
import { Default } from './enums'

export const defaultPosition = (): IPosition => ({
    left: 0,
    x: 0,
})

export const N: INumberUtility = {
    clamp: (min: number, value: number, max: number): number => Math.min(Math.max(min, value), max),
    rand: (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min),
}

export const T: ITimeUtility = {
    format: (date: Date): string => {
        const hours: string = T.formatHours(date.getHours())
        const minutes: number = date.getMinutes()
        return `${hours}:${T.formatSegment(minutes)}`
    },
    formatHours: (hours: number): string => {
        return (hours % 12 === 0 ? 12 : hours % 12).toString()
    },
    formatSegment: (segment: number): string => {
        return segment < 10 ? `0${segment}` : segment.toString()
    },
}

export const LogInUtility: ILogInUtility = {
    // eslint-disable-next-line require-await
    verify: async (pin: string): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (pin === Default.PIN) {
                    resolve(true)
                } else {
                    reject(`Invalid pin: ${pin}`)
                }
            }, N.rand(300, 700))
        })
    },
}
