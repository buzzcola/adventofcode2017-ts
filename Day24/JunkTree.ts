namespace Day24 {

    type Component = [number, number];

    // it's a festive pile of old garbage!
    export function MakeJunkTree(input: string) {
        let junk = input.split('\n')
            .map(line => line.split('/'))
            .map(pair => <Component>[Number(pair[0]), Number(pair[1])]);

        let root = new JunkTreeNode([0, 0]);
        let result: JunkTreeNode[] = [];
        buildTree(root, junk, result);
        return result;
    }

    function buildTree(parent: JunkTreeNode, available: Component[], result: JunkTreeNode[]) {
        for (let childComponent of available.filter(j => j.indexOf(parent.availableConnector) != -1)) {
            let child = new JunkTreeNode(childComponent, parent);
            parent.children.push(child);
            let availableToChildren = available.filter(j => j != childComponent);
            buildTree(child, availableToChildren, result);
        }
        result.push(parent);
    }

    export class JunkTreeNode {

        constructor(public component: Component, public parent: JunkTreeNode = undefined) { }
        children: JunkTreeNode[] = [];

        get availableConnector(): number {
            if (this.isRoot) return 0;
            return this.parent.availableConnector == this.component[0] ? this.component[1] : this.component[0];
        }

        get strength(): number {
            return this.component[0] + this.component[1] + (this.isRoot ? 0 : this.parent.strength);
        }

        get height(): number {
            return this.isRoot ? 0 : this.parent.height + 1;
        }

        get isRoot() { return !this.parent; }
        get isLeaf() { return !this.children.length; }
    }
}