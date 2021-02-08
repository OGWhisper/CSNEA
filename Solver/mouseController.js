function mouseClicked() {
    let z = false;
    [
        mouseX <= topLeftX,
        mouseX >= topLeftX + (mazeSize * cellSize),
        mouseY <= topLeftY,
        mouseY >= topLeftY + (mazeSize * cellSize)
    ].forEach((v) => {
        if (v) z = true;
    })

    if (!z) {
        let Y = Math.floor((mouseY - topLeftY) / cellSize);
        let X = Math.floor((mouseX - topLeftX) / cellSize);

        if (schema[Y][X] == 0) {
            if (!start.set) {
                start.x = X;
                start.y = Y;
                start.set = true;
            } else if (!end.set) {
                if (start.x == X && start.y == Y) {
                    return;
                }
                end.x = X;
                end.y = Y;
                end.set = true;
            }
        }
    }
}