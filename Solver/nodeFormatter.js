function nodeConnections(x, y, former, vertical, callback) {
    let found = false;

    for (let column of Object.keys(nodes)) {
        for (let cell of (Object.keys(nodes[column]))) {
            if (column.toString() == x.toString() && cell.toString() == y.toString()) {
                found = true;
            }
        }
    }

    if (found) {
        if ([y.toString()]) {
            let temp = {
                "x": x.toString(),
                "y": y.toString()
            };

            if (Object.keys(former).length > 0) {
                temp.distance = Math.abs(former.x - parseInt(x)) + Math.abs(former.y - parseInt(y));
                former.distance = Math.abs(parseInt(x)) + Math.abs(parseInt(y));
                nodes[former.x][former.y].connections.push(temp);
                nodes[x.toString()][y.toString()].connections.push(former);
            }

            former = temp;
        }
    }
    if (schema[y][x].toString() == "1") former = {};

    if (vertical) {
        y++;
        if (y == mazeSize) {
            callback();
            return;
        }
    } else {
        x++;
        if (x == mazeSize) {
            callback();
            return;
        }
    }

    setTimeout(() => {
        nodeConnections(x, y, former, vertical, callback);
    }, 50)
}

function makeNode(x, y, callback) {
    if (schema[y][x].toString() == "0") {

        let rawNeighbours = [];

        if (x > 0) rawNeighbours.push({ "x": x - 1, "y": y });
        if (y > 0) rawNeighbours.push({ "x": x, "y": y - 1 });
        if (x < mazeSize - 1) rawNeighbours.push({ "x": x + 1, "y": y });
        if (y < mazeSize - 1) rawNeighbours.push({ "x": x, "y": y + 1 });

        let neighbours = [];

        for (let neighbour of rawNeighbours) {
            if (schema[neighbour.y][neighbour.x].toString() == "0") {
                neighbours.push(neighbour);
            }
        }

        let isNode = (neighbours.length != 2);

        if (!isNode) {
            let xAverage = neighbours[0].x + neighbours[1].x;
            let yAverage = neighbours[0].y + neighbours[1].y;

            xAverage /= 2;
            yAverage /= 2;

            if (xAverage != x && yAverage != y) {
                isNode = true;
            }
        }

        if ((x == start.x && y == start.y) || (x == end.x && y == end.y)) isNode = true;

        if (isNode) {
            if (!nodes[x.toString()]) nodes[x.toString()] = {};
            nodes[x.toString()][y.toString()] = { "x": x.toString(), "y": y.toString(), "distance": Infinity, "connections": [], "route": [] }
        }
    }

    x++;

    if (x == mazeSize) {
        callback();
    } else {
        setTimeout(() => {
            makeNode(x, y, callback);
        }, 50)
    }
}