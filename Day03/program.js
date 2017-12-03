var Day03;
(function (Day03) {
    let Orientation;
    (function (Orientation) {
        Orientation[Orientation["Up"] = 0] = "Up";
        Orientation[Orientation["Left"] = 1] = "Left";
        Orientation[Orientation["Down"] = 2] = "Down";
        Orientation[Orientation["Right"] = 3] = "Right";
    })(Orientation || (Orientation = {}));
    class SquareScoreContainer {
        constructor() {
            this.scoresByCoordinates = {};
            this.scoresBySquareNumber = {};
        }
        setScoreForSquare(x, y, score, step) {
            this.scoresByCoordinates[this.makeId(x, y)] = score;
            this.scoresBySquareNumber['' + step] = score;
        }
        getScoreByCoordinates(x, y) {
            return this.scoresByCoordinates[this.makeId(x, y)] || 0;
        }
        getScoreForSquare(squareNumber) {
            return this.scoresBySquareNumber['' + squareNumber] || 0;
        }
        makeId(x, y) {
            return `${x}|${y}`;
        }
    }
    class SpiralCrawler {
        constructor() {
            this._orientation = Orientation.Down;
            this._x = 0;
            this._y = 0;
            this._currentStep = 1;
            this._currentSegmentLength = 0;
            this._lastSegmentLength = 0;
            this._stepsInSegment = 0;
            this._scores = new SquareScoreContainer;
            // as specified in the problem, set a score of 1 for the origin.
            this._scores.setScoreForSquare(0, 0, 1, 0);
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
        getScoreForSquare(squareNumber) {
            if (squareNumber === 1) {
                return 1; // special case
            }
            if (this._currentStep < squareNumber) {
                throw new Error("Can't score this square because it hasn't been visited yet.");
            }
            return this._scores.getScoreForSquare(squareNumber);
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
            this._currentStep++;
            // log the new square's score.
            let score = 0;
            [-1, 0, 1].forEach(x_offset => {
                [-1, 0, 1].forEach(y_offset => {
                    score += this._scores.getScoreByCoordinates(this._x + x_offset, this._y + y_offset);
                });
            });
            this._scores.setScoreForSquare(this._x, this._y, score, this._currentStep);
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
    let sampleInputs1 = [1, 12, 23, 1024];
    let sampleAnswers1 = [0, 3, 2, 31];
    const BIG_PROBLEM = 347991;
    console.log('\n Part 1 \n');
    var success = true;
    var crawler = new Day03.SpiralCrawler();
    console.log('test: actual / expected');
    for (let i = 0; i < sampleInputs1.length; i++) {
        crawler.travelToSquare(sampleInputs1[i]);
        var pass = crawler.getDistanceToOrigin() === sampleAnswers1[i];
        if (!pass) {
            success = false;
        }
        console.log(`${pass ? 'pass' : 'fail'}: ${sampleInputs1[i]} => ${crawler.getDistanceToOrigin()} / ${sampleAnswers1[i]}`);
    }
    if (success) {
        console.log(`Crawling to square ${BIG_PROBLEM}`);
        var crawler = new Day03.SpiralCrawler();
        crawler.travelToSquare(BIG_PROBLEM);
        console.log(`Answer: ${crawler.getDistanceToOrigin()}`);
    }
    console.log('\n Part 2 \n');
    let sampleInputs2 = [1, 2, 3, 4, 5];
    let sampleAnswers2 = [1, 1, 2, 4, 5];
    success = true;
    for (let i = 0; i < sampleInputs2.length; i++) {
        let score = crawler.getScoreForSquare(sampleInputs2[i]);
        var pass = score === sampleAnswers2[i];
        if (!pass) {
            success = false;
        }
        console.log(`${pass ? 'pass' : 'fail'}: ${sampleInputs2[i]} => ${score} / ${sampleAnswers2[i]}`);
    }
    if (success) {
        console.log(`Getting first score greater than ${BIG_PROBLEM}`);
        let square = 1;
        let score = 0;
        while (score < BIG_PROBLEM) {
            score = crawler.getScoreForSquare(++square);
        }
        console.log(`Answer: ${score} (at square ${square})`);
    }
})(Day03 || (Day03 = {}));
//# sourceMappingURL=program.js.map