/// <reference path="input.ts" />
namespace Day10 {

    function solve1(listSize: number, lengths: number[], rounds: number = 1): number[] {
        let list = range(listSize);
        let position = 0;
        let skipSize = 0;
        for (let _ of range(rounds)) {
            for (let length of lengths) {
                let indexes = range(length).map(i => (position + i) % list.length);
                let segment = indexes.map(i => list[i]);
                segment.reverse();
                indexes.forEach(i => list[i] = segment.shift());
                position = (position + length + skipSize++) % list.length;
            }
        }

        return list;
    }

    export function solve2(input: string, listSize: number = 256) {
        let lengths = [...input]
            .map(i => i.charCodeAt(0))
            .concat(17, 31, 73, 47, 23);

        let sparseHash = solve1(listSize, lengths, 64);
        return range(listSize / 16)
            .map(i => sparseHash.slice(i * 16, (i + 1) * 16))
            .map(chunk => chunk.reduce((x, y) => x ^ y))
            .map(x => x.toString(16))
            .map(x => x.length == 2 ? x : '0' + x)
            .join('');
    }

    function range(size: number): number[] {
        return [...Array(size).keys()]
    }

    /*
    let test1 = solve1(5, SAMPLE_PROBLEM_1);
    let pass1 = test1[0] * test1[1] === SAMPLE_ANSWER_1;
    console.log(`Part 1 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_1} actual:${test1[0] * test1[1]}`);
    if (pass1) {
        let problemArray = BIG_PROBLEM.split(',').map(x => +x);
        let answer = solve1(256, problemArray);
        console.log(`Part 1 Answer: ${answer[0] * answer[1]}`);
    }

    let pass2 = true;
    SAMPLE_PROBLEMS_2.forEach(problem => {
        let test2 = solve2(problem[0]);
        let pass = test2 === problem[1];
        console.log(`Part 2 Test -  ${pass ? 'pass' : 'fail'}: expected:${problem[1]} actual:${test2}`);
        pass2 = pass2 && pass;
    });

    if (pass2) {
        console.log(`Part 2 Answer: ${solve2(BIG_PROBLEM)}`);
    }
    */
}

