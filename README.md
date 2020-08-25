## Installation

```
npm install --save funcmeasure
```

## Usage

```typescript
import { measure } from 'funcmeasure';

function f1() { 1 + 1 }
function f2() {
    var i = 5

    for (let _ = 0; _ < 100; _ ++) {
        i = Math.pow(i, 10)
    }
}

let measurements = measure([f1, f2], 10000, true)
```

## Result

```
Tested 2 functions, ran 10000 times each.

--------------------------------------------------------------
| Function | Total Duration |   Avg Duration |         Score |
--------------------------------------------------------------
|       f1 |    0.000309193 |        3.09e-8 |       fastest |
|       f2 |    0.008580814 |       8.581e-7 | 27.75x slower |
--------------------------------------------------------------
```
