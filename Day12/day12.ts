/// <reference path="graphing.ts" />
/// <reference path="input.ts" />

namespace Day12 {

    function solve1(input: string): number {
        let g = getGraphFromInput(input);
        let v_start = g.getVertex('0');
        let visited = new Set<string>();
        crawl(v_start, g, visited);
        return visited.size;
    }

    function solve2(input: string): number {
        let g = getGraphFromInput(input);
        let visited = new Set<string>();

        let groups = 0;
        while(visited.size != g.vertices.length) {
            let v = g.vertices.filter(v => !visited.has(v.name))[0];
            groups++;
            crawl(v, g, visited);
        }

        return groups;
    }

    function crawl(v:Vertex, g:Graph, visited:Set<string>){
        if (visited.has(v.name)) return;
        visited.add(v.name);
        v.edgesFrom.forEach(e => crawl(g.getVertex(e.v2), g, visited));
    }

    function getGraphFromInput(input: string): Graph {
        let vertices = input.split('\n')
            .map(line => line.split(' <-> '))
            .map(x => ({ vname: x[0], edgesTo: x[1].split(', ') }))
            .map(x => new Vertex(
                x.vname,
                x.edgesTo.map(to => new Edge(x.vname, to))
            ));

        return new Graph(vertices);
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