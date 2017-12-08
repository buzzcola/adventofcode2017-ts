/// <reference path="input.ts" />
/// <reference path="graphing.ts" />

namespace Day07 {

    function solve1(input: string) {
        let g = makeGraphFromString(input);
        return g.vertices.filter(v => v.edgesTo.length == 0)[0].name;
    }

    function solve2(input: string): number {
        let g = makeGraphFromString(input);
        // there are multiple "unbalanced" vertices, but we want the only one where each of its children *is* balanced.
        let unbalanced = g.vertices.filter(v => !g.isVertexBalanced(v.name) && v.edgesFrom.every(e => g.isVertexBalanced(e.v2)))[0];
        let children = unbalanced.edgesFrom.map(e => g.getVertex(e.v2));
        let problemChild = oneOfTheseThingsIsNotLiketheOthers(g, children);
        let sibling = children.filter(v => v != problemChild)[0];
        let delta = g.getFullWeightForVertex(sibling.name) - g.getFullWeightForVertex(problemChild.name);
        return problemChild.weight + delta;
    }

    function oneOfTheseThingsIsNotLiketheOthers(graph: Graph, input: Vertex[]): Vertex {
        // given a vertex array of length >= 3 where all elements have the same full weight 
        // but one, return the one. There has to be a simpler way to do this :(
        let vertices = [...input];
        let weights = new Map<number, number>();
        let i = 0;
        
        do {            
            let fullWeight = graph.getFullWeightForVertex(vertices.pop().name);
            weights.set(fullWeight, (weights.get(fullWeight) || 0) + 1);
            i++;
        } while(i < 3 || weights.size < 2)

        let oddWeight = [...weights.entries()].filter(e => e[1] === 1)[0];
        return input.filter(v => graph.getFullWeightForVertex(v.name) === oddWeight[0])[0];
    }

    function makeGraphFromString(input: string) {
        return new Graph(input.split('\n').map(s => makeVertexFromString(s)));
    }

    function makeVertexFromString(s: string): Vertex {
        let data = /^(\w+) \((\d+)\)(?:\s->\s)?([\w\W]+)?/.exec(s);
        let name = data[1];
        let weight = +data[2];
        let edges = data[3] ? data[3].split(', ').map(childName => new Edge(name, childName)) : [];
        return new Vertex(name, weight, edges);
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