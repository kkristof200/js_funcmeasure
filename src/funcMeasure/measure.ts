import { Measurement } from './measurement';
import { addLeadingchars } from "./helpers"

const { performance } = require('perf_hooks');

export function measure(
    functions: (() => void)[],
    times: number = 1000,
    printReport: boolean = true
): Measurement[] {
    var measurements: Measurement[] = []
    var shortestDurSeconds = Number.MAX_SAFE_INTEGER
    var longest = {
        'name': 'Function'.length,
        'totalDuration': 'Total Duration'.length,
        'avgDuration': 'Avg Duration'.length,
        'score': '~0.00x slower'.length
    }

    for (let f of functions) {
        var start = performance.now()

        for (let i = 0; i < times; i++) {
            f()
        }

        var durSeconds = (performance.now() - start) / 1000

        measurement = new Measurement(f.name, times, durSeconds)
        measurements.push(measurement)
        shortestDurSeconds = durSeconds < shortestDurSeconds ? durSeconds : shortestDurSeconds

        longest.name = longest.name < f.name.length ? f.name.length : longest.name
        longest.totalDuration = longest.totalDuration < measurement.orgTotalDurationStr.length ? measurement.orgTotalDurationStr.length : longest.totalDuration
        longest.avgDuration = longest.avgDuration < measurement.orgAvgDurationStr.length ? measurement.orgAvgDurationStr.length : longest.avgDuration
    }

    for (var measurement of measurements) {
        measurement.score = Math.round(measurement.totalDuration / shortestDurSeconds * 100) / 100
    }

    if (printReport) {
        _printReport(measurements, longest, functions.length, times)
    }

    return measurements
}

function _printReport(
    measurements: Measurement[],
    longest:  { [id: string] : number },
    funcCount: number,
    times: number
): void {
    measurements.sort(function(a,b) {return (a.totalDuration > b.totalDuration) ? 1 : ((b.totalDuration > a.totalDuration) ? -1 : 0)})

    var line = '| ' + addLeadingchars('Function', longest.name)
    + ' | ' + addLeadingchars('Total Duration', longest.totalDuration)
    + ' | ' + addLeadingchars('Avg Duration', longest.totalDuration)
    + ' | ' + addLeadingchars('Score', longest.score) + ' |'

    let sep = '-'.repeat(line.length)
    console.log('\nTested', funcCount, 'functions, ran', times, 'times each.\n')
    console.log(sep)
    console.log(line)
    console.log(sep)

    for (var measurement of measurements) {
        var line = '| ' + measurement.functionNameStr(longest.name)
        + ' | ' + measurement.totalDurationStr(longest.totalDuration)
        + ' |   ' + measurement.avgDurationStr(longest.avgDuration)
        + ' | ' + addLeadingchars((measurement.score == 1 ? 'fastest' : ' ~' + measurement.scoreStr() + 'x slower'), longest.score) + ' |'

        console.log(line)
    }

    console.log(sep)
}