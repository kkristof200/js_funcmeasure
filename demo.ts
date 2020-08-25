import { Measurement, measure } from './src/index';

function f1() { 1 + 1 }
function f2() { Math.pow(Math.pow(Math.pow(Math.pow(Math.pow(Math.pow(Math.pow(10, 10), 10), 10), 10), 10), 10), 10) }

let measurements = measure([f1, f2], 10000, true)

console.log('\n\n\n')
console.log(measurements)