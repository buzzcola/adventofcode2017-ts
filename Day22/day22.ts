/// <reference path="input.ts" />
namespace Day22 {

    function solve1(input:string, moves:number){
        let data = input.split('\n').map(line => line.split(''));
        let center = Math.ceil(data.length / 2); // assume a square grid with odd dimensions.
        let infections = new Set<string>();
        for(let i of range(data.length)){
            for (let j of range(data[0].length)) {
                if(data[i][j] == '#') {
                    infections.add(makeKey(i,j));
                }
            }
        }

        let directions = [[-1,0], [0,1], [1,0], [0,-1]];
        let direction = 0; // up
        let location = [center, center];
        let infectionsCaused = 0;

        let move = 0;
        while(move <= moves){
            let key = makeKey(location[0], location[1]);
            let infected = infections.has(key);
            // rotate
            if(infected) {
                direction = (direction + 1) % directions.length;
            } else {
                direction = direction == 0 ? (directions.length - 1) : direction - 1;
            }
            // modify
            if(infected) {
                infections.delete(key);
            } else {
                infections.add(key);
                infectionsCaused++;
            }

            // move
            location = [location[0] + directions[direction][0], location[1] + directions[direction][1]];
        }

        return infectionsCaused;
    }

    function makeKey(x:number, y:number){
        return `${x}-${y}`;
    }

    function range(size1: number, size2:number = undefined): number[] {
        return [...Array(size1).keys()];
    }
}