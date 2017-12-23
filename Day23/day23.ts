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
        let [a, b, c, d, e, f, g, h] = [1, 105700, 122700, 0, 0, 0, 0, 0]; // state as of instruction 09        
        let fn: { [line: number]: Function } = {
            9: () => { [f, d, e, g] = [1, 2, 2, 4 - b]; return (g != 0) ? 17 : 16; },
            11: () => { e = 2; return 12; },
            12: () => { g = d; g *= e; g -= b; return (g != 0) ? 17 : 16; },
            16: () => { f = 0; return 17; },
            17: () => { e -= 1; g = e; g -= b; return (g != 0) ? 12 : 21; },
            21: () => {
                d -= 1; g = d; g -= b;
                console.log(`21: g = ${g}`);
                return (g != 0) ? 11 : 25;
            },
            25: () => {
                console.log(`25: f = ${f}, h = ${h}`);
                if (f != 0) h -= 1;
                return 27;
            },
            27: () => {
                g = b;
                g -= c;
                if (g != 0) {
                    b -= 17;
                    console.log(`27: g = ${g}, h = ${h}`);
                    return 9;
                } else { return undefined; }
            }
        };

        let position = 9;
        while (position != undefined) {
            position = fn[position]();
        }

        return h;
    }

    function solve3(input: string) {
        let [a, b, c, d, e, f, g, h] = [1, 105700, 122700, 2, 2, 1, -105696, 0]; // state as of instruction 10
        while (g != 0) {
            g = 0;
            h -= 1;
            g = b - c;
            if (g == 0) break;
            b -= 17
        }

        return h;
    }

    console.log(`Part 1 Answer: ${solve1(BIG_PROBLEM)}`);
    console.log(`Part 2 Answer: ${solve2(BIG_PROBLEM)}`);
}