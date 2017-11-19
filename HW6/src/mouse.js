import Animal from "./animal.js";

export class Mouse extends Animal {
    constructor(health, speed) {
        super(health);
        this.speed = speed;
        this._type = "mouse";
    }
    eat(food) {
        if (food === "corn") {
            super.eat();
        } else {
            return console.log("It is not my food...");
        }
    }
    fight() {
        return console.log("I do not fight!");
    }
}