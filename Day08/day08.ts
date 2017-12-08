/// <reference path="input.ts" />

namespace Day08 {

    function solve(input: string): { maxFinish: number, maxGlobal: number } {
        let registers: { [name: string]: number } = {};
        let globalMax = 0;
        input.split('\n').forEach(line => {
            let values = /^(\S+)\s+(\S+)\s+(-?\d+)\s+if\s+((\S+)\s\S+\s-?\d+)$/.exec(line);
            let [register, op, amount, evalText, evalRegister] = values.slice(1);
            
            if (!registers.hasOwnProperty(register)) registers[register] = 0;
            if (!registers.hasOwnProperty(evalRegister)) registers[evalRegister] = 0;
            
            if (eval('registers.' + evalText)) {
                registers[register] += +amount * (op === 'dec' ? -1 : 1);
                globalMax = Math.max(globalMax, registers[register]);
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