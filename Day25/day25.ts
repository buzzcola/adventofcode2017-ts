/// <reference path="input.ts" />
/// <reference path="TuringMachine.ts" />

namespace  Day25 {

    function solve1(input:string){
        let tm = TuringMachine.fromString(input);
        tm.run();
        return tm.ones.size;
    }

    let test1 = solve1(SAMPLE_PROBLEM);
    let pass1 = test1 === SAMPLE_ANSWER_1;
    console.log(`Part 1 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_1} actual:${test1}`);
    if (pass1) {
        console.log(`Part 1 Answer: ${solve1(BIG_PROBLEM)}`);
    }
}