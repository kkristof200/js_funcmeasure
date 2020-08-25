import { addLeadingchars } from "./helpers"

export class Measurement {
    readonly functionName: string
    readonly timesRun: number
    readonly totalDuration: number
    readonly avgDuration: number
    score: number

    private totalDurationPrecision: number
    private avgDurationPrecision: number

    constructor(
        functionName: string,
        timesRun: number,
        totalDuration: number,
        score?: number,
        totalDurationPrecision: number = 10,
        avgDurationPrecision: number = 10
    ) {
        this.functionName = functionName
        this.timesRun = timesRun
        this.totalDuration = totalDuration
        this.avgDuration = totalDuration / timesRun

        this.score = score ?? 1.0

        this.totalDurationPrecision = totalDurationPrecision
        this.avgDurationPrecision = avgDurationPrecision
    }

    functionNameStr(len: number): string {
        return addLeadingchars(this.functionName, len)
    }

    totalDurationStr(len: number, maxPrecision?: number): string {
        return addLeadingchars(this.orgTotalDurationStr(maxPrecision), len)
    }
    orgTotalDurationStr(maxPrecision?: number): string {
        return this.numWithPrecision(this.totalDuration, maxPrecision ?? this.avgDurationPrecision).toString()
    }

    avgDurationStr(len: number, maxPrecision?: number): string {
        return addLeadingchars(this.orgAvgDurationStr(maxPrecision), len)
    }
    orgAvgDurationStr(maxPrecision?: number): string {
        return this.numWithPrecision(this.avgDuration, maxPrecision ?? this.avgDurationPrecision).toString()
    }

    scoreStr(maxPrecision: number = 2): string {
        return this.numWithPrecision(this.score, maxPrecision).toString()
    }

    private numWithPrecision(num: number, maxPrecision: number): number {
        let multi = Math.pow(10, maxPrecision)

        return Math.round(num * multi) / multi
    }
}