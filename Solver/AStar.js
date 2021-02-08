function AStar() {
    if (!start.set || !end.set) {
        alert("Set Start and Finish Points!");
        return;
    }

    toDraw += " astar nodes";

    for (let e of document.getElementsByClassName('pathfindButton')) {
        e.disabled = true;
    }

    var astarNodeCompletion = 0;

    for (let y = 0; y < mazeSize; y++) {
        makeNode(0, y, () => {
            astarNodeCompletion++;
            if (astarNodeCompletion == mazeSize) {
                astarConnectionCompletion = 0;
                for (let z = 0; z < mazeSize; z++) {
                    nodeConnections(z, 0, {}, true, () => {
                        astarConnectionCompletion++;
                        if (astarConnectionCompletion == mazeSize * 2) {
                            toCheck.push({
                                "node": nodes[start.x][start.y],
                                "route": [],
                                "distance": 0
                            });
                            astarLoop();
                        }
                    })
                    nodeConnections(0, z, {}, false, () => {
                        astarConnectionCompletion++;
                        if (astarConnectionCompletion == mazeSize * 2) {
                            toCheck.push({
                                "node": nodes[start.x][start.y],
                                "route": [],
                                "distance": 0
                            });
                            astarLoop();
                        }
                    })
                }
            }
        })
    }
}

function astarCallback(f, d, t) {
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

function astarLoop() {
        let shortest = 0;
        let shortestDistance = Infinity;
        let c = 0;
        for (let instance of toCheck) {
            let d = ((instance.node.x - end.x) ** 2 + (instance.node.y - end.y) ** 2);
            if (d < shortestDistance) {
                shortestDistance = d;
                shortest = c;
            }
            c++;
        }
        let instance = toCheck[shortest];
        toCheck.splice(shortest, 1);
        astarSolve(instance.node, instance.route, instance.distance);

    if (toCheck.length > 0) {
        setTimeout(() => {
            astarLoop();
        }, 50);
    } else {
        alert("This maze can't be solved");
    }
}

function astarSolve(currentNode, route, distance) {
    if (distance + (((currentNode.x - end.x)**2)+((currentNode.y - end.y)**2))**0.5 >= trailLength) {
        astarCallback(false);
        return;
    }
    if (solved) {
        astarCallback(false);
        return;
    }
    if (currentNode.distance < distance) {
        astarCallback(false);
        return;
    }

    for (let r of route) {
        if (r.x == currentNode.x && r.y == currentNode.y) {
            astarCallback(false)
            return;
        }
    }

    let newRoute = [];
    newRoute = JSON.parse(JSON.stringify(route));
    newRoute.push({ "x": currentNode.x, "y": currentNode.y });

    currentNode.distance = distance;
    currentNode.route = newRoute;

    if (currentNode.x == end.x && currentNode.y == end.y) {
        astarCallback(true, distance, currentNode.route);
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