/// <reference path="input.ts" />
namespace Day09 {

    interface Interpreter { [name: string]: Function; }

    function solve(input: string): {score:number, gargageCount:number} {
        let interpreter: Interpreter;
        let [groupLevel, score, position, garbage] = [0, 0, 0, 0];

        let normalMode: Interpreter = {
            '{': () => score += ++groupLevel,
            '}': () => groupLevel--,
            '<': () => interpreter = garbageMode,
            '!': () => position++,
            'default': () => {}
        }

        let garbageMode: Interpreter = {
            '!': () => position++,
            '>': () => interpreter = normalMode,
            'default': () => garbage++
        }

        interpreter = normalMode;

        while (position < input.length){
            let char = input[position];
            if(interpreter.hasOwnProperty(char)) {
                interpreter[char]();
            } else {
                interpreter.default();
            }
            position++;
        }

        return {score: score, gargageCount:garbage };
    }


    console.log('Part 1 Testing');
    let pass1 = true;
    SAMPLES_1.forEach(stream => {
        let test = solve(stream[0]);
        let pass = test.score == stream[1];
        console.log(`\t${pass ? 'pass' : 'fail'}: expected:${stream[1]} actual:${test.score}`);
        if (!pass) {
            pass1 = false;            
        }
    });
    if(pass1){
        console.log(`Part 1 Answer: ${solve(BIG_PROBLEM).score}`);
    }

    console.log('Part 2 Testing');
    let pass2 = true;
    SAMPLES_2.forEach(stream => {
        let test = solve(stream[0]);
        let pass = test.gargageCount == stream[1];
        console.log(`\t${pass ? 'pass' : 'fail'}: expected:${stream[1]} actual:${test.gargageCount}`);
        if (!pass) {
            pass2 = false;            
        }
    });
    if(pass2){
        console.log(`Part 2 Answer: ${solve(BIG_PROBLEM).gargageCount}`);
    }
}