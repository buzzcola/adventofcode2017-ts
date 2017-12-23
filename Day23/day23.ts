/// <reference path="../util.ts" />
/// <reference path="input.ts" />
/// <reference path="Program.ts" />

namespace Day23 {

    function solve1(input: string) {
        let p = new Program(BIG_PROBLEM);
        let mulCount = 0;
        while (!p.finished) {
            if (p.execute() === 'mul') {
                mulCount++;
            }
        }
        return mulCount;
    }

    function solve2(input: string) {
        // let the program run until instruction 9.
        let p = new Program(BIG_PROBLEM, 1);
        while(p.position != 9) {
             p.execute();
        }
        
        // then take matters into our own hands.
        let [a, b, c, d, e, f, g, h] = Object.keys(p.registers).map(k => p.registers[k]);         
        
        // remaining instructions optimized slightly from below.
        for(let i = p.registers.b; i <= p.registers.c; i+= 17) {
            if(!isPrime(i)) h++;
        }

        return h;
    }

    function isPrime(x: number) {
        for (var i = 2; i < x; i++) {
            if (x % i === 0) return false;
        }
        return x !== 1;
    }

    function startingPointForReference(input: string) {
        // let the program run until instruction 9.
        let p = new Program(BIG_PROBLEM, 1);
        while(p.position != 9) {
             p.execute();
        }
        
        // then take matters into our own hands.
        let [a, b, c, d, e, f, g, h] = Object.keys(p.registers).map(k => p.registers[k]);         

        while (true) { // loop 9 - 33
            f = 1;
            d = 2;
            while (true) { // loop 11 - 24
                e = 2;
                while (true) { // loop 12 - 20
                    g = d;
                    g *= e;
                    g -= b;
                    if (g === 0) f = 0;
                    e -= -1;
                    g = e;
                    g -= b;
                    if (g === 0) break;
                }
                d -= -1; // 21
                g = d;
                g -= b;
                if (g === 0) break;
            }
            if (f === 0) h -= -1; // 25
            g = b;
            g -= c;
            if (g === 0) break; // end!
            b -= -17;
        }
    }


    console.log(`Part 1 Answer: ${solve1(BIG_PROBLEM)}`);
    console.log(`Part 2 Answer: ${solve2(BIG_PROBLEM)}`);
}