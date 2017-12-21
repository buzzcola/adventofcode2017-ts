namespace Day21 {
    export class Grid {

        static fromString(input: string) {
            return new Grid(input.split('\n').map(row => row.split('')));
        }

        constructor(public grid: string[][]) { }

        toString() {
            return this.grid.map(row => row.join('')).join('');
        }

        getAllPermutations() {
            let result:Grid[] =[];
            result.push(this.flippedX());
        }

        rotatedClockwise() {
            let result: string[][] = [];
            let max = this.grid[0].length - 1;

            for (let i = 0; i < max; ++i) {
                for (let j = 0; j < max; ++j) {
                    if (!result[i]) {
                        result[i] = [];
                    }
                    result[i][j] = this.grid[max - j][i];
                }
            }
            return new Grid(result);
        }

        flippedX() {
            let result: string[][] = [];
            let max = this.grid[0].length - 1;
            for (let i = 0; i < max; i++) {
                for (let j = 0; j < max; j++) {
                    if (!result[i]) {
                        result[i] = [];
                    }
                    result[i][j] = this.grid[i][max - j];
                }
            }
            return new Grid(result);
        }

        flippedY() {
            let result: string[][] = [];
            let max = this.grid[0].length - 1;
            for (let i = 0; i < max; i++) {
                for (let j = 0; j < max; j++) {
                    if (!result[i]) {
                        result[i] = [];
                    }
                    result[i][j] = this.grid[max - i][j];
                }
            }
            return new Grid(result);
        }
    }
}