class Animal {
    constructor(lengthY, lengthX, storage, performList){
        this.health = 100;
        this.satiety = 100;
        this.position = 0;
        this.positionY = 0;
        this.positionX = 0;
        this.lengthY = lengthY;
        this.lengthX = lengthX;
        this.storage = storage;
        this.performList = performList;
        this.count = 0;
        this.flag = 0;
        this.duration = 0;
        this.tempCoorY = 0;
        this.tempCoorX = 0;
        this.className = "";
        this.classNameEnd = "";
        this.food = {};
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
            this.resetCount();
            return this.die();
        }
        let variantY = [this.positionY];
        let variantX = [this.positionX];
        let stepToEat = [];
        let stepToMove = [];
        if ((this.positionY - 1) >= 0) {
            variantY.push(this.positionY - 1)
        }
        if ((this.positionY + 1) < this.lengthY) {
            variantY.push(this.positionY + 1)
        }
        if ((this.positionX - 1) >= 0) {
            variantX.push(this.positionX - 1)
        }
        if ((this.positionX + 1) < this.lengthX) {
            variantX.push(this.positionX + 1)
        }
        for (let y of variantY) {
            for (let x of variantX) {
                if (this.food[wrap.children[y].children[x].className]) {
                    stepToEat.push({"y": y, "x": x});
                } else if (!wrap.children[y].children[x].className) {
                    stepToMove.push({"y": y, "x": x});
                }
            }
        }
        if (stepToEat.length) {
            let random = Math.round(-0.5 + Math.random() * stepToEat.length);
            this.tempCoorY = stepToEat[random]["y"];
            this.tempCoorX = stepToEat[random]["x"];
            this.eat();
        } else {
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
        let info = document.getElementById(`info-${this.className}`);
        info.classList.remove("notVis");
        wrap.children[this.positionY].children[this.positionX].classList.remove(this.className);
        wrap.children[this.positionY].children[this.positionX].classList.add(this.classNameEnd);
        this.flag = 2;
    }

    beDead() {
        this.count++;
        if (this.count === 3) {
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
    }
}

export default Animal;

