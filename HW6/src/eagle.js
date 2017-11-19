import Animal from "./animal.js";

export class Eagle extends Animal {
    constructor(health, speed, vigilance) {
        super(health);
        this.speed = speed;
        this._type = "eagle";
        this.vigilance = vigilance;
    }
    eat(food) {
        if (food._lifeStatus === "alive") {
            if (food._type === "mouse" && (this.vigilance > 0 || food.speed > 0)) {
                food.die();
                super.eat();
            } else {
                return console.log("It is not my food...");
            }
        } else {
            return console.log("I am not a vulture!")
        }
    }
    fight() {
        return console.log("I do not fight!");
    }
}