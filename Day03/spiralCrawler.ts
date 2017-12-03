namespace Day03 {

    enum Orientation {
        Up,
        Left,
        Down,
        Right
    }

    class SquareScoreContainer {
        private scoresByCoordinates: { [id: string]: number } = {};
        private scoresBySquareNumber: { [id: string]: number } = {};

        setScoreForSquare(x: number, y: number, score: number, step: number) {
            this.scoresByCoordinates[this.makeId(x, y)] = score;
            this.scoresBySquareNumber['' + step] = score;
        }

        getScoreByCoordinates(x: number, y: number) : number {
            return this.scoresByCoordinates[this.makeId(x, y)] || 0;
        }

        getScoreForSquare(squareNumber: number) : number {
            return this.scoresBySquareNumber['' + squareNumber] || 0;
        }

        private makeId(x: number, y: number) {
            return `${x}|${y}`;
        }
    }

    export class SpiralCrawler {

        private _orientation = Orientation.Down;
        private _x = 0;
        private _y = 0;
        private _currentStep = 1;
        private _currentSegmentLength = 0;
        private _lastSegmentLength = 0;
        private _stepsInSegment = 0;
        private _scores = new SquareScoreContainer;

        constructor() {
            // as specified in the problem, set a score of 1 for the origin.
            this._scores.setScoreForSquare(0, 0, 1, 0);
        }

        travelToSquare(squareNumber: number) {
            this.reset();
            for (let i = 0; i < squareNumber - 1; i++) {
                this.takeStep();
            }
        }

        getDistanceToOrigin() {
            return Math.abs(this._x) + Math.abs(this._y);
        }

        getScoreForSquare(squareNumber: number): number {
            if(squareNumber === 1){
                return 1; // special case
            }
            
            if (this._currentStep < squareNumber) {
                throw new Error("Can't score this square because it hasn't been visited yet.");
            }

            return this._scores.getScoreForSquare(squareNumber);
        }

        private reset() {
            this._orientation = Orientation.Down;
            this._x = 0;
            this._y = 0;
            this._currentSegmentLength = 0;
            this._lastSegmentLength = 0;
            this._stepsInSegment = 0;
        }

        private takeStep() {
            // if we're at the end of a segment, rotate.
            if (this._stepsInSegment == this._currentSegmentLength) {
                this.rotate();

                // start a new segment.
                let newLength = this._currentSegmentLength;
                // if we've completed two segments of the same length, time to start
                // a longer segment.
                if (this._currentSegmentLength == this._lastSegmentLength) {
                    newLength = this._currentSegmentLength + 1;
                }

                this._lastSegmentLength = this._currentSegmentLength;
                this._currentSegmentLength = newLength;
                this._stepsInSegment = 0;
            }

            this._stepsInSegment++;
            switch (this._orientation) {
                case Orientation.Down: this._y--; break;
                case Orientation.Left: this._x--; break;
                case Orientation.Right: this._x++; break;
                case Orientation.Up: this._y++; break;
            }

            this._currentStep++;

            // log the new square's score.
            let score = 0;
            [-1, 0, 1].forEach(x_offset => {
                [-1, 0, 1].forEach(y_offset => {                    
                    score += this._scores.getScoreByCoordinates(this._x + x_offset, this._y + y_offset);
                })
            });
            this._scores.setScoreForSquare(this._x, this._y, score, this._currentStep);
        }

        private rotate(): void {
            // end of segment reached, time to turn.
            this._orientation =
                this._orientation === Orientation.Up ? Orientation.Left :
                    this._orientation === Orientation.Left ? Orientation.Down :
                        this._orientation === Orientation.Down ? Orientation.Right :
                            Orientation.Up;
        }
    }
}