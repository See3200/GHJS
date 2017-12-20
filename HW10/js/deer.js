import Animal from "./animal.js";

class Deer extends Animal{
    constructor(lengthY, lengthX, storage, performList){
        super();
        this.lengthY = lengthY;
        this.lengthX = lengthX;
        this.storage = storage;
        this.performList = performList;
        this.className = "deer";
        this.classNameEnd = "deadDeer";
        this.food = {"tree1": 3, "bush1": 2, "fruit": 1};
    }
}

export default Deer;