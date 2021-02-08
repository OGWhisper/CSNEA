function drawNodes() {
    for (let column of Object.keys(nodes)) {
        fill(128, 128, 0);
        for (let cell of Object.keys(nodes[column])) {
            for (let connection of nodes[column][cell].connections) {
                strokeWeight(cellSize / 4);
                let x1 = topLeftX + (column * cellSize) + (cellSize / 2);
                let y1 = topLeftY + (cell * cellSize) + (cellSize / 2);
                let x2 = topLeftX + (connection.x * cellSize) + (cellSize / 2);
                let y2 = topLeftY + (connection.y * cellSize) + (cellSize / 2);
                stroke(128, 128, 0);
                line(x1, y1, x2, y2);
            }
            noStroke();
            ellipse(topLeftX + (parseInt(column) * cellSize) + (cellSize / 2), topLeftY + (parseInt(cell) * cellSize) + (cellSize / 2), cellSize / 2, cellSize / 2);
        }
        for (let route of routes) {
            for (let q = 1; q < route.length; q++) {
                strokeWeight(cellSize / 4);
                let x1 = topLeftX + (route[q - 1].x * cellSize) + (cellSize / 2);
                let y1 = topLeftY + (route[q - 1].y * cellSize) + (cellSize / 2);
                let x2 = topLeftX + (route[q].x * cellSize) + (cellSize / 2);
                let y2 = topLeftY + (route[q].y * cellSize) + (cellSize / 2);
                stroke(0, 128, 0);
                line(x1, y1, x2, y2);
            }
        }
    }

    for (let c of toCheck) {
        noStroke();
        fill(pinkLightest);
        ellipse(topLeftX + (parseInt(c.node.x) * cellSize) + (cellSize / 2), topLeftY + (parseInt(c.node.y) * cellSize) + (cellSize / 2), cellSize / 2, cellSize / 2);
    }

    routes = [];
}