namespace Day19 {
    type Point = [number, number];

    export class DiagramCrawler {

        history: string[] = [];

        constructor(input: string) {
            this.grid = input.split('\n')
                .map(row => row.split(''));

            this.location = [0, this.grid[0].indexOf('|')];
            this.direction = [1, 0]; // start facing down.
            this.history.push('|'); // first move is free.

            while (!this.finished) this.move();
        }

        private grid: string[][];
        private location: Point;
        private direction: Point;
        private finished = false;

        private move() {
            let current = this.grid[this.location[0]][this.location[1]];
            if (current === '+') this.rotate();
            let next = this.getNeighbourValue(this.direction);
            if (!next || next === ' ') {
                this.finished = true;
                return;
            }

            this.location = this.getNeighbour(this.direction);
            this.history.push(next);
        }

        private rotate() {
            let [left, right, up, down] = <Point[]>[[0, -1], [0, 1], [-1, 0], [1, 0]];

            if (this.direction[0]) { // if we're vertical, go horizontal.
                this.direction = [left, right].filter(d => /[-A-Z]/.test(this.getNeighbourValue(d)))[0];
            }
            else { // if horizontal, go vertical.
                this.direction = [up, down].filter(d => /[|A-Z]/.test(this.getNeighbourValue(d)))[0];
            }
        }

        private getNeighbour(direction: Point): Point {
            return [this.location[0] + direction[0], this.location[1] + direction[1]];
        }

        private getNeighbourValue(direction: Point): string {
            let n = this.getNeighbour(direction);
            return !this.grid[n[0]] ? undefined : this.grid[n[0]][n[1]];
        }
    }
}