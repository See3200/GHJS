import Fruit from "./fruit.js";

class Tree {
    constructor(y, x, lengthY, lengthX, plantsList){
        this.posTreeY = y;
        this.posTreeX = x;
        this.posTree = 0;
        this.lengthY = lengthY;
        this.lengthX = lengthX;
        this.plantsList = plantsList;
        this.count = 0;
    }
    initialPosTree() {
        this.posTreeY = Math.round(-0.5 + Math.random() * this.lengthY);
        this.posTreeX = Math.round(-0.5 + Math.random() * this.lengthX);
        this.posTree = this.posTreeY * this.lengthX + this.posTreeX;
        if (!wrap.children[this.posTreeY].children[this.posTreeX].classList[0]) {
            this.plantsList[this.posTree] = this;
            wrap.children[this.posTreeY].children[this.posTreeX].className = "tree";
        } else {
            this.initialPosTree();
        }
    }
    grow() {
        if (this.count === 2) {
            wrap.children[this.posTreeY].children[this.posTreeX].className = "tree1";
        }
        if (((this.count - 2) % 4 === 0) && (this.count !== 2)) {
            let self = this;
            function appearFruit(){
                let randomX = Math.round(- 1.5 + Math.random() * 3);
                let randomY = Math.round(- 1.5 + Math.random() * 3);
                if ((randomY == 0 || randomY == -0) && (randomX == 0 || randomX == -0)) {
                    appearFruit();
                }
                let posFruitX = self.posTreeX + randomX;
                let posFruitY = self.posTreeY + randomY;

                if ( (posFruitY == self.lengthY) || (posFruitY == -1) || (posFruitX == self.lengthX) ||
                    (posFruitX == -1) || (wrap.children[posFruitY].children[posFruitX].classList[0])) {
                    return;
                } else {
                    self.bear(posFruitY, posFruitX);
                }
            }
            appearFruit();
        }
        this.count++
    }
    bear(posFruitY, posFruitX) {
        wrap.children[posFruitY].children[posFruitX].className = "fruit";
        let posFruit = posFruitY * this.lengthX + posFruitX;
        this.plantsList[posFruit] = new Fruit(posFruitY, posFruitX, this.lengthY, this.lengthX, this.plantsList);
    }
    die(posTree) {
        this.count = 0;
        wrap.children[this.posTreeY].children[this.posTreeX].className = "tree2";
        this.grow = function(){
            if (this.count === 3) {
                wrap.children[this.posTreeY].children[this.posTreeX].className = "deadTree";
            }
            if (this.count === 4) {
                wrap.children[this.posTreeY].children[this.posTreeX].classList.remove("deadTree");
                this.plantsList[posTree] = null;
            }
            this.count++;
        };
    }
}

export default Tree;