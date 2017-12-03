/// <reference path="spiralCrawler.ts" />

namespace Day03 {

    let sampleInputs = [1, 12, 23, 1024];
    let sampleAnswers = [0, 3, 2, 31];

    const BIG_PROBLEM = 347991;

    var success = true;
    var crawler = new SpiralCrawler();
    for(let i=0; i < sampleInputs.length; i++){        
        crawler.travelToSquare(sampleInputs[i]);
        var pass = crawler.getDistanceToOrigin() === sampleAnswers[i];
        if(!pass) {
            success = false;
        }
        console.log(`${pass ? 'pass' : 'fail'}: ${sampleInputs[i]} => ${crawler.getDistanceToOrigin()} / ${sampleAnswers[i]}`);
    }

    if(success){
        console.log(`Crawling to square ${BIG_PROBLEM}`);
        var crawler = new SpiralCrawler();
        crawler.travelToSquare(BIG_PROBLEM);
        console.log(`Answer: ${crawler.getDistanceToOrigin()}`);
    }    
}