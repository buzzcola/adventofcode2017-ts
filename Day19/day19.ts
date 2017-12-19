/// <reference path="input.ts" />
/// <reference path="DiagramCrawler.ts" />

namespace Day19 {

    function solve(input: string): { letters: string, steps: number } {
        let c = new DiagramCrawler(input);
        return {
            'letters': c.history.filter(c => /[A-Z]/.test(c)).join(''),
            'steps': c.history.length
        };
    }


    let test1 = solve(SAMPLE_PROBLEM);
    let pass1 = test1.letters === SAMPLE_ANSWER_1;
    console.log(`Part 1 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_1} actual:${test1.letters}`);
    if (pass1) {
        console.log(`Part 1 Answer: ${solve(BIG_PROLBEM).letters}`);
    }

    let test2 = solve(SAMPLE_PROBLEM);
    let pass2 = test2.steps === SAMPLE_ANSWER_2;
    console.log(`Part 2 Test -  ${pass2 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_2} actual:${test2.steps}`);
    if (pass2) {
        console.log(`Part 2 Answer: ${solve(BIG_PROLBEM).steps}`);
    }

}