import Fetus from "./fetus.js";
import Tree from "./tree.js";

class Fruit extends Fetus {
    constructor(positionY, positionX, lengthY, lengthX, storage) {
        super();
        this.positionY = positionY;
        this.positionX = positionX;
        this.lengthY = lengthY;
        this.lengthX = lengthX;
        this.storage = storage;
        this.parent = Tree;
        this.parentClass = "tree";
        this.className = "fruit";
    }
}

export default Fruit;