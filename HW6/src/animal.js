
export default class Animal {
    constructor(health) {
        this._lifeStatus = "alive";
        this.health = health;
    }
    eat() {
        this.health++;
        console.log("My stomach is happy!");
    }
    die() {
        let entity = this;
        let type = entity.type;
        if (entity.hasOwnProperty("_type")) {
            type = entity._type;
        }
        for (let key in entity) {
            delete entity[key];
        }
        entity._lifeStatus = "dead";
        entity.type = type;
    }
    fight(rival) {
        while (this.health > 0 && rival.health > 0) {
            this.health--;
            rival.health--;
        }
        if (this.health <= 0) {
            this.die();
            console.log("(_X___X_)");
        }
        if (rival.health <= 0) {
            rival.die();
            console.log("I am winner!");
        }
    }
}



