namespace Day20 {

    type Point = { [dimension: string]: number, x: number, y: number, z: number }

    export class Particle {
        constructor(public id:number, public position: Point, public velocity: Point, public acceleration: Point) { }

        tick() {
            for (let d of ['x', 'y', 'z']) {
                this.velocity[d] += this.acceleration[d];
                this.position[d] += this.velocity[d];
            }
        }

        get positionString() {
            return ['x','y','z'].map(d => this.position[d]).join('-');
        }

        get distanceToOrigin() {
            let distance = 0;
            for(let d of ['x','y','z']){
                distance += Math.abs(this.position[d]);
            }
            return distance;
        }

        static fromString(id:number, input: string): Particle {
            let rx = /\w=<[ ]?(-?\d+),([- ]?\d+),([- ]?\d+)>/g;
            let points: Point[] = [];
            for (let i = 0; i < 3; i ++) {
                let data = rx.exec(input);
                points.push({ x: +data[1], y: +data[2], z: +data[3] });
            }
            return new Particle(id, points[0], points[1], points[2]);
        }
    }
}