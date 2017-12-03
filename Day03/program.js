var Day03;
(function (Day03) {
    let Orientation;
    (function (Orientation) {
        Orientation[Orientation["Up"] = 0] = "Up";
        Orientation[Orientation["Left"] = 1] = "Left";
        Orientation[Orientation["Down"] = 2] = "Down";
        Orientation[Orientation["Right"] = 3] = "Right";
    })(Orientation || (Orientation = {}));
    class SpiralCrawler {
        constructor() {
            this._orientation = Orientation.Down;
            this._x = 0;
            this._y = 0;
            this._currentSegmentLength = 0;
            this._lastSegmentLength = 0;
            this._stepsInSegment = 0;
        }
        travelToSquare(squareNumber) {
            this.reset();
            for (let i = 0; i < squareNumber - 1; i++) {
                this.takeStep();
            }
        }
        getDistanceToOrigin() {
            return Math.abs(this._x) + Math.abs(this._y);
        }
        reset() {
            this._orientation = Orientation.Down;
            this._x = 0;
            this._y = 0;
            this._currentSegmentLength = 0;
            this._lastSegmentLength = 0;
            this._stepsInSegment = 0;
        }
        takeStep() {
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
                case Orientation.Down:
                    this._y--;
                    break;
                case Orientation.Left:
                    this._x--;
                    break;
                case Orientation.Right:
                    this._x++;
                    break;
                case Orientation.Up:
                    this._y++;
                    break;
            }
        }
        rotate() {
            // end of segment reached, time to turn.
            this._orientation =
                this._orientation === Orientation.Up ? Orientation.Left :
                    this._orientation === Orientation.Left ? Orientation.Down :
                        this._orientation === Orientation.Down ? Orientation.Right :
                            Orientation.Up;
        }
    }
    Day03.SpiralCrawler = SpiralCrawler;
})(Day03 || (Day03 = {}));
/// <reference path="spiralCrawler.ts" />
var Day03;
(function (Day03) {
    let sampleInputs = [1, 12, 23, 1024];
    let sampleAnswers = [0, 3, 2, 31];
    const BIG_PROBLEM = 347991;
    var success = true;
    var crawler = new Day03.SpiralCrawler();
    for (let i = 0; i < sampleInputs.length; i++) {
        crawler.travelToSquare(sampleInputs[i]);
        var pass = crawler.getDistanceToOrigin() === sampleAnswers[i];
        if (!pass) {
            success = false;
        }
        console.log(`${pass ? 'pass' : 'fail'}: ${sampleInputs[i]} => ${crawler.getDistanceToOrigin()} / ${sampleAnswers[i]}`);
    }
    if (success) {
        console.log(`Crawling to square ${BIG_PROBLEM}`);
        var crawler = new Day03.SpiralCrawler();
        crawler.travelToSquare(BIG_PROBLEM);
        console.log(`Answer: ${crawler.getDistanceToOrigin()}`);
    }
})(Day03 || (Day03 = {}));
