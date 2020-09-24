import { Vec2 } from "three";

export interface PathNode {
    position: Vec2;
    cameFrom?: PathNode;
    walkable: boolean;
}

export class PathFinder {
    private _visited: Array<PathNode> = [];
    private _frontire: Array<PathNode> = [];

    private readonly _nodes: Array<PathNode>;

    constructor(nodes: Array<PathNode>) {
        this._nodes = nodes;
    }

    public getPath = (startPosition: Vec2, position: Vec2) => {
        let path: PathNode[] = [];

        const target = this.getNodeByPosition(position);
        const start = this.getNodeByPosition(startPosition);

        this._frontire = start ? [start] : [];
        this._visited = start ? [start] : [];

        let pathFound = false;

        let iterationCount = 0;
        while(!pathFound) {
            iterationCount++;

            if(iterationCount > 5000) {
                console.error('Iterations limit exceded :(');
                break;
            }
            
            const nodesToIterate = this._frontire;

            this._frontire = [];

            nodesToIterate.forEach((node) => {
                if(node !== target) {
                    const neighbours = this.getNodeNeighbours(node)
                        .filter((item) => !this._visited.includes(item))
                        .filter((item) => !this._frontire.includes(item));

                    neighbours.forEach((item) => item.cameFrom = node);

                    this._visited.push(node);

                    this._frontire.push(...neighbours
                        .filter((item) => !this._visited.includes(item))
                        .filter(({walkable}) => walkable));
                } else {
                    pathFound = true;

                    try {
                        path = this.collectPath(node, [node]);
                    } catch {
                        console.error('Looped path');
                    }
                }
            });
        }

        console.info('Composed path:', path);
        return path.reverse();
    }

    private collectPath = (node: PathNode, collection: PathNode[]) => {
        const {cameFrom} = node;

        if(cameFrom) {
            collection.push(cameFrom);
            this.collectPath(cameFrom, collection);
        }

        return collection;
    }

    public getNodeNeighbours = (node?: PathNode): Array<PathNode> => {
        if (!node) {
            return [];
        }

        const {x, y} = node.position;
        const top: Vec2 = {x: x + 1, y};
        const bottom: Vec2 = {x: x - 1, y};
        const left: Vec2 = {x, y: y - 1};
        const right: Vec2 = {x, y: y + 1};

        return [top, bottom, left, right]
            .map((item) => this.getNodeByPosition(item))
            .filter((item) => item !== undefined) as Array<PathNode>;
    }

    public getNodeByPosition = ({x, y}: Vec2) => {
        return this._nodes.find(({position}) => position.x === x && position.y === y);
    }
}