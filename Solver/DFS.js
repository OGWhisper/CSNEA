function DFS() {
    if (!start.set || !end.set) {
        alert("Set Start and Finish Points!");
        return;
    }

    toDraw += " DFS";

    for (let e of document.getElementsByClassName('pathfindButton')) {
        e.disabled = true;
    }

    DFSSolve(start.x, start.y, [], (found) => {
        if (!found) alert("Unsolvable");
    })

    solved = false;
}

function DFSSolve(newX, newY, visited, callback) {
    if (solved) return;

    let newVisited = [];
    newVisited = JSON.parse(JSON.stringify(visited));
    newVisited.push({ "x": newX, "y": newY });

    if (newX == end.x && newY == end.y) {
        trail = newVisited;
        solved = true;
        callback(true);
        return;
    }

    if (newX > mazeSize || newY > mazeSize || newX < 0 || newY < 0) {
        callback(false);
        return;
    }

    for (let v of totalVisited) {
        if (v.x == newX && v.y == newY) {
            callback(false);
            return;
        }
    }

    totalVisited.push({ "x": newX, "y": newY });

    try {
        if (schema[newY][newX].toString() == "1") {
            callback(false);
            return;
        }
    } catch {
        callback(false);
        return;
    }

    trail.push({ "x": newX, "y": newY });

    setTimeout(() => {
        DFSSolve(newX, newY + 1, newVisited, (found) => { if (found) { callback(true); } });
        DFSSolve(newX, newY - 1, newVisited, (found) => { if (found) { callback(true); } });
        DFSSolve(newX + 1, newY, newVisited, (found) => { if (found) { callback(true); } });
        DFSSolve(newX - 1, newY, newVisited, (found) => { if (found) { callback(true); } });
    }, 200)

    return false;
}