/// <reference path="input.ts" />
namespace Day22 {

    let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // up, right, down, left

    function solve1(input: string, moves: number) {
        let data = input.split('\n').map(line => line.split(''));
        let center = Math.floor(data.length / 2); // assume a square grid with odd dimensions.
        let infections = new Set<string>(range2(data.length)
            .filter(p => data[p.x][p.y] == '#')
            .map(p => makeKey(p.x, p.y)));

        let direction = 0; // start facing up
        let location = [center, center];
        let infectionsCaused = 0;

        for (let i = 0; i < moves; i++) {
            let key = makeKey(location[0], location[1]);
            if (infections.has(key)) {
                direction = (direction + 1) % directions.length;
                infections.delete(key);
            } else {
                direction = direction == 0 ? (directions.length - 1) : direction - 1;
                infections.add(key);
                infectionsCaused++;
            }

            location = [location[0] + directions[direction][0], location[1] + directions[direction][1]];
        }

        return infectionsCaused;
    }

    function solve2(input: string, moves: number) {
        let data = input.split('\n').map(line => line.split(''));
        let center = Math.floor(data.length / 2); // assume a square grid with odd dimensions.
        let infections = new Map<string, infectionLevel>(
            range2(data.length)
                .filter(p => data[p.x][p.y] == '#')
                .map(p => <[string, infectionLevel]>[makeKey(p.x, p.y), infectionLevel.Infected])
        );

        let direction = 0; // up
        let location = [center, center];
        let infectionsCaused = 0;

        for (let i = 0; i < moves; i++) {
            let key = makeKey(location[0], location[1]);
            let level = infections.has(key) ? infections.get(key) : infectionLevel.Clean;
            switch (level) {
                case infectionLevel.Clean: direction = direction == 0 ? (directions.length - 1) : direction - 1; break;
                case infectionLevel.Weakened: infectionsCaused++; break;
                case infectionLevel.Infected: direction = (direction + 1) % directions.length; break;
                case infectionLevel.Flagged: direction = (direction + 2) % directions.length; break;
            }

            infections.set(key, (level + 1) % 4);
            location = [location[0] + directions[direction][0], location[1] + directions[direction][1]];
        }
        return infectionsCaused;
    }

    enum infectionLevel {
        Clean,
        Weakened,
        Infected,
        Flagged
    }

    function makeKey(x: number, y: number) {
        return `${x}-${y}`;
    }

    // i'm so tired of nested for loops. :(
    type Point = { x: number, y: number };
    function range2(size1: number, size2: number = undefined): Point[] {
        let result: Point[] = [];
        for (let i of [...Array(size1).keys()]) {
            for (let j of [...Array(size2 || size1).keys()]) {
                result.push({ x: i, y: j });
            }
        }
        return result;
    }

    
    let test1 = solve1(SAMPLE_PROBLEM, 10000);
    let pass1 = test1 === SAMPLE_ANSWER_1;
    console.log(`Part 1 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_1} actual:${test1}`);
    if (pass1) {
        console.log(`Part 1 Answer: ${solve1(BIG_PROBLEM, 10000)}`);
    }

    let test2 = solve2(SAMPLE_PROBLEM, 10000000);
    let pass2 = test2 === SAMPLE_ANSWER_2;
    console.log(`Part 2 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_2} actual:${test2}`);
    if (pass2) {
        console.log(`Part 2 Answer: ${solve2(BIG_PROBLEM, 10000000)}`);
    }
}