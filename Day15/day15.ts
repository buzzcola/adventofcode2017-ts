/// <reference path="input.ts" />

namespace Day15 {

    function makeGenerator(name: string, seed: number, mod:number = 1) {
        let factor = name.toUpperCase() == 'A' ? 16807 : 48271;
        let value = seed;
        return () => {
            do {
                value = (value * factor) % 2147483647;
            } while(value % mod != 0);       
            return value & 65535;
        }
    }

    function solve1(seed_a: number, seed_b: number) {
        let genA = makeGenerator('A', seed_a);
        let genB = makeGenerator('B', seed_b);
        let matches = 0;
                
        for (let i = 0; i < 40000000; i++) {
            if (genA() == genB()) {
                matches++;
            }
        }

        return matches;
    }

    function solve2(seed_a: number, seed_b: number) {
        let genA = makeGenerator('A', seed_a, 4);
        let genB = makeGenerator('B', seed_b, 8);
        let matches = 0;
        
        for (let i = 0; i < 5000000; i++) {
            if (genA() == genB()) {
                matches++;
            }
        }

        return matches;
    }


    let test1 = solve1(SAMPLE_SEED_A, SAMPLE_SEED_B);
    let pass1 = test1 === SAMPLE_ANSWER_1;
    console.log(`Part 1 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_1} actual:${test1}`);
    if (pass1) {
        console.log(`Part 1 Answer: ${solve1(SEED_A, SEED_B)}`);
    }

    let test2 = solve2(SAMPLE_SEED_A, SAMPLE_SEED_B);
    let pass2 = test2 === SAMPLE_ANSWER_2;
    console.log(`Part 2 Test -  ${pass2 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_2} actual:${test2}`);
    if (pass2) {
        console.log(`Part 2 Answer: ${solve2(SEED_A, SEED_B)}`);
    }
}