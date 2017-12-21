namespace Day21 {
    export class Grid {

        constructor(public grid: string[][]) { }

        static fromString(input: string) {
            return new Grid(input.split('/').map(row => row.split('')));
        }

        // make a grid by combining a square 2d array of grids.
        static fromGrids(grids: Grid[][]) {
            let data: string[][] = [];
            for (let i = 0; i < grids.length; i++) {
                for (let j = 0; j < grids.length; j++) {
                    let g = grids[i][j];
                    let rowOffset = i * g.grid.length;
                    let columnOffset = j * g.grid[0].length;

                    for (let i = 0; i < g.grid.length; i++) {
                        if (!data[i + rowOffset]) data[i + rowOffset] = [];
                        for (let j = 0; j < g.grid.length; j++) {
                            data[i + rowOffset][j + columnOffset] = g.grid[i][j];
                        }
                    }
                }
            }
            return new Grid(data);
        }

        toString() {
            return this.grid.map(row => row.join('')).join('/');
        }

        // break this grid into a square 2d array of grids length 2 or 3 (favour 2.)
        partition(): Grid[][] {
            let partitionSize = (this.grid.length % 2 === 0) ? 2 : 3;
            let result: Grid[][] = [];
            let size = this.grid.length / partitionSize;
            for (let i = 0; i < size; i++) {
                if (!result[i]) result[i] = [];
                for (let j = 0; j < size; j++) {                    
                    result[i][j] = this.subGrid(i, j);
                }
            }
            return result;
        }

        // slice a grid out of this grid according to the partition scheme.
        private subGrid(row: number, column: number): Grid {
            let partitionSize = this.grid.length % 2 == 0 ? 2: 3;
            let data:string[][] = [];
            
            for(let i = 0; i < partitionSize; i++) {
                if(!data[i]) data[i] = [];
                for(let j = 0; j < partitionSize; j++){                    
                    let rowOffset = partitionSize * row;
                    let columnOffset = partitionSize * column;
                    data[i][j] = this.grid[rowOffset + i][columnOffset + j];
                }
            }
            return new Grid(data);
        }

        getAllTransformations() : Grid[] {
            let noflip:Grid = this;
            let xflip = this.flippedX();
            let yflip = this.flippedY();

            return [
                noflip,
                (noflip = noflip.rotatedClockwise()),
                (noflip = noflip.rotatedClockwise()),
                (noflip = noflip.rotatedClockwise()),
                xflip,
                (xflip = xflip.rotatedClockwise()),
                (xflip = xflip.rotatedClockwise()),
                (xflip = xflip.rotatedClockwise()),
                yflip,
                (yflip = yflip.rotatedClockwise()),
                (yflip = yflip.rotatedClockwise()),
                (yflip = yflip.rotatedClockwise())
            ];
        }

        private rotatedClockwise = () => this.transform((i, j, max) => this.grid[max - j][i]);
        private flippedX = () => this.transform((i, j, max) => this.grid[i][max - j]);
        private flippedY = () => this.transform((i, j, max) => this.grid[max - i][j]);

        private transform(fn: (i: number, j: number, max: number) => string): Grid {
            let result: string[][] = [];
            let max = this.grid[0].length - 1;
            for (let i = 0; i <= max; i++) {
                for (let j = 0; j <= max; j++) {
                    if (!result[i]) {
                        result[i] = [];
                    }
                    result[i][j] = fn(i, j, max);
                }
            }
            return new Grid(result);
        }
    }
}