const time = 1000;

const matrix = [];
let output = ``;

const lengthY = 20;
const lengthX = 20;

const quantityTree = 9;
const quantityBush = 9;

let posDeerY = 0;
let posDeerX = 0;
let posMouseY = 0;
let posMouseX = 0;

for (let i = 0; i < lengthY; i++) {
    matrix.push([]);
    for (let j = 0; j < lengthX; j++) {
        matrix[i][j] = `<div></div>`
    }
}

for (let y of matrix) {
    for (let x of y) {
        output += x;
    }
}

let wdiv = document.createElement("div");
wdiv.classList.add("wrapper");
wdiv.id = "wrap";
document.body.appendChild(wdiv);
wdiv.innerHTML = output;
let wrap = document.getElementById("wrap");

//*******************************   DEER   ***********************
class Deer {
    constructor(){
        this.health = 100;
        this.satiety = 100;
    }
    move() {
        let randomX = Math.round(- 1.5 + Math.random() * 3);
        let randomY = Math.round(- 1.5 + Math.random() * 3);
        if ((randomY == 0 || randomY == -0) && (randomX == 0 || randomX == -0)) {
            return this.move();
        }
        let tempCoorX = posDeerX + randomX;
        let tempCoorY = posDeerY + randomY;
        if ( (tempCoorY == lengthY) || (tempCoorY == -1) || (tempCoorX == lengthX) ||
            (tempCoorX == -1) ) {
            return this.move();
        }
        let posDeer = posDeerY * lengthX + posDeerX;
        let tempPosDeer = tempCoorY * lengthX + tempCoorX;
        let elemClass = wrap.children[tempPosDeer].className;
        if (!elemClass) {
            wrap.children[posDeer].classList.remove("deer");
            posDeerY = tempCoorY;
            posDeerX = tempCoorX;
            posDeer = posDeerY * lengthX + posDeerX;
            wrap.children[posDeer].className = "deer";
            if (this.satiety > 0) {
                this.satiety -= 5;
            } else {
                this.health -= 10;
            }
            if (this.health <= 0) {
                this.die(posDeer);
            }
        } else if (((elemClass === "tree2") || (elemClass === "bush2") || (elemClass === "fruit")) && (this.satiety !== 100)){
            return this.eat(tempPosDeer, elemClass, posDeer);
        } else {
            return this.move();
        }
    }
    eat(tempPosDeer, elemClass, posDeer) {
        let tempMove = this.move;
        this.move = function() {
            wrap.children[posDeer].className = "deer";
        };
        let self = this;
        if (elemClass === "tree2") {
            if (!(this.satiety > 0)) {
                this.health += 30;
            } else {
                this.satiety += 30;
            }
            let prom = new Promise (function(resolve) {
                setTimeout( function(){
                    wrap.children[tempPosDeer].classList.remove(elemClass);
                    elemClass = elemClass.slice(0, -1) + 3;
                    wrap.children[tempPosDeer].classList.add(elemClass);
                    self.move = tempMove;
                    resolve("result");
                }, 3 * time);
            });
            prom.then(
                function(result) {
                    setTimeout(() => {
                        wrap.children[tempPosDeer].classList.remove(elemClass);
                        return "result"}, time
                    );
                }
            );
        } else if (elemClass === "bush2") {
            setTimeout(function(){
                self.move = tempMove;
                wrap.children[tempPosDeer].classList.remove(elemClass);
            }, 2 * time);
            if (!(this.satiety > 0)) {
                this.health += 20;
            } else {
                this.satiety += 20;
            }
        } else {
            setTimeout(function(){
                self.move = tempMove;
                wrap.children[tempPosDeer].classList.remove(elemClass);
            }, time);
            if (!(this.satiety > 0)) {
                this.health += 20;
            } else {
                this.satiety += 20;
            }
        }
        if (this.satiety > 100) {
            this.satiety = 100;
        }
        if (this.health > 100) {
            this.satiety = this.health - 100;
            this.health = 100;
        }
    }

    die(posDeer) {
        this.move = function(){
            let info = document.getElementById("infoD");
            info.classList.remove("notVis");
        };
        wrap.children[posDeer].classList.remove("deer");
        wrap.children[posDeer].classList.add("deadDeer");
        let prom = new Promise(function (resolve) {
            setTimeout(() => resolve(posDeer), 3 * time);
        });
        prom.then(
            function (posDeer) {
                wrap.children[posDeer].classList.remove("deadDeer");
            }
        )

    }
}

// ************************************   MOUSE   ************************
class Mouse {
    constructor(){
        this.health = 100;
        this.satiety = 100;
    }
    move() {
        let randomX = Math.round(- 1.5 + Math.random() * 3);
        let randomY = Math.round(- 1.5 + Math.random() * 3);
        if ((randomY == 0 || randomY == -0) && (randomX == 0 || randomX == -0)) {
            return this.move();
        }
        let tempCoorX = posMouseX + randomX;
        let tempCoorY = posMouseY + randomY;
        if ( (tempCoorY == lengthY) || (tempCoorY == -1) || (tempCoorX == lengthX) ||
            (tempCoorX == -1) ) {
            return this.move();
        }
        let posMouse = posMouseY * lengthX + posMouseX;
        let tempPosMouse = tempCoorY * lengthX + tempCoorX;
        let elemClass = wrap.children[tempPosMouse].className;
        if (!elemClass) {
            wrap.children[posMouse].classList.remove("mouse");
            posMouseY = tempCoorY;
            posMouseX = tempCoorX;
            posMouse = posMouseY * lengthX + posMouseX;
            wrap.children[posMouse].className = "mouse";
            if (this.satiety > 0) {
                this.satiety -= 5;
            } else {
                this.health -= 10;
            }
            if (this.health <= 0) {
                this.die(posMouse);
            }
        } else if (((elemClass === "fruit") || (elemClass === "berry")) && (this.satiety !== 100)){
            return this.eat(tempPosMouse, elemClass, posMouse);
        } else {
            return this.move();
        }
    }
    eat(tempPosMouse, elemClass, posMouse) {
        let tempMove = this.move;
        this.move = function() {
            wrap.children[posMouse].className = "mouse";
        };
        let self = this;
        if (elemClass === "fruit") {
            setTimeout(function(){
                self.move = tempMove;
                wrap.children[tempPosMouse].classList.remove(elemClass);
            }, 6 * time);
            if (!(this.satiety > 0)) {
                this.health += 60;
            } else {
                this.satiety += 60;
            }
        } else {
            setTimeout(function(){
                self.move = tempMove;
                wrap.children[tempPosMouse].classList.remove(elemClass);
            }, 4 * time);
            if (!(this.satiety > 0)) {
                this.health += 50;
            } else {
                this.satiety += 50;
            }
        }
        if (this.satiety > 100) {
            this.satiety = 100;
        }
        if (this.health > 100) {
            this.satiety = this.health - 100;
            this.health = 100;
        }

    }
    die(posMouse) {
        this.move = function(){
            let info = document.getElementById("infoM");
            info.classList.remove("notVis");
        };
        wrap.children[posMouse].classList.remove("mouse");
        wrap.children[posMouse].classList.add("deadMouse");
        let prom = new Promise(function (resolve) {
            setTimeout(() => resolve(posMouse), 3 * time);
        });
        prom.then(
            function (posMouse) {
                wrap.children[posMouse].classList.remove("deadMouse");
            }
        )

    }
}

// *****************************************   BUSH   **************************
function definePosBush() {
    let posBushY = Math.round(-0.5 + Math.random() * lengthY);
    let posBushX = Math.round(-0.5 + Math.random() * lengthX);
    let posBush = posBushY * lengthX + posBushX;
    let elemClass = wrap.children[posBush].className;
    if (!elemClass) {
        wrap.children[posBush].className = "bush";
        function promise() {
            let prom = new Promise(function (resolve) {
                setTimeout(() => resolve("result"), 2 * time);
            });
            prom.then(
                function (result) {
                    wrap.children[posBush].className = "bush2";
                    return new Promise(function (resolve) {
                        setTimeout(() => resolve("result"), 4 * time);
                    })
                }
            ).then(
                function () {
                    function appearBerry(){
                        let randomX = Math.round(- 1.5 + Math.random() * 3);
                        let randomY = Math.round(- 1.5 + Math.random() * 3);
                        if ((randomY == 0 || randomY == -0) && (randomX == 0 || randomX == -0)) {
                            appearBerry();
                        }
                        let tempCoorX = posBushX + randomX;
                        let tempCoorY = posBushY + randomY;
                        let tempPosBerry = tempCoorY * lengthX + tempCoorX;
                        let elemClass = wrap.children[tempPosBerry].className;

                        if ( (tempCoorY == lengthY) || (tempCoorY == -1) || (tempCoorX == lengthX) ||
                            (tempCoorX == -1) || (elemClass)) {
                            throw new Error();
                         } else {
                            posBush = tempPosBerry;
                            posBushY = tempCoorY;
                            posBushX = tempCoorX;
                            wrap.children[posBush].className = "berry";
                        }
                    }
                    appearBerry();
                    return new Promise(function (resolve) {
                        setTimeout(() => resolve(posBush), 4 * time);
                    })
                }
            ).then(
                function () {
                    wrap.children[posBush].classList.remove("berry");
                    wrap.children[posBush].classList.add("deadBerry");
                    return new Promise(function (resolve) {
                        setTimeout(() => resolve(posBush), 4 * time);
                    })
                }
            ).then(
                function () {
                    wrap.children[posBush].className = "bush";
                    promise();
                }
            ).catch(function(){
                promise();
            });
        }

        promise();
    } else {
        definePosBush();
    }
}

// ****************************************   TREE   **********************************
function definePosTree() {
    let posTreeY = Math.round(-0.5 + Math.random() * lengthY);
    let posTreeX = Math.round(-0.5 + Math.random() * lengthX);
    let posTree = posTreeY * lengthX + posTreeX;
    let elemClass = wrap.children[posTree].className;
    if (!elemClass) {
        wrap.children[posTree].className = "tree";
        function promise() {
            let prom = new Promise(function(resolve){
                setTimeout(() => resolve("result"), 2 * time);
            });
            prom.then(
                function(result){
                    wrap.children[posTree].className = "tree2";
                    return new Promise (function(resolve){
                        setTimeout(() => resolve("result"), 4 * time);
                    })
                }
            ).then(
                function() {
                    function appearFruit(){
                        let randomX = Math.round(- 1.5 + Math.random() * 3);
                        let randomY = Math.round(- 1.5 + Math.random() * 3);
                        if ((randomY == 0 || randomY == -0) && (randomX == 0 || randomX == -0)) {
                            appearFruit();
                        }
                        let tempCoorX = posTreeX + randomX;
                        let tempCoorY = posTreeY + randomY;
                        let tempPosFruit = tempCoorY * lengthX + tempCoorX;
                        let elemClass = wrap.children[tempPosFruit].className;

                        if ( (tempCoorY == lengthY) || (tempCoorY == -1) || (tempCoorX == lengthX) ||
                            (tempCoorX == -1) || (elemClass)) {
                            throw new Error();
                        } else {
                            posTree = tempPosFruit;
                            posTreeY = tempCoorY;
                            posTreeX = tempCoorX;
                            wrap.children[posTree].className = "fruit";
                        }
                    }
                    appearFruit();
                    return  new Promise (function(resolve){
                        setTimeout(() => resolve(posTree), 4 * time);
                    })
                }
            ).then(function(){
                return  new Promise (function(resolve){
                    wrap.children[posTree].className = "deadFruit";
                    setTimeout(() => resolve(posTree), 4 * time);
                    });
                }
            ).then(
                function() {
                    wrap.children[posTree].className = "tree";
                    promise();
                }
            ).catch(function(){
                promise();
            });
        }
        promise();
    } else {
        definePosTree();
    }
}

// --------------------------------------------------------------------------------------------
function defineStartPosDeer() {
    posDeerY = Math.round(-0.5 + Math.random() * lengthY);
    posDeerX = Math.round(-0.5 + Math.random() * lengthX);
    let posDeer = posDeerY * lengthX + posDeerX;
    let elemClass = wrap.children[posDeer].className;
    if (!elemClass) {
        wrap.children[posDeer].className = "deer";
    } else {
        defineStartPosDeer();
    }
}

function defineStartPosMouse() {
    posMouseY = Math.round(-0.5 + Math.random() * lengthY);
    posMouseX = Math.round(-0.5 + Math.random() * lengthX);
    let posMouse = posMouseY * lengthX + posMouseX;
    let elemClass = wrap.children[posMouse].className;
    if (!elemClass) {
        wrap.children[posMouse].className = "mouse";
    } else {
        defineStartPosMouse();
    }
}

function showScores() {
    let deerSat = document.getElementById("deerSatiety");
    let deerHeal = document.getElementById("deerHealth");
    let mouseSat = document.getElementById("mouseSatiety");
    let mouseHeal = document.getElementById("mouseHealth");

    deerSat.innerHTML = deer.satiety;
    deerHeal.innerHTML = deer.health;
    mouseSat.innerHTML = mouse.satiety;
    mouseHeal.innerHTML = mouse.health;
}

defineStartPosMouse();
defineStartPosDeer();

for (let i = 0; i < quantityTree; i++){
    definePosTree();
}

for (let i = 0; i < quantityBush; i++){
    definePosBush();
}

let deer = new Deer();
let mouse = new Mouse();

function live(){
    deer.move();
    mouse.move();
    showScores();
}
setInterval(live, time);