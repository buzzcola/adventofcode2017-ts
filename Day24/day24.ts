/// <reference path="input.ts" />
/// <reference path="JunkTree.ts" />

namespace Day24 {

    function solve1(input: string) {
        let nodes = MakeJunkTree(input);
        return nodes
            .filter(n => n.isLeaf)
            .reduce((a, c) => Math.max(c.strength, a), 0);
    }

    function solve2(input: string) {
        return MakeJunkTree(input)
            .filter(n => n.isLeaf)
            .sort((x,y) => (y.height - x.height) || (y.strength - x.strength))[0]
            .strength;
    }


    let test1 = solve1(SAMPLE_PROBLEM);
    let pass1 = test1 === SAMPLE_ANSWER_1;
    console.log(`Part 1 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_1} actual:${test1}`);
    if (pass1) {
        console.log(`Part 1 Answer: ${solve1(BIG_PROBLEM)}`);
    }

    let test2 = solve2(SAMPLE_PROBLEM);
    let pass2 = test2 === SAMPLE_ANSWER_2;
    console.log(`Part 2 Test -  ${pass2 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_2} actual:${test2}`);
    if (pass2) {
        console.log(`Part 2 Answer: ${solve2(BIG_PROBLEM)}`);
    }    
}