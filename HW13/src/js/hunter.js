import Animal from "./animal.js";

class Hunter extends Animal{
    constructor(lengthY, lengthX, storage, performList, name){
        super();
        this.lengthY = lengthY;
        this.lengthX = lengthX;
        this.storage = storage;
        this.performList = performList;
        this.className = "hunter";
        this.classNameEnd = "deadHunter";
        this.name = name;
        this.food = ["deer", "deadDeer"];
    }
    see() {
        if (this.satiety > 0) {
            this.satiety -= 5;
        } else {
            this.health -= 10;
        }
        if (this.health <= 0) {
            this.resetCount();
            return this.die();
        }
        this.resetCount();
        let obstacle = [];
        let stepToMove = [];
        let maxY = this.lengthY;
        let maxX = this.lengthX;
        let currentPosY = this.positionY;
        let currentPosX = this.positionX;

        for (let i = 1; i <= this.vision; i++) {
            let investigation = [];
            let stepToEat = [];

            for (let j = 0; j < 2 * i; j++) {
                investigation.push([this.positionY - i, this.positionX - i + j]);
                investigation.push([this.positionY - i + j, this.positionX + i]);
                investigation.push([this.positionY + i, this.positionX + i - j]);
                investigation.push([this.positionY + i - j, this.positionX - i]);
            }
            let investigationArea = investigation.filter(function (item) {
                return ((item[0] >= 0 && item[0] < maxY) && (item[1] >= 0 && item[1] < maxX));
            });

            for (let artifact of investigationArea) {
                if (wrap.children[artifact[0]].children[artifact[1]].className === this.food[0]) {
                    if ( i === 1) {
                        this.shoot(artifact[0], artifact[1]);
                        stepToEat.push({"y": artifact[0], "x": artifact[1]});
                    } else if (!obstacle.includes([(this.positionY - artifact[0]) / i, (this.positionX - artifact[1]) / i])) {
                        this.shoot(artifact[0], artifact[1]);
                        stepToEat.push({"y": artifact[0], "x": artifact[1]});
                    }
                } else if (this.food[1] === wrap.children[artifact[0]].children[artifact[1]].className) {
                    stepToEat.push({"y": artifact[0], "x": artifact[1]});
                } else if (wrap.children[artifact[0]].children[artifact[1]].className === "tree1" ||
                    wrap.children[artifact[0]].children[artifact[1]].className === "bush1") {
                    obstacle.push([(this.positionY - artifact[0]) / i, (this.positionX - artifact[1]) / i]);
                } else if (i === 1 && !wrap.children[artifact[0]].children[artifact[1]].className) {
                    stepToMove.push({"y": artifact[0], "x": artifact[1]});
                }
            }
            if (stepToEat.length) {
                if (i === 1) {
                    let random = Math.round(-0.5 + Math.random() * stepToEat.length);
                    this.tempCoorY = stepToEat[random]["y"];
                    this.tempCoorX = stepToEat[random]["x"];
                    this.eat();
                    break;
                } else {
                    let self = this;
                    let destination = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
                    let destination1 = [];
                    let destinationFiltered = [];
                    let random = 0;
                    function defineDirection() {
                        random = Math.round(-0.5 + Math.random() * stepToEat.length);
                        let coorVictimY = stepToEat[random]["y"];
                        let coorVictimX = stepToEat[random]["x"];
                        // method sort is used to select the most optimal direction
                        if (self.positionY - coorVictimY > 0) {
                            destination1 = destination.filter(function(item){return item[0] <= 0})
                                .sort(function(a, b){return a[0] - b[0]});
                        } else if (self.positionY - coorVictimY < 0) {
                            destination1 = destination.filter(function(item){return item[0] >= 0})
                                .sort(function(a, b){return b[0] - a[0]});
                        } else {
                            destination1 = destination;
                        }
                        if (self.positionX - coorVictimX > 0) {
                            destinationFiltered = destination1.filter(function(item){return item[1] <= 0})
                                .sort(function(a, b){return a[1] - b[1]});
                        } else if (self.positionX - coorVictimX < 0) {
                            destinationFiltered = destination1.filter(function(item){return item[1] >= 0})
                                .sort(function(a, b){return b[1] - a[1]});
                        } else {
                            destinationFiltered = destination1;
                        }
                    }
                    defineDirection();
                    if ((this.positionY + destinationFiltered[0][0] !== -1) && (this.positionY + destinationFiltered[0][0] !== 20) &&
                        (this.positionX + destinationFiltered[0][1] !== -1) && (this.positionX + destinationFiltered[0][1] !== 20) &&
                        !wrap.children[this.positionY + destinationFiltered[0][0]].children[this.positionX + destinationFiltered[0][1]].className) {
                        this.tempCoorY = this.positionY + destinationFiltered[0][0];
                        this.tempCoorX = this.positionX + destinationFiltered[0][1];
                        this.move();
                        break;
                    } else if ((this.positionY + destinationFiltered[1][0] !== -1) && (this.positionY + destinationFiltered[1][0] !== 20) &&
                        (this.positionX + destinationFiltered[1][1] !== -1) && (this.positionX + destinationFiltered[1][1] !== 20) &&
                        !wrap.children[this.positionY + destinationFiltered[1][0]].children[this.positionX + destinationFiltered[1][1]].className) {
                        this.tempCoorY = this.positionY + destinationFiltered[1][0];
                        this.tempCoorX = this.positionX + destinationFiltered[1][1];
                        this.move();
                        break;
                    } else if ((this.positionY + destinationFiltered[2][0] !== -1) && (this.positionY + destinationFiltered[2][0] !== 20) &&
                        (this.positionX + destinationFiltered[2][1] !== -1) && (this.positionX + destinationFiltered[2][1] !== 20) &&
                        !wrap.children[this.positionY + destinationFiltered[2][0]].children[this.positionX + destinationFiltered[2][1]].className) {
                        this.tempCoorY = this.positionY + destinationFiltered[2][0];
                        this.tempCoorX = this.positionX + destinationFiltered[2][1];
                        this.move();
                        break;
                    } else {
                        stepToEat.splice(random, 1);
                        if (stepToEat.length) {
                            return defineDirection();
                        }
                    }
                }
            }
        }
        if (!this.flag && (currentPosY === this.positionY) && (currentPosX === this.positionX)) {
            let random = Math.round(-0.5 + Math.random() * stepToMove.length);
            if (!stepToMove.length) {
                return;
            }
            this.tempCoorY = stepToMove[random]["y"];
            this.tempCoorX = stepToMove[random]["x"];
            this.move();
        }

    }
    shoot(posY, posX) {
        let victimPosition = posY * this.lengthY + posX;
        this.storage[victimPosition].die();
        this.performList.delete(this.storage[victimPosition]);
    }
    eat() {
        this.health = 100;
        this.satiety = 100;
        wrap.children[this.tempCoorY].children[this.tempCoorX].classList.remove(this.food[1]);
        let victimPosition = this.tempCoorY * this.tempCoorX + this.tempCoorX;
        this.storage[victimPosition] = null;
    }
    live() {
        if (!this.flag) {
            this.performList.set(this, this.see.bind(this));
        } else if (this.flag === 2) {
            this.performList.set(this, this.beDead.bind(this));
        }
        let target = document.getElementById(this.name);
        target.querySelector(".satiety").textContent = this.satiety;
        target.querySelector(".health").textContent = this.health;
    }
}

export default Hunter;
