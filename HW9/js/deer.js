class Deer {
    constructor(lengthY, lengthX, plantsList, animalsList, tempList, name){
        this.health = 100;
        this.satiety = 100;
        this.posDeerY = 0;
        this.posDeerX = 0;
        this.lengthY = lengthY;
        this.lengthX = lengthX;
        this.plantsList = plantsList;
        this.animalsList = animalsList;
        this.tempList = tempList;
        this.name = name;
        this.count = 0;
    }
    initialPosDeer() {
        this.posDeerY = Math.round(-0.5 + Math.random() * this.lengthY);
        this.posDeerX = Math.round(-0.5 + Math.random() * this.lengthX);
        if (!wrap.children[this.posDeerY].children[this.posDeerX].classList[0]) {
            this.animalsList.set(this.name, this);
            wrap.children[this.posDeerY].children[this.posDeerX].className = "deer";
            wrap.children[this.posDeerY].children[this.posDeerX].setAttribute("data-name", this.name);
        } else {
            this.initialPosDeer();
        }
    }
    move() {
        let randomX = Math.round(-1.5 + Math.random() * 3);
        let randomY = Math.round(-1.5 + Math.random() * 3);
        if ((randomY == 0 || randomY == -0) && (randomX == 0 || randomX == -0)) {
            return this.move();
        }
        let tempCoorX = this.posDeerX + randomX;
        let tempCoorY = this.posDeerY + randomY;
        if ((tempCoorY == this.lengthY) || (tempCoorY == -1)){
            tempCoorY = this.posDeerY - randomY;
        }
        if ((tempCoorX == this.lengthX) || (tempCoorX == -1)) {
            tempCoorX = this.posDeerX - randomX;
        }
        let self = this;
        let elemClass = wrap.children[tempCoorY].children[tempCoorX].classList[0];

        function stayAndEat(time) {
            self.startEating(tempCoorY, tempCoorX);
            if (self.satiety > 0) {
                self.satiety -= 5;
            } else {
                self.health -= 10;
            }
            let idTask = tempCoorY * self.lengthX + tempCoorX;
            self.tempList.set(idTask, self.keepEating.bind(self));
            let tempMove = self.move;
            self.move = function() {
                if (self.satiety > 0) {
                    self.satiety -= 5;
                } else {
                    self.health -= 10;
                }
                if (self.count === time) {
                    self.move = tempMove;
                    self.tempList.delete(idTask);
                    self.count = 0;
                }
                self.count++
            };
        }
        if (!elemClass) {
            wrap.children[this.posDeerY].children[this.posDeerX].classList.remove("deer");
            wrap.children[this.posDeerY].children[this.posDeerX].removeAttribute("data-name");
            this.posDeerY = tempCoorY;
            this.posDeerX = tempCoorX;
            wrap.children[this.posDeerY].children[this.posDeerX].className = "deer";
            wrap.children[this.posDeerY].children[this.posDeerX].setAttribute("data-name", this.name);

            if (this.satiety > 0) {
                this.satiety -= 5;
            } else {
                this.health -= 10;
            }
            if (this.health <= 0) {
                this.die();
            }

        } else if ((elemClass === "tree1") && (this.satiety !== 100)){
            return stayAndEat(3);
        } else if ((elemClass === "bush1") && (this.satiety !== 100)) {
            return stayAndEat(2);
        } else if ((elemClass === "fruit") && (this.satiety !== 100)) {
            return stayAndEat(1);
        } else {
            return this.move();
        }
    }
    keepEating() {
        if (!(this.satiety > 0)) {
            this.health += 20;
        } else {
            this.satiety += 10;
        }
        if (this.satiety > 100) {
            this.satiety = 100;
        }
        if (this.health > 100) {
            this.satiety = this.health - 100;
            this.health = 100;
        }
    }
    startEating(tempCoorY, tempCoorX) {
        let posVictim = tempCoorY * this.lengthX + tempCoorX;
        this.plantsList[posVictim].die(posVictim, "deer");
    }
    die() {
        let info = document.getElementById("infoD");
        info.classList.remove("notVis");
        wrap.children[this.posDeerY].children[this.posDeerX].classList.remove("deer");
        wrap.children[this.posDeerY].children[this.posDeerX].removeAttribute("data-name");
        wrap.children[this.posDeerY].children[this.posDeerX].classList.add("deadDeer");
        this.count = 0;
        this.move = function(){
            if (this.count === 3) {
                wrap.children[this.posDeerY].children[this.posDeerX].classList.remove("deadDeer");
                this.animalsList.delete(this.name);
            }
            this.count++
        };
    }
}

export default Deer;