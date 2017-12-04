/// <reference path="SpiralCrawler.ts" />

namespace Day03 {

    let sampleInputs1 = [1, 12, 23, 1024];
    let sampleAnswers1 = [0, 3, 2, 31];

    const BIG_PROBLEM = 347991;

    console.log('\n Part 1 \n');

    let success = true;
    console.log('test: actual / expected');

    for (let i = 0; i < sampleInputs1.length; i++) {
        let distance = new SpiralCrawler(sampleInputs1[i]).getDistanceToOrigin();
        let pass = distance === sampleAnswers1[i];
        if (!pass) {
            success = false;
        }
        console.log(`${pass ? 'pass' : 'fail'}: ${sampleInputs1[i]} => ${distance} / ${sampleAnswers1[i]}`);
    }

    if (success) {
        console.log(`Crawling to square ${BIG_PROBLEM}`);
        let solution = new SpiralCrawler(BIG_PROBLEM).getDistanceToOrigin();
        console.log(`Answer: ${solution}`);
    }

    console.log('\n Part 2 \n');

    let sampleInputs2 = [1, 2, 3, 4, 5];
    let sampleAnswers2 = [1, 1, 2, 4, 5];

    success = true;
    for(let i = 0; i < sampleInputs2.length; i++){        
        let score = new SpiralCrawler(sampleInputs2[i]).getScore();
        var pass = score === sampleAnswers2[i];
        if (!pass) {
            success = false;
        }
        console.log(`${pass ? 'pass' : 'fail'}: ${sampleInputs2[i]} => ${score} / ${sampleAnswers2[i]}`);
    }

    if (success) {
        console.log(`Getting first score greater than ${BIG_PROBLEM}`);
        let square = 0;
        let score = 0;
        let crawler = new SpiralCrawler();
        while(score < BIG_PROBLEM) {
            crawler.crawlTo(++square);
            score = crawler.getScore();
        }        
        console.log(`Answer: ${score} (at square ${square})`);
    }
}