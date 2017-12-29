import Animal from "./animal.js";

class Mouse extends Animal {
    constructor(lengthY, lengthX, storage, performList, name) {
        super();
        this.lengthY = lengthY;
        this.lengthX = lengthX;
        this.storage = storage;
        this.performList = performList;
        this.className = "mouse";
        this.classNameEnd = "deadMouse";
        this.name = name;
        this.food = {"berry": 4, "fruit": 6};
    }
}

export default Mouse;