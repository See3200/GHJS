import Animal from "./animal.js"

export class Human extends Animal {
    constructor(health, mind) {
        super(health);
        this.mind = mind;
    }
    _setMind(level) {
        if (arguments.length) {
            this.mind++;
        } else {
            this.mind--;
        }
        if (this.mind <= 0) {
            this.type = "aborigine";
        } else {
            this.type = "hunter";
        }
    }
    eat(food) {
        if (food.type === "mouse" || food.type === "eagle") {
            this._setMind();
            console.log("Bue-e-e...");
        } else if (food.type === "deer") {
            this._setMind(1);
            super.eat();
        }
    }
}
