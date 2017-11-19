import Human from "./human.js";

export class Hunter extends Human {
    constructor(health, mind, skills) {
        super(health, mind);
        this.skills = skills;
        this.bag = [];
    }
    kill(victim) {
        victim.die();
        this.bag.push(victim);
        this.skills++;
        console.log("I have killed him!");
    }
    hunt(victim) {
        if (victim._lifeStatus === "alive") {
            switch (victim._type) {
                case("mouse"):
                    if (this.skills > 10) {
                        this.kill(victim);
                    } else if (victim.speed < 10) {
                        this.kill(victim);
                    } else {
                        console.log("I could not do it...")
                    }
                    break;
                case("eagle"):
                    if (this.skills > 10 && victim.speed < 40) {
                        this.kill(victim);
                    } else {
                        console.log("I could not do it...")
                    }
                    break;
                case("deer"):
                    if (this.skills > 15) {
                        this.kill(victim);
                    } else if (this.skills > 10 && victim.speed < 30) {
                        this.kill(victim);
                    } else if (victim.speed < 10) {
                        this.kill(victim);
                    } else {
                        this.fight(victim);
                        if (this.health) {
                            this.kill(victim);
                        }
                    }
                    break;
                default:
                    this.skills++;
            }
        } else {
            return console.log("These are the remains...")
        }
    }
    eat(food) {
        let foodPos = this.bag.indexOf(food);
        if ( foodPos == -1) {
            console.log("There is not any food");
        } else {
            super.eat(food);
            this.bag.splice(foodPos, 1);
            food = null;
        }
    }
}
