/// <reference path="Particle.ts" />
/// <reference path="input.ts" />
/// <reference path="../util.ts" />

namespace Day20 {

    function solve1(input: string) {
        const totallyArbitraryNumber = 500;
        let particles = input.split('\n').map((line, i) => Particle.fromString(i, line));
        for (let _ of range(totallyArbitraryNumber)) {
            particles.forEach(p => p.tick());
        }
        return particles.reduce((id, p) => p.distanceToOrigin < particles[id].distanceToOrigin ? p.id : id, 0);
    }

    function solve2(input: string) {
        const totallyArbitraryNumber = 50;
        let particles = input.split('\n').map((line, i) => Particle.fromString(i, line));

        for (let _ of range(totallyArbitraryNumber)) {
            
            // use a hash to count collisions by position.
            let positions: { [name: string]: number[] } = {};
            for (let p of particles) {
                if (!positions.hasOwnProperty(p.positionString)) {
                    positions[p.positionString] = [p.id];
                } else {
                    positions[p.positionString].push(p.id);
                }
            }

            // remove collided particles.
            for (let prop in positions) {
                if (positions[prop].length > 1) {
                    for (let id of positions[prop]) {
                        let particle = particles.filter(p => p.id === id)[0];
                        particles.splice(particles.indexOf(particle), 1);
                    }
                }
            }

            particles.forEach(p => p.tick());
        }

        return particles.length;
    }

    let test1 = solve1(SAMPLE_PROBLEM_1);
    let pass1 = test1 === SAMPLE_ANSWER_1;
    console.log(`Part 1 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_1} actual:${test1}`);
    if (pass1) {
        console.log(`Part 1 Answer: ${solve1(BIG_PROBLEM)}`);
    }

    let test2 = solve2(SAMPLE_PROBLEM_2);
    let pass2 = test2 === SAMPLE_ANSWER_2;
    console.log(`Part 2 Test -  ${pass2 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_2} actual:${test2}`);
    if (pass2) {
        console.log(`Part 2 Answer: ${solve2(BIG_PROBLEM)}`);
    }
}