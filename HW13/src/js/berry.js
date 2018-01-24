import Fetus from "./fetus.js";
import Bush from "./bush.js";

class Berry extends Fetus {
    constructor(positionY, positionX, lengthY, lengthX, storage) {
        super();
        this.positionY = positionY;
        this.positionX = positionX;
        this.lengthY = lengthY;
        this.lengthX = lengthX;
        this.storage = storage;
        this.parent = Bush;
        this.parentClass = "bush";
        this.className = "berry";
    }
}

export default Berry;
