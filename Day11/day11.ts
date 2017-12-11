/// <reference path="input.ts" />
namespace Day11 {

    type Point = [number, number];

    // using the cube coordinate system from https://www.redblobgames.com/grids/hexagons/
    let directions: { [direction: string]: Point } = {
        'n': [0, -1],
        'ne': [1, -1],
        'se': [1, 0],
        's': [0, 1],
        'sw': [-1, 1],
        'nw': [-1, 0]
    }

    function getDistance(position1: Point, position2: Point = [0, 0]): number {
        return Math.max(
            Math.abs(position1[0] - position2[0]),
            Math.abs(position1[1] - position2[1]),
            Math.abs((position1[0] + position1[1]) - (position2[0] + position2[1]))
        );
    }

    function solve(input: string): { finish: number, max: number } {
        let moves = input.split(',');
        let position: Point = [0, 0];
        let max = 0;
        for (let move of moves) {
            position[0] += directions[move][0],
            position[1] += directions[move][1]
            max = Math.max(max, getDistance(position));
        }
        return {
            finish: getDistance(position),
            max: max
        }
    }

    let passAll = true;
    console.log('Part 1 Test')
    for (let problem of SAMPLE_PROBLEMS_1) {
        let test = solve(problem[0]);
        let pass = test.finish === problem[1];
        console.log(`\t${pass ? 'pass' : 'fail'}: expected:${problem[1]} actual:${test.finish}`);
        pass = passAll && pass;
    }
    if (pass) {
        console.log(`Part 1 Answer: ${solve(BIG_PROBLEM).finish}`);
        console.log(`Part 2 Answer: ${solve(BIG_PROBLEM).max}`);
    }
}
