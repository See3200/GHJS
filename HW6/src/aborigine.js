import Human from "./human.js";

export class Aborigine extends Human {
    constructor(health, mind) {
        super(health, mind);
        this.type = "aborigine";
    }
    eat(food) {
        food.die();
        super.eat(food);
    }
    terror(time) {
        time = time || 3000;
        console.log("Allah akbar!!!");
        setTimeout(() => this.die(), time);
    }
}
