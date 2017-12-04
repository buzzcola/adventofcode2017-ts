namespace Day03 {

    enum Direction {
        Up,
        Left,
        Down,
        Right
    }

    class SquareScoreContainer {
        private scoresByCoordinates: { [id: string]: number } = {};
        private scoresBySquareNumber: { [id: string]: number } = {};

        setScoreForSquare(x: number, y: number, squareNumber: number, score: number) {
            this.scoresByCoordinates[this.makeId(x, y)] = score;
            this.scoresBySquareNumber[squareNumber] = score;
        }

        getScoreByCoordinates(x: number, y: number): number {
            return this.scoresByCoordinates[this.makeId(x, y)] || 0;
        }

        getScoreForSquare(squareNumber: number): number {
            return this.scoresBySquareNumber[squareNumber] || 0;
        }

        private makeId(x: number, y: number) {
            return `${x}|${y}`;
        }
    }

    export class SpiralCrawler {

        private _currentDirection = Direction.Down;
        private _x = 0;
        private _y = 0;
        private _currentSquareNumber = 1;
        private _segmentLengthQueue = [0, 0];
        private _positionInSegment = 0;
        private _scores = new SquareScoreContainer();

        constructor(crawlTo?: number) {
            // as specified in the problem, set a score of 1 for the origin.
            this._scores.setScoreForSquare(0, 0, 1, 1);

            if (crawlTo) {
                this.crawlTo(crawlTo);
            }
        }

        crawlTo(squareNumber: number) {
            if (squareNumber < this._currentSquareNumber) {
                throw new Error(`Crawler is forward-only. Current square number is ${this._currentSquareNumber}`);
            }

            while (this._currentSquareNumber < squareNumber) {
                this.crawl();
            }
        }

        private crawl() {            
            if(this._positionInSegment < this._segmentLengthQueue[0]) {
                // we're mid-segment, move forward.
                this._positionInSegment++;
            } else {                
                // time to start a new segment. if we've completed two segments of the same length, this one will be longer.
                this.rotate();
                let newLength = this._segmentLengthQueue[0];                
                if (this._segmentLengthQueue[0] == this._segmentLengthQueue[1]) {
                    newLength++;
                }

                // save the new length in our length history.
                this._segmentLengthQueue.pop();
                this._segmentLengthQueue.unshift(newLength);
                this._positionInSegment = 1;
            }
            
            switch (this._currentDirection) {
                case Direction.Down: this._y--; break;
                case Direction.Left: this._x--; break;
                case Direction.Right: this._x++; break;
                case Direction.Up: this._y++; break;
            }

            this._currentSquareNumber++;

            // calculate the score by summing the score of all neighbours. Since our crawler is forward-only,
            // unvisited neighbours can be safely included since they have no score yet.
            let score = 0;
            [-1, 0, 1].forEach(x_offset => {
                [-1, 0, 1].forEach(y_offset => {
                    score += this._scores.getScoreByCoordinates(this._x + x_offset, this._y + y_offset);
                })
            });
            this._scores.setScoreForSquare(this._x, this._y, this._currentSquareNumber, score);
        }

        getDistanceToOrigin() {
            return Math.abs(this._x) + Math.abs(this._y);
        }

        getScore(): number {
            return this._scores.getScoreForSquare(this._currentSquareNumber);
        }

        private rotate(): void {
            this._currentDirection =
                this._currentDirection === Direction.Up ? Direction.Left :
                    this._currentDirection === Direction.Left ? Direction.Down :
                        this._currentDirection === Direction.Down ? Direction.Right :
                            Direction.Up;
        }
    }
}