import Animal from "./animal.js";

export class Deer extends Animal {
    constructor(health, speed) {
        super(health);
        this.speed = speed;
        this._type = "deer";
    }
    eat(food) {
        if (food === "plant") {
            super.eat();
        } else {
            return console.log("It is not my food...");
        }
    }
}
