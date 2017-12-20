import Berry from "./berry.js";
import Plant from "./plant.js";

class Bush extends Plant {
    constructor(y, x, lengthY, lengthX, storage) {
        super();
        this.positionY = y;
        this.positionX = x;
        this.lengthY = lengthY;
        this.lengthX = lengthX;
        this.storage = storage;
        this.className = "bush";
        this.classNameChild = "berry";
    }

    bear(posChildY, posChildX) {
        super.bear(posChildY, posChildX);
        this.posChild = posChildY * this.lengthX + posChildX;
        this.storage[this.posChild] = new Berry(posChildY, posChildX, this.lengthY, this.lengthX, this.storage);
    }

    die(n) {
        super.die(n);
        this.position = this.positionY * this.lengthX + this.positionX;
        this.storage[this.position] = null;
    }
}

export default Bush;