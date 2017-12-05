// Note: when running with node, include the --harmony and --use_strict parameters
// to enable tail call optimization.

/// <reference path="input.ts" />

namespace Day05 {

    function jumpOut1(set: number[], position: number = 0, jumpCount: number = 0): number {        
        if (set[position] === undefined) {
            return jumpCount;
        }
        
        let jump = set[position];
        set[position]++;
        position += jump;
        return jumpOut1(set, position, jumpCount + 1);
    }

    function jumpOut2(set: number[], position:number = 0, jumpCount: number = 0): number {
        if (set[position] === undefined) {
            return jumpCount;
        }
        
        let jump = set[position];
        set[position] += (jump >= 3) ? -1 : 1;
        position += jump;
        return jumpOut2(set, position, jumpCount + 1);
    }

    let sampleSet = SAMPLE_PROBLEM.split('\n').map(x => +x);
    let bigSet = BIG_PROBLEM.split('\n').map(x => +x);

    let test1 = jumpOut1([...sampleSet]);
    console.log(`Part 1: Got ${test1} - expected ${SAMPLE_ANSWER_1}`);

    if (test1 === SAMPLE_ANSWER_1) {
        console.log(`Answer 1: ${jumpOut1([...bigSet])}`);
    }

    let test2 = jumpOut2([...sampleSet]);
    console.log(`Part 2: Got ${test2} - expected ${SAMPLE_ANSWER_2}`);

    if (test2 === SAMPLE_ANSWER_2) {
        console.log(`Answer 2: ${jumpOut2([...bigSet])}`);
    }
}