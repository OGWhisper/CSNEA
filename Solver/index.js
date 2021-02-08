let WIDTH;
let HEIGHT;

let mazeSize = 20;
let cellSize = 30;

if (!localStorage.mazes) {
    localStorage.mazes = "[]";
}

let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');

let pinkLightest = [255, 200, 200];
let pinkLight = [255, 180, 180];
let pinkDark = [255, 128, 128];

let blueLightest = [200, 200, 255];
let blueLight = [180, 180, 255];
let blueDark = [128, 128, 255];

let toCheck = [];

let routes = [];

var nodes = {};

let topLeftX = 0;
let topLeftY = 0;

let schema = [];
let trail = [];

let start = {
    "x": 0,
    "y": 0,
    "set": false
}

let end = {
    "x": 0,
    "y": 0,
    "set": false
}

for (let maze of JSON.parse(localStorage.mazes)) {
    if (maze.id == id) {
        schema = maze.maze;
        found = true;
    }
}

let totalVisited = [];
let solved = false;

function windowResized() {
    WIDTH = windowWidth;
    HEIGHT = windowHeight;
    resizeCanvas(WIDTH, HEIGHT);
}

function setup() {
    createCanvas(0, 0);
    windowResized();

    angleMode(DEGREES);
}

let toDraw = ["maze"];

let trailLength = Infinity;

function draw() {
    topLeftX = (WIDTH - (mazeSize * cellSize)) / 2;
    topLeftY = (HEIGHT - (mazeSize * cellSize)) / 2;

    if (toDraw.includes("maze")) drawMaze();
    if (toDraw.includes("nodes")) drawNodes();
    if (toDraw.includes("DFS")) drawDFS();
    if (toDraw.includes("dijkstra")) drawDijkstra();
    if (toDraw.includes("astar")) drawAStar();
}