/// <reference path = "../Day10/day10.ts" />
/// <reference path = "../Day12/graphing.ts" />
/// <reference path = "../Day12/day12.ts" />
/// <reference path = "input.ts" />

namespace Day14 {

    function solve1(input: string): number {
        return getHexGrid(input)
            .map(hexChars => hexChars.map(char => countOnesInHexDigit(char)))
            .reduce((x, y) => x.concat(y))
            .reduce((x, y) => x + y);
    }

    function solve2(input: string): number {
        let hexGrid = getHexGrid(input);
        let bitGrid = hexGrid
            .map(hexRow => hexRow.map(digit => makeBitsFromHexDigit(digit)))
            .map(bitArrays => bitArrays.reduce((x, y) => x.concat(y)));

        let vertices: Day12.Vertex[] = [];
        let vertexGrid: Day12.Vertex[][] = [];
        for (let i of range(128)) {
            vertexGrid[i] = [];
            for (let j of range(128)) {
                if (bitGrid[i][j]) {
                    vertexGrid[i][j] = new Day12.Vertex(`${i}-${j}`, []);
                    vertices.push(vertexGrid[i][j]);
                } else {
                    vertexGrid[i][j] = undefined;
                }
            }
        }

        for (let i of range(128)) {
            for (let j of range(128)) {
                let v = vertexGrid[i][j];
                if (v) {
                    let down = (i < 127) ? vertexGrid[i + 1][j] : undefined;
                    let right = vertexGrid[i][j + 1];
                    if (down) {
                        v.edgesFrom.push(new Day12.Edge(v.name, down.name));
                    }
                    if (right) {
                        v.edgesFrom.push(new Day12.Edge(v.name, right.name));
                    }
                }
            }
        }

        return Day12.solve2(new Day12.Graph(vertices));
    }


    function getHexGrid(input: string) {
        return range(128)
            .map(i => Day10.solve2(input + '-' + i))
            .map(hexString => hexString.split(''));
    }

    function makeBitsFromHexDigit(hexDigit: string): boolean[] {
        let num = parseInt(hexDigit, 16);
        let result: boolean[] = [];

        for (let i of range(4))
            result.unshift((num & (Math.pow(2, i))) != 0);

        return result;
    }

    function countOnesInHexDigit(hexDigit: string): number {
        let num = parseInt(hexDigit, 16);
        let sum = 0;
        for (let i of range(4)) {
            if ((num & (Math.pow(2, i))) != 0) {
                sum++;
            }
        }
        return sum;
    }

    function range(size: number): number[] {
        return [...Array(size).keys()]
    }

    /*
        let test1 = solve1(SAMPLE_PROBLEM);
        let pass1 = test1 === SAMPLE_ANSWER_1;
        console.log(`Part 1 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_1} actual:${test1}`);
        if (pass1) {
            console.log(`Part 1 Answer: ${solve1(BIG_PROBLEM)}`);
        }
    */
    let test2 = solve2(SAMPLE_PROBLEM);
    let pass2 = test2 === SAMPLE_ANSWER_2;
    console.log(`Part 2 Test -  ${pass2 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_2} actual:${test2}`);
    if (pass2) {
        console.log(`Part 2 Answer: ${solve2(BIG_PROBLEM)}`);
    }
}