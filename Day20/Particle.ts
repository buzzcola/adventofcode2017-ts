/// <reference path="../util.ts" />

namespace Day20 {
    
    const dimensions = ['x', 'y', 'z'];

    export class Particle {
        constructor(public id: number, public position: Point3, public velocity: Point3, public acceleration: Point3) { }

        tick() {
            for (let d of dimensions) {
                this.velocity[d] += this.acceleration[d];
                this.position[d] += this.velocity[d];
            }
        }

        get positionString() {
            return dimensions.map(d => this.position[d]).join('-');
        }

        get distanceToOrigin() {
            return dimensions.reduce((a, d) => a + Math.abs(this.position[d]));
        }

        static fromString(id: number, input: string): Particle {
            let rx = /\w=<[ ]?(-?\d+),([- ]?\d+),([- ]?\d+)>/g;
            let points = range(3)
                .map(_ => rx.exec(input))
                .map(d => ({x: +d[1], y:+d[2], z:+d[3]}));

            return new Particle(id, points[0], points[1], points[2]);
        }
    }
}