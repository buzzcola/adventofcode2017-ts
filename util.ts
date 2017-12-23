function range(size: number): number[] {
    return [...Array(size).keys()]
}

type Point2 = { [dimension: string]: number, x: number, y: number };
function range2(size1: number, size2: number = undefined): Point2[] {
    let result: Point2[] = [];
    for (let i of [...Array(size1).keys()]) {
        for (let j of [...Array(size2 || size1).keys()]) {
            result.push({ x: i, y: j });
        }
    }
    return result;
}

type Point3 = { [dimension: string]: number, x: number, y: number, z: number }
function range3(size1: number, size2: number = undefined, size3: number = undefined): Point2[] {
    let result: Point2[] = [];
    for (let i of range(size1)) {
        for (let j of range(size2 || size1)) {
            for (let k of range(size3 || size1)) {
                result.push({ x: i, y: j, z: k });
            }
        }
    }
    return result;
}