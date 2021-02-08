function drawDijkstra() {
    if (trail.length > 0) {
        for (let q = 1; q < trail.length; q++) {
            stroke(0);
            strokeWeight(cellSize / 4);
            let x1 = topLeftX + (trail[q - 1].x * cellSize) + (cellSize / 2);
            let y1 = topLeftY + (trail[q - 1].y * cellSize) + (cellSize / 2);
            let x2 = topLeftX + (trail[q].x * cellSize) + (cellSize / 2);
            let y2 = topLeftY + (trail[q].y * cellSize) + (cellSize / 2);
            line(x1, y1, x2, y2);
        }
    }
}