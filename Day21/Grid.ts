/// <reference path="../util.ts" />

namespace Day21 {
    export class Grid {

        constructor(public grid: string[][]) { }

        static fromString(input: string) {
            return new Grid(input.split('/').map(row => row.split('')));
        }

        // make a grid by combining a square 2d array of grids.
        static fromGrids(grids: Grid[][]) {
            let data: string[][] = [];
            for (let i of range2(grids.length)) {
                let g = grids[i.x][i.y];
                let rowOffset = i.x * g.grid.length;
                let columnOffset = i.y * g.grid[0].length;

                for (let j of range2(g.grid.length)) {
                    if (!data[j.x + rowOffset]) data[j.x + rowOffset] = [];
                    data[j.x + rowOffset][j.y + columnOffset] = g.grid[j.x][j.y];
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

            for (let i of range2(size)) {
                if (!result[i.x]) result[i.x] = [];
                result[i.x][i.y] = this.subGrid(i.x, i.y);
            }

            return result;
        }

        // slice a grid out of this grid according to the partition scheme.
        private subGrid(row: number, column: number): Grid {
            let partitionSize = this.grid.length % 2 == 0 ? 2 : 3;
            let data: string[][] = [];

            for (let i of range2(partitionSize)) {
                if (!data[i.x]) data[i.x] = [];
                let rowOffset = partitionSize * row;
                let columnOffset = partitionSize * column;
                data[i.x][i.y] = this.grid[rowOffset + i.x][columnOffset + i.y];
            }

            return new Grid(data);
        }

        getAllTransformations(): Grid[] {
            let noflip: Grid = this;
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
            let max = this.grid.length - 1;

            for (let i of range2(this.grid.length)) {
                if (!result[i.x]) result[i.x] = [];
                result[i.x][i.y] = fn(i.x, i.y, max);
            }

            return new Grid(result);
        }
    }
}