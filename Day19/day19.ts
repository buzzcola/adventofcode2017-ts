/// <reference path="input.ts" />
namespace Day19 {

    type Location = [number, number];

    function solve(input: string): { letters: string, steps: number } {
        let g = new Grid(input);
        let result = '';
        let current = g.current;
        do {
            if (/[A-Z]/.test(current)) result = result + current;
            current = g.move();
        } while (!!current);

        return { 'letters': result, 'steps': g.stepsTaken };
    }

    class Grid {
        constructor(input: string) {
            this.grid = input.split('\n')
                .map(row => row.split(''));

            let x = this.grid[0].indexOf('|');
            this.location = [0, x];
            this.direction = [1, 0];
        }

        horizCheck = /[-A-Z]/;
        vertCheck = /[|A-Z]/;
        left: Location = [0, -1];
        right: Location = [0, 1];
        up: Location = [-1, 0];
        down: Location = [1, 0];
        location: Location;
        direction: Location;
        grid: string[][];
        stepsTaken = 1;

        move(): string {
            let nextMove: Location = undefined;
            if (this.current != '+') { // keep moving.
                let next = this.neighbour(this.direction);
                if (next) nextMove = this.direction;
            } else {
                if (this.direction[0]) { // if we're moving vertically, go horizontal.
                    nextMove = [this.left, this.right].filter(d => this.horizCheck.test(this.neighbour(d)))[0];
                    if (nextMove) this.direction = nextMove;
                } else { // if we're moving horizontally, go vertical
                    nextMove = [this.up, this.down].filter(d => this.vertCheck.test(this.neighbour(d)))[0];
                    if (nextMove) this.direction = nextMove;
                }
            }

            if (!nextMove) return undefined; // end of the line.

            this.stepsTaken++;
            this.location = [this.location[0] + nextMove[0], this.location[1] + nextMove[1]];
            return this.current;
        }

        get current(): string {
            return this.grid[this.location[0]][this.location[1]];
        }

        neighbour(direction: Location) {
            // check bounds.
            let neighbourY = this.location[0] + direction[0];
            let neighbourX = this.location[1] + direction[1];
            if (neighbourY >= this.grid.length || neighbourY < 0 || neighbourX > this.grid[0].length || neighbourX < 0) {
                return undefined;
            }
            return this.grid[this.location[0] + direction[0]][this.location[1] + direction[1]];
        }
    }

    let test1 = solve(sample_problem());
    let pass1 = test1.letters === SAMPLE_ANSWER_1;
    console.log(`Part 1 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_1} actual:${test1.letters}`);
    if (pass1) {
        console.log(`Part 1 Answer: ${solve(big_problem()).letters}`);
    }

    let test2 = solve(sample_problem());
    let pass2 = test2.steps === SAMPLE_ANSWER_2;
    console.log(`Part 2 Test -  ${pass2 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_2} actual:${test2.steps}`);
    if (pass2) {
        console.log(`Part 2 Answer: ${solve(big_problem()).steps}`);
    }

}