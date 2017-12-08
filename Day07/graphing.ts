namespace Day07 {

    export class Vertex {
        constructor(public name: string, public weight: number, public edges: Edge[], public fullWeight: number = undefined) { }
    }

    export class Edge {
        constructor(public v1: string, public v2: string) { }
    }

    export class Graph {

        private _vertices: Map<string, Vertex>;
        private _edgesToVertices: Map<string, Edge[]>;

        constructor(vertices: Vertex[]) {
            // populate the quick lookup maps. These take part 1's time from ~10s to ~12ms.
            this._vertices = new Map<string, Vertex>(vertices.map(v => [v.name, v] as [string, Vertex]));
            this._edgesToVertices = new Map<string, Edge[]>(vertices.map(v => [v.name, []] as [string, Edge[]]));

            vertices.forEach(vertex => {
                vertex.edges.forEach(e => {
                    this._edgesToVertices.get(e.v2).push(e);
                });
            });
        }

        get vertices(): Vertex[] {
            return Array.from(this._vertices.values());
        }

        getVertex(name: string): Vertex {
            return this._vertices.get(name);
        }

        edgesToVertex(name: string): Edge[] {
            return [...this._edgesToVertices.get(name)];
        }

        edgesFromVertex(name: string): Edge[] {
            let vertex = this._vertices.get(name);
            return [...vertex.edges];
        }

        getFullWeightForVertex(vname: string): number {
            let v = this.getVertex(vname);            
            if (v.fullWeight === undefined) {
                v.fullWeight = v.edges.reduce((acc, edge) => acc + this.getFullWeightForVertex(edge.v2), v.weight);
            }

            return v.fullWeight;            
        }

        isVertexBalanced(vname: string): boolean {
            let weights = this.getVertex(vname).edges
                .map(e => this.getFullWeightForVertex(e.v2));

            return !weights || weights.every(w => w === weights[0]);
        }
    }
}