namespace Day19 {
    // had to resort to file access today because copy-pasting those diagrams got weird.
    declare function require(name: string);
    let fs = require('fs');

    export const SAMPLE_PROBLEM = fs.readFileSync('day19/sample_problem_1.txt', 'utf8');
    export const SAMPLE_ANSWER_1 = 'ABCDEF';
    export const SAMPLE_ANSWER_2 = 38;

    export const BIG_PROLBEM = fs.readFileSync('day19/big_problem.txt', 'utf8');    
}