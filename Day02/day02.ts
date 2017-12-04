/// <reference path="inputs.ts" />

namespace Day02 {

    function solve(input: string, checksumFunction: Function): number {
        // calculate a specified checksum for every line in a "spreadsheet" string, then sum the results.

        return input.split('\n') 
            .map(l => l.split(/\s+/).filter(x => x).map(n => +n)) // convert lines to number arrays
            .map(v => checksumFunction(v)) 
            .reduce((x, y) => x + y); 
    }

    function checksum01(input: number[]): number {
        // Checksum for Part 01: find the max and min in the sequence and subtract them from each other.

        // by using a two-element array as the accumulator we can track the min and max in one pass.
        let initialValue = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
        let minmax = input
            .reduce((x: number[], y: number) => [Math.min(x[0], y), Math.max(x[1], y)], initialValue);

        return minmax[1] - minmax[0];
    }

    function checksum02_take1(input: number[]): number {
        // Checksum for Part 02: 
        // Given a set of numbers such that one number in the set is evenly divisible by 
        // one other number, find those two numbers and return the quotient.
        
        input.sort((a, b) => a - b).reverse();
        
        // with the list sorted (descending), we only have to check each element
        // against its subsequent elements.
        for (let i = 0; i < input.length; i++) {
            for (let j = i + 1; j < input.length; j++) {
                let quotient = input[i] / input[j];
                if (quotient % 1 === 0) {
                    return quotient;
                }
            }
        }

        throw new Error('No suitable combination found.');

        /*
            Notes:
            Even with the optimization above, this is O(N^2) as spreadsheet columns increase:
                f(4) = (3 checks) + (2 checks) + (1 check) -> worst case
                f(n) = (n-1) + (n-2) + [...] + 1 -> sum of 1 to n-1.
                     = E(i=1, n-1)
                     = ((n-1)*(n-1+1)) / 2
                     = ((n-1)*n) / 2
            
            Which looks like this: https://www.desmos.com/calculator/iyu8ltj7g3
            TODO: find non-universe-destroying algorithm.                
        */
    }

    
    function checksum02_take2(input: number[]): number {
        // Checksum for Part 02: 
        // Given a set of numbers such that one number in the set is evenly divisible by 
        // one other number, find those two numbers and return the quotient.
        
        let max = input.reduce((x,y) => Math.max(x,y));
        
        // for each number x, make multiples of x up to max and add to a set.
        let multiples = new Set<number>();
        input.forEach(x => {
            let factor = 2;
            let multiple:number;
            while((multiple = x * factor++) <= max){
                multiples.add(multiple);
            }
        });
        
        // if we've done this right, multiples must contain a match for a number in x.
        let dividend = input.filter(x => multiples.has(x))[0];
        let divisor = input.filter(d => (d !== dividend) && (dividend / d % 1 === 0))[0];
        return dividend / divisor;

        /*
            Notes:

            Let constant k be the maximum number in a spreadsheet row.
            Then, worst case:
                get max: n steps
                make multiples: (k-1)n steps (for an element value of 1)
                find dividend: n steps
                find divisor: n steps

                = 3n + (k-1)n steps
                = (k+2)n
                => O(n) (right?)
        */
    }

    // check and calculate: Part 01
    let sampleResult01 = solve(SAMPLE_PROBLEM_01, checksum01);
    var pass01 = sampleResult01 == SAMPLE_ANSWER_01;

    console.log(`01 Sample result: ${sampleResult01} (${pass01 ? 'pass' : 'fail'})`);
    if (pass01) {
        console.log(`01 Final result: ${solve(BIG_PROBLEM, checksum01)}`);
    }

    // check and calculate: Part 02 (O(n^2))
    let sampleResult02_take1 = solve(SAMPLE_PROBLEM_02, checksum02_take1);
    var pass02_take1 = sampleResult02_take1 == SAMPLE_ANSWER_02;

    console.log(`02 Sample result (take 1): ${sampleResult02_take1} (${pass02_take1 ? 'pass' : 'fail'})`);
    if (pass02_take1) {
        console.log(`02 Final result (take 1): ${solve(BIG_PROBLEM, checksum02_take1)}`);
    }

    // check and calculate: Part 02 (O(n))
    let sampleResult02_take2 = solve(SAMPLE_PROBLEM_02, checksum02_take2);
    var pass02_take2 = sampleResult02_take2 == SAMPLE_ANSWER_02;

    console.log(`02 Sample result (take 2): ${sampleResult02_take2} (${pass02_take2 ? 'pass' : 'fail'})`);
    if (pass02_take2) {
        console.log(`02 Final result (take 2): ${solve(BIG_PROBLEM, checksum02_take2)}`);
    }
}