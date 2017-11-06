function Animal (health) {

    this._lifeStatus = "alive";
    this.health = health;
}

Animal.prototype.eat = function() {
    this.health++;
    console.log("My stomach is happy!");
};

Animal.prototype.die = function() {
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

Animal.prototype.fight = function(rival) {
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


//*******************************************   Mouse   ************************//

function Mouse(health, speed) {

    Animal.apply(this, arguments);

    this.speed = speed;
    this._type = "mouse";

}

Mouse.prototype = Object.create(Animal.prototype);
Mouse.prototype.constructor = Mouse;

Mouse.prototype.eat = function(food) {
    if (food === "corn") {
        Animal.prototype.eat.apply(this, arguments);
    } else {
        return console.log("It is not my food...");
    }
}

Mouse.prototype.fight = function() {
    return console.log("I do not fight!")
}

//------------------------------------------   Eagle   -----------------------//

function Eagle(health, speed, vigilance) {

    Animal.apply(this, arguments);

    this.speed = speed;
    this.vigilance = vigilance;
    this._type = "eagle";

}

Eagle.prototype = Object.create(Animal.prototype);
Eagle.prototype.constructor = Eagle;

Eagle.prototype.eat = function(food) {
    if (food._lifeStatus === "alive") {
        if (food.type === "mouse" && (this.vigilance > 0 || food.speed > 0)) {
            Animal.prototype.eat.apply(this, arguments);
        } else {
            return console.log("It is not my food...");
        }
    } else {
        return console.log("I am not a vulture!")
    }
}

Eagle.prototype.fight = function() {
    return console.log("I do not fight!")
}

//**********************************************   Deer   **********************//

function Deer(health, speed) {

    Animal.apply(this, arguments);

    this.speed = speed;
    this._type = "deer";

}

Deer.prototype = Object.create(Animal.prototype);
Deer.prototype.constructor = Deer;

Deer.prototype.eat = function(food) {
    if (food === "plant") {
        Animal.prototype.eat.apply(this, arguments);
    } else {
        return console.log("It is not my food...");
    }
}

//*********************************************   Human   ************************//

function Human(health, mind) {

    Animal.apply(this, arguments);

    this.mind = mind;

}

Human.prototype = Object.create(Animal.prototype);
Human.prototype.constructor = Human;

Human.prototype._setMind = function(level) {
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

Human.prototype.eat = function(food) {
    if (food.type === "mouse" || food.type === "eagle") {
        Human.prototype._setMind.call(this);
        console.log("Bue-e-e...");
    } else if (food._type === "deer") {
        Human.prototype._setMind.call(this, 1);
        Animal.prototype.eat.apply(this, arguments);
    }
}

//*************************************************   Hunter   *************************//

function Hunter(health, mind, skills) {

    Human.apply(this, arguments);

    this.type = "hunter";
    this.skills = skills;
    this.bag = [];

}

Hunter.prototype = Object.create(Human.prototype);
Hunter.prototype.constructor = Hunter;

Hunter.prototype.kill = function(victim, self){
    victim.die();
    self.bag.push(victim);
    self.skills++;
    console.log("I have killed him!");
}

Hunter.prototype.hunt = function(victim) {
    if (victim._lifeStatus === "alive") {
        switch (victim._type) {
            case("mouse"):
                if (this.skills > 10) {
                    Hunter.prototype.kill(victim, this);
                } else if (victim.speed < 10) {
                    Hunter.prototype.kill(victim, this);
                }
                break;
            case("eagle"):
                if (this.skills > 10 && victim.speed < 40) {
                    Hunter.prototype.kill(victim, this);
                }
                break;
            case("deer"):
                if (this.skills > 15) {
                    Hunter.prototype.kill(victim, this);
                } else if (this.skills > 10 && victim.speed < 30) {
                    Hunter.prototype.kill(victim, this);
                } else if (victim.speed < 10) {
                    Hunter.prototype.kill(victim, this);
                }
                break;
            default:
                this.skills++;
        }
    } else {
        return console.log("These are the remains...")
    }
}

Hunter.prototype.eat = function(food) {
    var foodPos = this.bag.indexOf(food);
    if ( foodPos == -1) {
        console.log("There is not any food");
    } else {
        Human.prototype.eat.apply(this, arguments);
        this.bag.splice(foodPos, 1);
        food = null;
    }
}

//*********************************************   Aborigine   **************************//

function Aborigine(health, mind) {

    Human.apply(this, arguments);

    this.type = "aborigine";

}

Aborigine.prototype = Object.create(Human.prototype);
Aborigine.prototype.constructor = Aborigine;

Aborigine.prototype.terror = function(time) {
    var time = time || 3000;
    var win = document.defaultView;
    console.log("Allah akbar!!!");
    setTimeout(win.Aborigine.prototype.die, time);
}
