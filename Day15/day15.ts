/// <reference path="input.ts" />

namespace Day15 {

    const SAMPLE_SEED_A = 65;
    const SAMPLE_SEED_B = 8921;
    const SAMPLE_ANSWER_1 = 588;
    const SEED_A = 883;
    const SEED_B = 879;
    const FACTOR_A = 16807;
    const FACTOR_B = 48271;
    const BIT_MASK = 65535;

    function makeGenerator(factor:number, seed:number){
        let lastValue = seed;
        const divisor = 2147483647;
        return () => {
            lastValue = (lastValue * factor) % divisor;             
            return lastValue & BIT_MASK;
        }
    }

    function solve1(seed_a:number, seed_b:number){
        let genA = makeGenerator(FACTOR_A, seed_a);
        let genB = makeGenerator(FACTOR_B, seed_b);
        
        let matches = 0;
        for(let i=0; i < 40000000; i++) {
            if(genA() == genB()) matches++;
        }
        return matches;
    }

    let test1 = solve1(SAMPLE_SEED_A, SAMPLE_SEED_B);
    let pass1 = test1 === SAMPLE_ANSWER_1;
    console.log(`Part 1 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_1} actual:${test1}`);
    if (pass1) {
        console.log(`Part 1 Answer: ${solve1(SEED_A, SEED_B)}`);
    }
/*
    let test2 = solve2(SAMPLE_PROBLEM);
    let pass2 = test2 === SAMPLE_ANSWER_2;
    console.log(`Part 2 Test -  ${pass2 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_2} actual:${test2}`);
    if (pass2) {
        console.log(`Part 2 Answer: ${solve2(BIG_PROBLEM)}`);
    }
    */
}