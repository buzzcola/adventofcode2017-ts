/// <reference path="input.ts" />
namespace Day16 {
    class danceMove {

        static danceAThon(numberOfDancers: number, input: string, loop: number = 1) {
            let dancers = 'abcdefghijklmnopqrstuvwxyz'.split('').slice(0, numberOfDancers);

            for (let i = 0; i < loop; i++) {
                for (let instruction of input.split(',')) {
                    danceMove.dance(dancers, instruction)
                }
            }
            return dancers.join('');
        }

        static makeTransformation(transformedString: string) {
            let original = 'abcdefghijklmnopqrstuvwxyz'.split('').slice(0, transformedString.length);
            let transformed = transformedString.split('');
            let result: number[] = [];

            for (let i of original) {
                result.push(transformed.indexOf(i));
            }

            return result;
        }

        static applyTransformation(numberOfDancers: number, transformation: number[], loop: number = 1) {
            let dancers = 'abcdefghijklmnopqrstuvwxyz'.split('').slice(0, numberOfDancers);
            let result = [...dancers];
            for (let i = 0; i < loop; i++) {
                let next = [...result];
                for (let j = 0; j < transformation.length; j++) {
                    next[transformation[j]] = result[j];
                }
                result = next;
            }

            return result.join('');
        }

        private static dance(dancers: string[], instruction: string) {
            let [command, argument] = [instruction.slice(0, 1), instruction.slice(1)]
            danceMove.moves[command](dancers, argument);
        }

        private static moves: { [name: string]: Function } = {
            's': danceMove.spin,
            'x': danceMove.exchange,
            'p': danceMove.partner
        };

        private static spin(dancers: string[], args: string) {
            let split = +args;
            let spun = dancers.slice(dancers.length - split, dancers.length).concat(dancers.slice(0, dancers.length - split))
            spun.forEach((v, i) => dancers[i] = v);
        }

        private static exchange(dancers: string[], args: string) {
            let [i, j] = args.split('/').map(Number);
            let temp = dancers[i];
            dancers[i] = dancers[j];
            dancers[j] = temp;
        }

        private static partner(dancers: string[], args: string) {
            let [a, b] = args.split('/');
            danceMove.exchange(dancers, [dancers.indexOf(a), dancers.indexOf(b)].join('/'));
        }
    }

    function solve1(numberOfDancers: number, input: string) {
        let transformed = danceMove.danceAThon(numberOfDancers, input);
        let t = danceMove.makeTransformation(transformed);
        return danceMove.applyTransformation(numberOfDancers, t);
    }

    function solve2(numberOfDancers: number, input: string) {
        let transformed = danceMove.danceAThon(numberOfDancers, input);
        let t = danceMove.makeTransformation(transformed);
        let t1 = t;
        console.log('0: abcdefghijklmnop');
        console.log('1: ' + transformed + ' (from steps)');
        console.log('1: ' + danceMove.applyTransformation(numberOfDancers, t1, 1) + ' (from tranformation)');
        
        for (let i = 10; i <= 1000000000; i = i * 10) {
            let result = danceMove.applyTransformation(numberOfDancers, t, 10)
            t = danceMove.makeTransformation(result);
            console.log('' + i + ': ' + danceMove.danceAThon(numberOfDancers, input, i) + ' (steps)');
            console.log('' + i + ': ' + danceMove.applyTransformation(numberOfDancers, t1, i) + ' (transformation)');
            console.log('' + i + ': ' + danceMove.applyTransformation(numberOfDancers, t, 10) + ' (compound transformation)');
        }

        return 'foo';
    }

    let test1 = solve1(5, SAMPLE_PROBLEM);
    let pass1 = test1 === SAMPLE_ANSWER_1;
    console.log(`Part 1 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_1} actual:${test1}`);
    if (pass1) {
        console.log(`Part 1 Answer: ${danceMove.danceAThon(16, BIG_PROBLEM)}`);
        console.log(`Part 2 Answer: ${solve2(16, BIG_PROBLEM)}`);
    }
}
