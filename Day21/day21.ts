/// <reference path="input.ts" />
/// <reference path="Grid.ts" />

namespace Day21 {

    function solve(input: string, steps:number) {        

        let transformations: { [pattern: string]: Grid } = {};
        for(let row of input.split('\n')){
            let left = Grid.fromString(row.substring(0, row.indexOf('=') - 1));
            let right = Grid.fromString(row.substring(row.indexOf('>') + 2, row.length));
            for(let t of left.getAllTransformations()){
                transformations[t.toString()] = right;
            }
        }

        let grid = Grid.fromString(START_PATTERN);
        let step = 0;
        while(step++ < steps) {            
            let subgrids = grid.partition();
            for(let i = 0; i < subgrids.length; i++){
                for(let j = 0; j < subgrids[0].length; j++){
                    subgrids[i][j] = transformations[subgrids[i][j].toString()];
                }
            }
            grid = Grid.fromGrids(subgrids);
        }

        return grid.toString().split('').filter(c => c === '#').length;
    }

    let test1 = solve(SAMPLE_PROBLEM, SAMPLE_ITERATIONS_1);
    let pass1 = test1 === SAMPLE_ANSWER_1;
    console.log(`Part 1 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_1} actual:${test1}`);
    if (pass1) {
        console.log(`Part 1 Answer: ${solve(BIG_PROBLEM, BIG_ITERATIONS_1)}`);
        console.log(`Part 2 Answer: ${solve(BIG_PROBLEM, BIG_ITERATIONS_2)}`);
    }
}