export interface IPosition {
    left: number
    x: number
}

export interface INumberUtility {
    clamp: (min: number, value: number, max: number) => number
    rand: (min: number, max: number) => number
}

export interface ITimeUtility {
    format: (date: Date) => string
    formatHours: (hours: number) => string
    formatSegment: (segment: number) => string
}

export interface ILogInUtility {
    verify: (pin: string) => Promise<boolean>
}
