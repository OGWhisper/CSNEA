let mazeSize = 20;

if (!localStorage.mazes) {
    localStorage.mazes = JSON.stringify(sampleMaze);
} else if (localStorage.mazes == "") {
    localStorage.mazes = JSON.stringify(sampleMaze);
}

let container = document.getElementById('container');

//========
//Maze Create
//========

let newMaze = document.createElement('li');
newMaze.className = "maze";

let newMazeHeader = document.createElement('h2');
newMazeHeader.innerHTML = `Create New`;
newMazeHeader.className = "mazeHeader";

let addButton = document.createElement('div');
addButton.className = "mazeCanvas newMaze";
addButton.addEventListener('click', () => {
    window.location.replace(`./Builder/index.html?id=${new Date().getTime()}`);
})

let editButton = document.createElement('button');
editButton.className = "editButton";
editButton.addEventListener('click', () => {
    window.location.replace(`./Builder/index.html?id=${new Date().getTime()}`);
})
editButton.innerHTML = "Edit";

let solveButton = document.createElement('button');
solveButton.className = "solveButton";
solveButton.style = "opacity: 30%; cursor: default !important;"
solveButton.innerHTML = "Solve";

newMaze.appendChild(newMazeHeader);
newMaze.appendChild(addButton);
newMaze.appendChild(editButton);
newMaze.appendChild(solveButton);
container.appendChild(newMaze);

for (let maze of JSON.parse(localStorage.mazes)) {
    console.log(maze)
    try {
        let mazeElement = document.createElement('li');
        mazeElement.className = "maze";

        let mazeHeader = document.createElement('h2');
        mazeHeader.innerHTML = `Maze: ${parseInt(maze.id, 10).toString(36)}`;
        mazeHeader.className = "mazeHeader";

        let mazeCanvas = document.createElement('canvas');
        mazeCanvas.className = "mazeCanvas";

        mazeCanvas.width = 200;
        mazeCanvas.height = 200;

        let cellSize = 10; //Canvas is 200x200 and maze is 20x20
        let ctx = mazeCanvas.getContext("2d");

        for (let x = 0; x < mazeSize; x++) {
            for (let y = 0; y < mazeSize; y++) {
                if (maze.maze[y][x].toString() == "1") {
                    ctx.fillRect(cellSize * x, cellSize * y, cellSize, cellSize);
                }
            }
        }

        let editButton = document.createElement('button');
        editButton.className = "editButton";
        editButton.addEventListener('click', () => {
            window.location.replace(`./Builder/index.html?id=${maze.id}`);
        })
        editButton.innerHTML = "Edit";

        let solveButton = document.createElement('button');
        solveButton.className = "solveButton";
        solveButton.addEventListener('click', () => {
            window.location.replace(`./Solver/index.html?id=${maze.id}`);
        })
        solveButton.innerHTML = "Solve";

        mazeElement.appendChild(mazeHeader);
        mazeElement.appendChild(mazeCanvas);
        mazeElement.appendChild(editButton);
        mazeElement.appendChild(solveButton);
        container.appendChild(mazeElement);
    }
    catch {

    }
}