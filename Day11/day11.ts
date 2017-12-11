/// <reference path="input.ts" />
namespace Day11 {

    // using the cube coordinate system from https://www.redblobgames.com/grids/hexagons/
    let directions: {[direction:string]:number[]} = {
        'n':[0,-1],
        'ne':[1,-1],
        'se':[1, 0],
        's':[0,1],
        'sw':[-1,1],
        'nw':[-1,0]
    }

    function move(position:number[], direction:string):number[]{
        return [
            position[0] + directions[direction][0],
            position[1] + directions[direction][1]
         ];
    }

    function getDistance(position1:number[], position2:number[] = [0,0]):number{
        return Math.max(
            Math.abs(position1[0] - position2[0]), 
            Math.abs(position1[1] - position2[1]), 
            Math.abs(
                (position1[0] + position1[1]) - (position2[0] + position2[1])
            ));
    }

    function solve1(input:string):{finish:number, max:number} {
        let moves = input.split(',');
        let position = [0,0];
        let max = 0;
        for(let x of moves) {
            position = move(position, x);        
            max = Math.max(max, getDistance(position));
        }
        return {
            finish: getDistance(position),
            max: max
        }
    }

    let pass1 = true;
    console.log('Part 1 Test')
    for(let problem of SAMPLE_PROBLEMS_1){
        let test = solve1(problem[0]);
        let pass = test.finish === problem[1];
        console.log(`\t${pass ? 'pass' : 'fail'}: expected:${problem[1]} actual:${test}`);
        pass1 = pass1 && pass;
    }
    if(pass1){
        console.log(`Part 1 Answer: ${solve1(BIG_PROBLEM).finish}`);
        console.log(`Part 1 Answer: ${solve1(BIG_PROBLEM).max}`);
    }
}