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

        private _currentDirection= Direction.Down;
        private _x = 0;
        private _y = 0;
        private _currentSquareNumber = 1;
        private _currentSegmentLength = 0;
        private _previousSegmentLength = 0;
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
            if(squareNumber < this._currentSquareNumber){
                throw new Error(`Crawler is forward-only. Current square number is ${this._currentSquareNumber}`);
            }
            
            while(this._currentSquareNumber < squareNumber){
                this.crawl();
            }
        }

        crawl() {
            // if we're at the end of a segment, rotate.
            if (this._positionInSegment == this._currentSegmentLength) {
                this.rotate();

                // start a new segment.
                let newLength = this._currentSegmentLength;
                // if we've completed two segments of the same length, time to start a longer segment.
                if (this._currentSegmentLength == this._previousSegmentLength) {
                    newLength = this._currentSegmentLength + 1;
                }

                // enqueue the new segment length in the segment length "queue"
                this._previousSegmentLength = this._currentSegmentLength;
                this._currentSegmentLength = newLength;
                this._positionInSegment = 0;
            }

            this._positionInSegment++;
            switch (this._currentDirection) {
                case Direction.Down: this._y--; break;
                case Direction.Left: this._x--; break;
                case Direction.Right: this._x++; break;
                case Direction.Up: this._y++; break;
            }

            this._currentSquareNumber++;

            // log the new square's score.
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
            // end of segment reached, time to turn.
            this._currentDirection =
                this._currentDirection === Direction.Up ? Direction.Left :
                    this._currentDirection === Direction.Left ? Direction.Down :
                        this._currentDirection === Direction.Down ? Direction.Right :
                            Direction.Up;
        }
    }
}