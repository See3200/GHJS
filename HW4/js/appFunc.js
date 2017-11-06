
//***************************************   Animal   *********************//

function Animal (health) {

    this._lifeStatus = "alive";
    this.health = health;

    this.eat = function() {
        this.health++;
        console.log("My stomach is happy!");
    }.bind(this);

    this.die = function() {
        var entity = this;
        var type = entity.type;
        if (entity.hasOwnProperty("_type")) {
            type = entity._type;
        }
        for (var key in entity) {
            entity[key] = null;
        }
        entity._lifeStatus = "dead";
        entity.type = type;
    }

    this.fight = function(rival) {
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

//*******************************************   Mouse   **********************//

function Mouse(health, speed) {

    Animal.apply(this, arguments);

    this.speed = speed;
    this._type = "mouse";

    var animalEat = this.eat;
    this.eat = function(food) {
        if (food === "corn") {
            animalEat(food);
        } else {
            return console.log("It is not my food...");
        }
    }

    this.fight = function() {
        return console.log("I do not fight!")
    }

}

//********************************************   Eagle   *************************//

function Eagle(health, speed, vigilance) {

    Animal.apply(this, arguments);

    this.speed = speed;
    this.vigilance = vigilance;
    this._type = "eagle";

    var animalEat = this.eat;
    this.eat = function(food) {
        if (food._lifeStatus === "alive") {
            if (food.type === "mouse" && (this.vigilance > 0 || food.speed > 0)) {
                animalEat();
            } else {
                return console.log("It is not my food...");
            }
        } else {
            console.log("I am not a vulture!")
        }
    }

    this.fight = function() {
        return console.log("I do not fight!")
    }

}

//**********************************************   Deer   **********************//

function Deer(health, speed) {

    Animal.apply(this, arguments);

    this.speed = speed;
    this._type = "deer";

    var animalEat = this.eat;
    this.eat = function(food) {
        if (food === "plant") {
            animalEat();
        } else {
            return console.log("It is not my food...");
        }
    }

}

//***********************************************   Human   **********************//

function Human(health, mind) {

    Animal.apply(this, arguments);

    this.mind = mind;

    function setMind(level) {
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
    };

    var self = this;
    var animalEat = this.eat;
    this.eat = function(food) {
        if (food.type === "mouse" || food.type === "eagle") {
            setMind.call(self);
            console.log("Bue-e-e...")
        } else if (food.type === "deer") {
            setMind.call(self, 1);
            animalEat();
        }
    }

}

//*************************************************   Hunter   ************************//

function Hunter(health, mind, skills) {

    Human.apply(this, arguments);

    this.type = "hunter";
    this.skills = skills;
    this.bag = [];

    this.kill = function(victim){
        victim.die();
        this.bag.push(victim);
        this.skills++;
        console.log("I have killed him!");
    }

    this.hunt = function(victim) {
        if (victim._lifeStatus === "alive") {
            switch (victim._type) {
                case("mouse"):
                    if (this.skills > 10) {
                        this.kill(victim);
                    } else if (victim.speed < 10) {
                        this.kill(victim);
                    }
                    break;
                case("eagle"):
                    if (this.skills > 10 && victim.speed < 40) {
                        this.kill(victim);
                    }
                    break;
                case("deer"):
                    if (this.skills > 15) {
                        this.kill(victim);
                    } else if (this.skills > 10 && victim.speed < 30) {
                        this.kill(victim);
                    } else if (victim.speed < 10) {
                        this.kill(victim);
                    }
                    break;
                default:
                    this.skills++;
            }
        } else {
            console.log("These are the remains...")
        }
    }

    var humanEat = this.eat;
    this.eat = function(food) {
        var foodPos = this.bag.indexOf(food);
        if ( foodPos == -1) {
            console.log("There is not any " + food);
        } else {
            humanEat(food);
            this.bag.splice(foodPos, 1);
            food = null;
        }
    }

}

//*************************************************   Aborigine   *********************//

function Aborigine(health, mind) {

    Human.apply(this, arguments);

    this.type = "aborigine";

}
