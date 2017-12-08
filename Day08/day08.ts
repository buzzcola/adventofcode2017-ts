/// <reference path="input.ts" />

namespace Day08 {

    class Instruction {
        constructor(        
            public target: string,
            public operation: string,
            public amount: number,
            public evalText: string,
            public evalTarget: string){}        

        static fromString(input:string):Instruction {
            let data = /^(\S+)\s+(\S+)\s+(-?\d+)\s+if\s+((\S+)\s\S+\s-?\d+)$/.exec(input);
            return new Instruction(data[1], data[2], +data[3], data[4], data[5]);
        }
    }

    function solve(input: string): { maxFinish: number, maxGlobal: number } {
        let registers: { [name: string]: number } = {};
        let instructions = input.split('\n')
            .map(x => Instruction.fromString(x));

        let globalMax = Number.MIN_SAFE_INTEGER;
        instructions.forEach(instruction => {
            // register new registers.
            if(!registers.hasOwnProperty(instruction.evalTarget)) registers[instruction.evalTarget] = 0;
            if(!registers.hasOwnProperty(instruction.target)) registers[instruction.target] = 0;

            if (eval('registers.' + instruction.evalText) as boolean) {
                let amount = instruction.amount * (instruction.operation === 'dec' ? -1 : 1);
                registers[instruction.target] += amount;
                globalMax = Math.max(globalMax, registers[instruction.target]);
            }
        });

        return {
            maxFinish: Math.max(...Object.keys(registers).map(k => registers[k])),
            maxGlobal: globalMax
        };
    }


    let test1 = solve(SAMPLE_PROBLEM).maxFinish;
    let pass1 = test1 === SAMPLE_ANSWER_1;
    console.log(`Part 1 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_1} actual:${test1}`);
    if (pass1) {
        console.log(`Part 1 Answer: ${solve(BIG_PROBLEM).maxFinish}`);
    }

    let test2 = solve(SAMPLE_PROBLEM).maxGlobal;
    let pass2 = test2 === SAMPLE_ANSWER_2;
    console.log(`Part 2 Test -  ${pass2 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_2} actual:${test2}`);
    if (pass2) {
        console.log(`Part 2 Answer: ${solve(BIG_PROBLEM).maxGlobal}`);
    }
}