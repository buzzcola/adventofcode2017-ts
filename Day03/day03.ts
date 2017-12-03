/// <reference path="spiralCrawler.ts" />

namespace Day03 {

    let sampleInputs1 = [1, 12, 23, 1024];
    let sampleAnswers1 = [0, 3, 2, 31];

    const BIG_PROBLEM = 347991;

    console.log('\n Part 1 \n');

    var success = true;
    var crawler = new SpiralCrawler();
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
        var crawler = new SpiralCrawler();
        crawler.travelToSquare(BIG_PROBLEM);
        console.log(`Answer: ${crawler.getDistanceToOrigin()}`);
    }

    console.log('\n Part 2 \n');

    let sampleInputs2 = [1, 2, 3, 4, 5];
    let sampleAnswers2 = [1, 1, 2, 4, 5];

    success = true;
    for(let i = 0; i < sampleInputs2.length; i++){
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
        let score:number = 0;
        while(score < BIG_PROBLEM) {
            score = crawler.getScoreForSquare(++square);
        }        
        console.log(`Answer: ${score} (at square ${square})`);
    }
}