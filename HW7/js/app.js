
let matrix = [];

let lengthY = 20;
let lengthX = 20;
let classBush = "bush";
let classAnimal = "animal";

matrix[Symbol.iterator] = function() {

    let currentY = 0;
    let ly = lengthY;
    let lx = lengthX;

    return {
        next() {
            if (currentY < ly) {
                matrix.push([]);
                for (let currentX = 0; currentX < lx; currentX++) {
                    let choise = Math.round(-0.6 + Math.random() * 3);
                    if (choise < 0) {
                        matrix[currentY][currentX] = `<span class = ${classBush}></span>`;
                    } else {
                        matrix[currentY][currentX] = `<span></span>`;
                    }
                }
                return {
                    done: false,
                    value: currentY++
                }
            } else {
                return {
                    done: true
                };
            }
        }

    }
};

for (let item of matrix){}

let coorY = 0;
let coorX = 0;

function defineStartCoors(lenY, lenX) {
    let randomX = -0.5 + Math.random() * lenX;
    let randomY = -0.5 + Math.random() * lenY;
    coorX = Math.round(randomX);
    coorY = Math.round(randomY);
    if (matrix[coorY][coorX] == `<span></span>`) {
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
    if ( (tempCoorY == lengthY) || (tempCoorY == -1) || (tempCoorX == lengthX) ||
        (tempCoorX == -1) ) {
        return defineNextCoors();
    }
    if (matrix[tempCoorY][tempCoorX] == `<span></span>`) {
        coorX = tempCoorX;
        coorY = tempCoorY;
        return matrix[coorY][coorX];
    } else {
        return defineNextCoors();
    }
};

function render(){
    matrix[coorY][coorX] = `<span class = ${classAnimal}></span>`;
    let output = ``;
    for (let y = 0; y < lengthY; y++) {
        output += `<div class="row">`;
        for (let x = 0; x < lengthX; x++) {
            output += matrix[y][x];
        }
        output += `</div>`;
    }
    document.body.innerHTML = output;
    matrix[coorY][coorX] = `<span></span>`;
}

defineStartCoors(lengthY, lengthX);

function moveAnimal(){
    defineCoors();
    render();
}

setInterval(moveAnimal, 500);
