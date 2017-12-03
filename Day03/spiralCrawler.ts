namespace Day03 {

    enum Orientation {
        Up,
        Left,
        Down,
        Right
    }

    export class SpiralCrawler {

        private _orientation: Orientation = Orientation.Down;
        private _x: number = 0;
        private _y: number = 0;
        private _currentSegmentLength: number = 0;
        private _lastSegmentLength: number = 0;
        private _stepsInSegment: number = 0;

        travelToSquare(squareNumber:number){
            this.reset();
            for (let i = 0; i < squareNumber - 1; i++) {
                this.takeStep();
            }
        }

        getDistanceToOrigin(): number {
            return Math.abs(this._x) + Math.abs(this._y);
        }
        
        private reset():void{
            this._orientation = Orientation.Down;
            this._x = 0;
            this._y = 0;
            this._currentSegmentLength = 0;
            this._lastSegmentLength = 0;
            this._stepsInSegment = 0;
        }

        private takeStep(): void {
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
            switch(this._orientation){
                case Orientation.Down: this._y--; break;
                case Orientation.Left: this._x--; break;
                case Orientation.Right: this._x++; break;
                case Orientation.Up: this._y++; break;
            }
        }

        rotate(): void {
            // end of segment reached, time to turn.
            this._orientation =
                this._orientation === Orientation.Up ? Orientation.Left :
                    this._orientation === Orientation.Left ? Orientation.Down :
                        this._orientation === Orientation.Down ? Orientation.Right :
                            Orientation.Up;
        }
    }
}