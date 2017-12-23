/// <reference path="input.ts" />
/// <reference path="../Day18/program.ts" />

namespace Day23 {

    function solve1(input:string){
        let p = new Day18.Program(0, BIG_PROBLEM);
        let mulCount = 0;
        while(!p.finished){
            if(p.execute() === 'mul'){
                mulCount++;
            }
        }
        return mulCount;        
    }

    console.log(`Part 1 Answer: ${solve1(BIG_PROBLEM)}`);

    /*
    let test2 = solve2(SAMPLE_PROBLEM, 10000000);
    let pass2 = test2 === SAMPLE_ANSWER_2;
    console.log(`Part 2 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_2} actual:${test2}`);
    if (pass2) {
        console.log(`Part 2 Answer: ${solve2(BIG_PROBLEM, 10000000)}`);
    }
    */
}