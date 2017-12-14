import Tree from "./tree.js";

class Fruit {
    constructor(posFruitY, posFruitX, lengthY, lengthX, plantsList) {
        this.posFruitY = posFruitY;
        this.posFruitX = posFruitX;
        this.lengthY = lengthY;
        this.lengthX = lengthX;
        this.plantsList = plantsList;
        this.count = 0;
        this.posFruit = posFruitY * this.lengthX + posFruitX;
    }
    grow() {
        if (this.count === 4) {
            wrap.children[this.posFruitY].children[this.posFruitX].className = "deadFruit";
        }
        if (this.count === 8) {
            this.plantsList[this.posFruit] = new Tree(this.posFruitY, this.posFruitX,
                this.lengthY, this.lengthX, this.plantsList);
            wrap.children[this.posFruitY].children[this.posFruitX].className = "tree";
        }
        this.count++;
    }
    die(posFruit, animal) {
        this.count = 0;
        wrap.children[this.posFruitY].children[this.posFruitX].className = "fruit1";
        if (animal === "deer") {
            this.grow = function(){
                if (this.count === 1) {
                    wrap.children[this.posFruitY].children[this.posFruitX].classList.remove("fruit1");
                    this.plantsList[posFruit] = null;
                }
                this.count++;
            }
        } else if (animal === "mouse") {
            this.grow = function(){
                if (this.count === 6) {
                    wrap.children[this.posFruitY].children[this.posFruitX].classList.remove("fruit1");
                    this.plantsList[posFruit] = null;
                }
                this.count++;
            }
        }
    }
}

export default Fruit;