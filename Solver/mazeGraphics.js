function drawMaze() {
    background(blueLightest);

    fill(blueLight);
    stroke(blueLightest);
    strokeWeight(1);

    let z = false;
    [
        mouseX <= topLeftX,
        mouseX >= topLeftX + (mazeSize * cellSize),
        mouseY <= topLeftY,
        mouseY >= topLeftY + (mazeSize * cellSize)
    ].forEach((v) => {
        if (v) z = true;
    })

    if (z) {
        document.getElementsByTagName('body')[0].style = "cursor: default;";
    } else {
        document.getElementsByTagName('body')[0].style = "cursor: pointer;";
    }

    for (let x = 0; x < mazeSize; x++) {
        for (let y = 0; y < mazeSize; y++) {
            let z = false;
            [
                mouseX <= topLeftX + (x * cellSize),
                mouseX >= topLeftX + ((x + 1) * cellSize),
                mouseY <= topLeftY + (y * cellSize),
                mouseY >= topLeftY + ((y + 1) * cellSize)
            ].forEach((v) => {
                if (v) z = true;
            })

            if (!z) fill(pinkLight);
            if (schema[y][x] == 1) fill(blueDark);
            rect(topLeftX + (x * cellSize), topLeftY + (y * cellSize), cellSize, cellSize);
            if (!z) fill(blueLight);
            if (schema[y][x] == 1) fill(blueLight);
        }
    }

    if (start.set) {
        fill(255, 223, 0);
        rect(topLeftX + (start.x * cellSize), topLeftY + (start.y * cellSize), cellSize, cellSize);
    }

    if (end.set) {
        fill(255, 223, 0);
        rect(topLeftX + (end.x * cellSize), topLeftY + (end.y * cellSize), cellSize, cellSize);
    }
}