import conf from "./configuration.js";

class Animal {
    constructor(lengthY, lengthX, storage, performList, name){
        this.health = 100;
        this.satiety = 100;
        this.position = 0;
        this.positionY = 0;
        this.positionX = 0;
        this.lengthY = lengthY;
        this.lengthX = lengthX;
        this.storage = storage;
        this.performList = performList;
        this.timeAfterDeath = conf.timeAfterDeath;
        this.count = 0;
        this.flag = 0;
        this.duration = 0;
        this.tempCoorY = 0;
        this.tempCoorX = 0;
        this.className = "";
        this.classNameEnd = "";
        this.name = name;
        this.food = {};
        this.vision = 4;
    }

    initializePosition() {
        this.positionY = Math.round(-0.5 + Math.random() * this.lengthY);
        this.positionX = Math.round(-0.5 + Math.random() * this.lengthX);
        if (!wrap.children[this.positionY].children[this.positionX].classList[0]) {
            this.position = this.positionY * this.lengthX + this.positionX;
            this.storage[this.position] = this;
            wrap.children[this.positionY].children[this.positionX].className = this.className;
        } else {
            this.initializePosition();
        }
    }

    see() {
        if (this.satiety > 0) {
            this.satiety -= 5;
        } else {
            this.health -= 10;
        }
        if (this.health <= 0) {
            return this.die();
        }
        this.resetCount();
        let obstacle = [];
        let stepToMove = [];
        let maxY = this.lengthY;
        let maxX = this.lengthX;
        let currentPosY = this.positionY;
        let currentPosX = this.positionX;
        let countForCheck = this.count;

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
                let victim = wrap.children[artifact[0]].children[artifact[1]];
                if (this.food[victim.className] && window.getComputedStyle(victim, null).getPropertyValue("opacity") == 1) {
                    stepToEat.push({"y": artifact[0], "x": artifact[1]});
                } else if (wrap.children[artifact[0]].children[artifact[1]].className) {
                    obstacle.push([artifact[0], artifact[1]]);
                } else if (i === 1) {
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
                            destination1 = destination.filter(function(item){return [item[1] > 0, item[1] < 0]})
                                .sort(function(a){return a[0] !== 0});
                        }
                        if (self.positionX - coorVictimX > 0) {
                            destinationFiltered = destination1.filter(function(item){return item[1] <= 0})
                                .sort(function(a, b){return a[1] - b[1]});
                        } else if (self.positionX - coorVictimX < 0) {
                            destinationFiltered = destination1.filter(function(item){return item[1] >= 0})
                                .sort(function(a, b){return b[1] - a[1]});
                        } else {
                            destinationFiltered = destination1.filter(function(item){return [item[0] > 0, item[0] < 0]})
                                .sort(function(a){return a[1] !== 0});
                        }
                    }
                    defineDirection();
                    if (!wrap.children[this.positionY + destinationFiltered[0][0]].children[this.positionX + destinationFiltered[0][1]].className) {
                        this.tempCoorY = this.positionY + destinationFiltered[0][0];
                        this.tempCoorX = this.positionX + destinationFiltered[0][1];
                        this.move();
                        break;
                    } else if (!wrap.children[this.positionY + destinationFiltered[1][0]].children[this.positionX + destinationFiltered[1][1]].className) {
                        this.tempCoorY = this.positionY + destinationFiltered[1][0];
                        this.tempCoorX = this.positionX + destinationFiltered[1][1];
                        this.move();
                        break;
                    } else if (!wrap.children[this.positionY + destinationFiltered[2][0]].children[this.positionX + destinationFiltered[2][1]].className) {
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
        if (!this.flag && (currentPosY === this.positionY) && (currentPosX === this.positionX) && (countForCheck === this.count)) {
            let random = Math.round(-0.5 + Math.random() * stepToMove.length);
            if (!stepToMove.length) {
                return;
            }
            this.tempCoorY = stepToMove[random]["y"];
            this.tempCoorX = stepToMove[random]["x"];
            this.move();
        }

    }

    move() {
        let tempPos = this.position;
        wrap.children[this.positionY].children[this.positionX].classList.remove(this.className);
        this.positionY = this.tempCoorY;
        this.positionX = this.tempCoorX;
        this.position = this.positionY * this.lengthX + this.positionX;
        wrap.children[this.positionY].children[this.positionX].className = this.className;
        this.storage[this.position] = this;
        this.storage[tempPos] = null;
    }

    eat() {
        let victimClass = wrap.children[this.tempCoorY].children[this.tempCoorX].className;
        this.duration = this.food[victimClass];
        if (this.duration !== 1) {
            this.flag = 1;
        }
        this.count = 0;
        let tempPosition = this.tempCoorY * this.lengthX + this.tempCoorX;
        this.storage[tempPosition].resetCount();
        this.storage[tempPosition].beExposed(this.duration);
        this.keepEating();
    }

    keepEating() {
        this.count++;
        if (!(this.satiety > 0)) {
            this.health += 20;
        } else {
            this.satiety += 10;
        }
        if (this.health > 100) {
            this.satiety = this.health - 100;
            this.health = 100;
        }
        if (this.satiety > 0) {
            this.satiety -= 5;
        } else {
            this.health -= 10;
        }
        if (this.satiety > 100) {
            this.satiety = 100;
        }

        if (this.satiety === 100) {
            this.flag = 0;
            if ((this.duration - this.count) >= 1) {
                let tempPosition = this.tempCoorY * this.lengthX + this.tempCoorX;
                this.storage[tempPosition].resetCount();
                this.storage[tempPosition].recover();
            }
            return;
        }
        if (this.count < this.duration) {
            this.flag = 1;
        } else {
            this.flag = 0;
        }
    }

    resetCount() {
        this.count = 0;
    }

    die() {
        this.resetCount();
        let target = document.getElementById(this.name);
        target.children[1].classList.add("hidden");
        target.children[2].classList.add("hidden");
        let info = target.querySelector(`.info-live`);
        info.classList.remove("hidden");
        wrap.children[this.positionY].children[this.positionX].classList.remove(this.className);
        wrap.children[this.positionY].children[this.positionX].classList.add(this.classNameEnd);
        if (this.flag === 1) {
            let tempPosition = this.tempCoorY * this.lengthX + this.tempCoorX;
            this.storage[tempPosition].resetCount();
            this.storage[tempPosition].recover();
        }
        this.flag = 2;
    }

    beDead() {
        this.count++;
        if (this.count === this.timeAfterDeath) {
            wrap.children[this.positionY].children[this.positionX].classList.remove(this.classNameEnd);
            this.storage[this.position] = null;
        }
    }

    live() {
        if (!this.flag) {
            this.performList.set(this, this.see.bind(this));
        } else if (this.flag === 1) {
            this.performList.set(this, this.keepEating.bind(this));
        } else if (this.flag === 2) {
            this.performList.set(this, this.beDead.bind(this));
        }
        let target = document.getElementById(this.name);
        target.querySelector(".satiety").textContent = this.satiety;
        target.querySelector(".health").textContent = this.health;
    }

}

export default Animal;