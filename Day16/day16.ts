/// <reference path="input.ts" />
namespace Day16 {

    function danceAThon(start: string, input: string) {
        let dancers = start.split('');
        for (let instruction of input.split(',')) {
            let [command, argument] = [instruction.slice(0, 1), instruction.slice(1)]
            switch (command) {
                case 's': {
                    let split = +argument;
                    let spun = dancers.slice(dancers.length - split, dancers.length).concat(dancers.slice(0, dancers.length - split))
                    spun.forEach((v, i) => dancers[i] = v);
                } break;
                case 'x': {
                    let [i, j] = argument.split('/').map(Number);
                    [dancers[i], dancers[j]] = [dancers[j], dancers[i]];
                } break;
                case 'p': {
                    let [a, b] = argument.split('/');
                    let [i, j] = [dancers.indexOf(a), dancers.indexOf(b)];
                    [dancers[i], dancers[j]] = [dancers[j], dancers[i]];
                } break;
            }
        }
        return dancers.join('');
    }

    function solve1(start: string, input: string) {
        return danceAThon(start, input);
    }

    function solve2(start: string, input: string) {
        let i = 0, loop = 1000000000, result = start;
        while (i++ < loop) {
            result = danceAThon(result, input);
            if (start == result) { // cycle found, jump forward.
                i = loop - (loop % i);
            }
        }
        return result;
    }

    
    let test1 = solve1('abcde', SAMPLE_PROBLEM);
    let pass1 = test1 === SAMPLE_ANSWER_1;
    console.log(`Part 1 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_1} actual:${test1}`);
    if (pass1) {
        console.log(`Part 1 Answer: ${solve1('abcdefghijklmnop', BIG_PROBLEM)}`);
        console.log(`Part 2 Answer: ${solve2('abcdefghijklmnop', BIG_PROBLEM)}`);
    }    
}
