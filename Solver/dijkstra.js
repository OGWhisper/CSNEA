function dijkstra() {
    if (!start.set || !end.set) {
        alert("Set Start and Finish Points!");
        return;
    }

    toDraw += " dijkstra nodes";

    for (let e of document.getElementsByClassName('pathfindButton')) {
        e.disabled = true;
    }

    var dijkstraNodeCompletion = 0;

    for (let y = 0; y < mazeSize; y++) {
        makeNode(0, y, () => {
            dijkstraNodeCompletion++;
            if (dijkstraNodeCompletion == mazeSize) {
                dijkstraConnectionCompletion = 0;
                for (let z = 0; z < mazeSize; z++) {
                    nodeConnections(z, 0, {}, true, () => {
                        dijkstraConnectionCompletion++;
                        if (dijkstraConnectionCompletion == mazeSize * 2) {
                            toCheck.push({
                                "node": nodes[start.x][start.y],
                                "route": [],
                                "distance": 0
                            });
                            dijkstraLoop();
                        }
                    })
                    nodeConnections(0, z, {}, false, () => {
                        dijkstraConnectionCompletion++;
                        if (dijkstraConnectionCompletion == mazeSize * 2) {
                            toCheck.push({
                                "node": nodes[start.x][start.y],
                                "route": [],
                                "distance": 0
                            });
                            dijkstraLoop();
                        }
                    })
                }
            }
        })
    }
}

function dijkstraCallback(f, d, t) {
    if (f) {
        if (d < trailLength) {
            trailLength = d;
            trail = t;
        }
        if (toCheck.length == 0) {
            solved = true;
        }
    }
}

function dijkstraLoop() {
        let shortest = 0;
        let shortestDistance = Infinity;
        for (let instance of toCheck) {
            if (instance.distance < shortestDistance) {
                shortestDistance = instance;
                shortest = toCheck.indexOf(instance);
            }
        }
        let instance = toCheck[shortest];
        toCheck.splice(shortest, 1);
        dijkstraSolve(instance.node, instance.route, instance.distance);

    if (toCheck.length > 0) {
        setTimeout(() => {
            dijkstraLoop();
        }, 50);
    }
}

function dijkstraSolve(currentNode, route, distance) {
    if (distance >= trailLength) {
        dijkstraCallback(false);
        return;
    }
    if (solved) {
        dijkstraCallback(false);
        return;
    }
    if (currentNode.distance < distance) {
        dijkstraCallback(false);
        return;
    }

    for (let r of route) {
        if (r.x == currentNode.x && r.y == currentNode.y) {
            dijkstraCallback(false)
            return;
        }
    }

    let newRoute = [];
    newRoute = JSON.parse(JSON.stringify(route));
    newRoute.push({ "x": currentNode.x, "y": currentNode.y });

    currentNode.distance = distance;
    currentNode.route = newRoute;

    if (currentNode.x == end.x && currentNode.y == end.y) {
        dijkstraCallback(true, distance, currentNode.route);
        return;
    }

    routes.push(newRoute, distance);

    currentNode.distance = distance;
    currentNode.route = newRoute;

    for (let connection of currentNode.connections) {
        for(let c of toCheck) {
            if(c.node.x == connection.x && c.node.y == connection.y) {
                toCheck.splice(toCheck.indexOf(c), 1);
            }
        }

        toCheck.push({
            "node": nodes[connection.x][connection.y],
            "route": newRoute,
            "distance": distance + connection.distance
        });
    }
}