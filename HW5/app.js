const matrix = [
    ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','*','.','.','.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','*','*','*','*','*','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.','.','.','.','.','*','.','.','.'],
    ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
    ['.','.','.','*','.','.','.','.','.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','*','.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','*','.','.','.','.','.','.','.','*','.','.'],
    ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.']
];
let lengthY = matrix.length;
let lengthX = matrix[0].length;
let coorY = 0;
let coorX = 0;

function defineStartCoors(lenY, lenX) {
    let randomX = -0.5 + Math.random() * lenX;
    let randomY = -0.5 + Math.random() * lenY;
    coorX = Math.round(randomX);
    coorY = Math.round(randomY);
    if (matrix[coorY][coorX] == ".") {
        return matrix[coorY][coorX];
    } else {
        defineStartCoors(lenY, lenX);
    }
}

let defineCoors = function defineNextCoors() {
    let randomX = Math.round(- 1.5 + Math.random() * 3);
    let randomY = Math.round(- 1.5 + Math.random() * 3);
    if ((randomY == 0 || randomY == -0) && (randomX == 0 || randomX == -0)) {
        return defineNextCoors();
    }
    let tempCoorX = coorX + randomX;
    let tempCoorY = coorY + randomY;
    if ( (tempCoorY == matrix.length) || (tempCoorY == -1) || (tempCoorX == matrix[0].length) ||
        (tempCoorX == -1) ) {
        return defineNextCoors();
    }
    if (matrix[tempCoorY][tempCoorX] == ".") {
        coorX = tempCoorX;
        coorY = tempCoorY;
        return matrix[coorY][coorX];
    } else {
        return defineNextCoors();
    }
}

function render(){
    matrix[coorY][coorX] = "@";
    let outPut = "";
    for (let i = 0; i < lengthY; i++) {
        for (let j = 0; j < lengthX; j++) {
            outPut += matrix[i][j] + "  ";
        }
        outPut += "\n";
    }
    console.log(outPut);
    matrix[coorY][coorX] = ".";
}

defineStartCoors(lengthY, lengthX);

function moveAnimal(){
    defineCoors();
    render();
}

setInterval(moveAnimal, 500);
