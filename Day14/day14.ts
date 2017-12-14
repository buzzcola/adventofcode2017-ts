/// <reference path = "../Day10/day10.ts" />
/// <reference path = "input.ts" />
namespace Day14 {

    function solve1(input: string): number {
        return range(128)
            .map(i => Day10.solve2(BIG_PROBLEM + '-' + i))
            .map(hexString => hexString.split(''))
            .map(hexChars => hexChars.map(char => countOnesInHexDigit(char)))
            .reduce((x,y) => x.concat(y))
            .reduce((x, y) => x + y);
    }

    let memo:{[name:string]:number} = {};
    function countOnesInHexDigit(hexDigit: string): number {
        if(memo.hasOwnProperty(hexDigit)) {

        }

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

    console.log(solve1(BIG_PROBLEM));
}