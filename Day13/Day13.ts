/// <reference path="input.ts" />
namespace Day13 {

    function solve1(input: string) {
        // layer number = picosecond. This is handy.
        // a scanner with depth d hits 0 on any picosecond p where p % ((d-1)*2) = 0.
        // so for each layer x where the scanner hits 0 at picosecond x, return x*depth.
        
        return getLayersFromInput(input)
            .filter(layer => layer.depth % ((layer.range - 1) * 2) == 0)
            .map(layer => layer.depth * layer.range)
            .reduce((x, y) => x + y, 0);
    }

    function solve2(input: string) {
        // using solve1's algorithm until we get an answer turned out to be super slow. instead
        // represent each scanner as a function and find a delay d such that all scanners
        // are dodged. This approach lets us break on the first failure instead of
        // testing all scanners for each candidate value of d.

        let scanners = getLayersFromInput(input)
            .sort((x,y) => x.range - y.range) // test the shortest ranges first.
            .map(layer => (d: number) => (layer.depth + d) % ((layer.range - 1) * 2) == 0);

        let delay = 0;
        while (scanners.some(s => s(delay))) delay++;
        return delay;
    }

    function getLayersFromInput(input: string): { depth: number, range: number }[] {
        return input.split('\n')
            .map(line => line.split(':'))
            .map(pair => ({ depth: +pair[0], range: +pair[1] }));
    }


    let test1 = solve1(SAMPLE_PROBLEM);
    let pass1 = test1 === SAMPLE_ANSWER_1;
    console.log(`Part 1 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_1} actual:${test1}`);
    if (pass1) {
        console.log(`Part 1 Answer: ${solve1(BIG_PROBLEM)}`);
    }

    let test2 = solve2(SAMPLE_PROBLEM);
    let pass2 = test2 === SAMPLE_ANSWER_2;
    console.log(`Part 2 Test -  ${pass2 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_2} actual:${test2}`);
    if (pass2) {
        console.log(`Part 2 Answer: ${solve2(BIG_PROBLEM)}`);
    }
}