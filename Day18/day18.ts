/// <reference path="input.ts" />
/// <reference path="program.ts" />

namespace Day18 {

    function solve1(input: string) {
        let registers: { [name: string]: number } = {};
        let lastSound: number = undefined;

        let instructions = input.split('\n');
        for (let i = 0; i < instructions.length; i++) {
            let [command, r, arg2] = /^(\w{3}) (\w)(?: (-?\w*))?$/.exec(instructions[i]).slice(1);
            if (!registers.hasOwnProperty(r)) registers[r] = 0;
            let value: number;
            if (arg2) {
                value = isNaN(Number(arg2)) ? registers[arg2] : +arg2;
            }

            switch (command) {
                case 'snd': { lastSound = registers[r]; } break;
                case 'set': { registers[r] = value; } break;
                case 'add': { registers[r] += value; } break;
                case 'mul': { registers[r] *= value; } break;
                case 'mod': { registers[r] = registers[r] % value; } break;
                case 'rcv': { if (registers[r] > 0) return lastSound; } break;
                case 'jgz': { if (registers[r]) i += (value - 1); } break;
            }
        }

        throw new Error('Something should have happened by now.');
    }

    function solve2(input: string) {
        let p = [new Program(0, input), new Program(1, input)];
        [p[0].friend, p[1].friend] = [p[1], p[0]];

        while (!p.every(prog => prog.waiting || prog.finished)) {
            p.forEach(prog => { if(!prog.finished) prog.execute(); });
        }

        return p[1].sent;
    }


    let test1 = solve1(SAMPLE_PROBLEM_1);
    let pass1 = test1 === SAMPLE_ANSWER_1;
    console.log(`Part 1 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_1} actual:${test1}`);
    if (pass1) {
        console.log(`Part 1 Answer: ${solve1(BIG_PROBLEM)}`);
    }

    let test2 = solve2(SAMPLE_PROBLEM_2);
    let pass2 = test2 === SAMPLE_ANSWER_2;
    console.log(`Part 2 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_2} actual:${test2}`);
    if (pass2) {
        console.log(`Part 2 Answer: ${solve2(BIG_PROBLEM)}`);
    }
}