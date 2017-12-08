namespace Day07 {

    export class Vertex {
        constructor(public name: string, public weight: number, public edgesFrom: Edge[], public fullWeight: number = undefined) { }
        edgesTo: Edge[] = [];
    }

    export class Edge {
        constructor(public v1: string, public v2: string) { }
    }

    export class Graph {

        private _vertices: Map<string, Vertex>;

        constructor(vertices: Vertex[]) {
            // populate the quick lookup map and reverse edge collections. These take part 1's time from ~10s to ~12ms.
            this._vertices = new Map<string, Vertex>(vertices.map(v => [v.name, v] as [string, Vertex]));

            vertices.forEach(vertex => {
                vertex.edgesFrom.forEach(e => {
                    this.getVertex(e.v2).edgesTo.push(e);
                });
            });
        }

        get vertices(): Vertex[] {
            return Array.from(this._vertices.values());
        }

        getVertex(name: string): Vertex {
            return this._vertices.get(name);
        }

        getFullWeightForVertex(vname: string): number {
            let v = this.getVertex(vname);            
            if (v.fullWeight === undefined) {
                v.fullWeight = v.edgesFrom.reduce((acc, edge) => acc + this.getFullWeightForVertex(edge.v2), v.weight);
            }

            return v.fullWeight;            
        }

        isVertexBalanced(vname: string): boolean {
            let weights = this.getVertex(vname).edgesFrom
                .map(e => this.getFullWeightForVertex(e.v2));

            return !weights || weights.every(w => w === weights[0]);
        }
    }
}