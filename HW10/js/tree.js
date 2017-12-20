import Fruit from "./fruit.js";
import Plant from "./plant.js";

class Tree extends Plant {
    constructor(y, x, lengthY, lengthX, storage) {
        super();
        this.positionY = y;
        this.positionX = x;
        this.lengthY = lengthY;
        this.lengthX = lengthX;
        this.storage = storage;
        this.className = "tree";
        this.classNameChild = "fruit";
    }

    bear(posChildY, posChildX) {
        super.bear(posChildY, posChildX);
        this.posChild = posChildY * this.lengthX + posChildX;
        this.storage[this.posChild] = new Fruit(posChildY, posChildX, this.lengthY, this.lengthX, this.storage);
    }

    die(n) {
        super.die(n);
        wrap.children[this.positionY].children[this.positionX].className = "deadTree";
        if (this.count > 4) {
            wrap.children[this.positionY].children[this.positionX].classList.remove("deadTree");
            this.position = this.positionY * this.lengthX + this.positionX;
            this.storage[this.position] = null;
        }
    }
}

export default Tree;