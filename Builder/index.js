let WIDTH;
let HEIGHT;

let prompted = false;

let mazeSize = 20;
let cellSize = 30;

if (!localStorage.mazes) {
    localStorage.mazes = "[]";
}

let schema = [];

let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');

let pinkLightest = [255, 200, 200];
let pinkLight = [255, 180, 180];
let pinkDark = [255, 128, 128];

let blueLightest = [200, 200, 255];
let blueLight = [180, 180, 255];
let blueDark = [128, 128, 255];

let topLeftX = 0;
let topLeftY = 0;

let found = false;

for (let maze of JSON.parse(localStorage.mazes)) {
    if (maze.id == id) {
        schema = maze.maze;
        found = true;
    }
}

if (!found) {
    for (let row = 0; row < mazeSize; row++) {
        let r = [];
        for (let cell = 0; cell < mazeSize; cell++) {
            r.push(0);
        }
        schema.push(r);
    }
}

function windowResized() {
    WIDTH = windowWidth;
    HEIGHT = windowHeight;
    resizeCanvas(WIDTH, HEIGHT);
}

function setup() {
    createCanvas(0, 0);
    windowResized();
}

function draw() {
    background(pinkLightest);


    fill(pinkLight);
    stroke(pinkLightest);
    strokeWeight(1);

    topLeftX = (WIDTH - (mazeSize * cellSize)) / 2;
    topLeftY = (HEIGHT - (mazeSize * cellSize)) / 2;

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

            if (!z) fill(blueLight);
            if (schema[y][x] == 1) fill(pinkDark);
            rect(topLeftX + (x * cellSize), topLeftY + (y * cellSize), cellSize, cellSize);
            if (!z) fill(pinkLight);
            if (schema[y][x] == 1) fill(pinkLight);
        }
    }
}

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
        schema[Math.floor((mouseY - topLeftY) / cellSize)][Math.floor((mouseX - topLeftX) / cellSize)] = 1 - schema[Math.floor((mouseY - topLeftY) / cellSize)][Math.floor((mouseX - topLeftX) / cellSize)];
    }
}

function saveSchema() {
    let str = "";
    for (let row of schema) {
        for (let cell of row) {
            str += cell.toString();
        }
    }

    if (!str.includes("1")) {
        alert("Must Change Maze!");
        return;
    }

    let mazes = JSON.parse(localStorage.mazes);

    for(let maze of mazes) {
        if(maze.id.toString() == id.toString()) {
            mazes.splice(mazes.indexOf(maze), 1);
        }
    }

    mazes.push({
        "id": id.toString(),
        "maze": schema
    })
    
    localStorage.mazes = JSON.stringify(mazes);
}