namespace Day19 {
    declare function require(name:string);
    let fs = require('fs');

    export function sample_problem(){
        return fs.readFileSync('day19/sample_problem_1.txt', 'utf8');
    }

    export const SAMPLE_ANSWER_1 = 'ABCDEF';
    export const SAMPLE_ANSWER_2 = 38;

    export function big_problem() {
        return fs.readFileSync('day19/big_problem.txt', 'utf8');
    }
}