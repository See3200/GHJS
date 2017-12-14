import Berry from "./berry.js";

class Bush {
    constructor(y, x, lengthY, lengthX, plantsList){
        this.posBushY = y;
        this.posBushX = x;
        this.posBush = 0;
        this.lengthY = lengthY;
        this.lengthX = lengthX;
        this.plantsList = plantsList;
        this.count = 0;
    }
    initialPosBush() {
        this.posBushY = Math.round(-0.5 + Math.random() * this.lengthY);
        this.posBushX = Math.round(-0.5 + Math.random() * this.lengthX);
        this.posBush = this.posBushY * this.lengthX + this.posBushX;
        if (!wrap.children[this.posBushY].children[this.posBushX].classList[0]) {
            this.plantsList[this.posBush] = this;
            wrap.children[this.posBushY].children[this.posBushX].className = "bush";
        } else {
            this.initialPosBush();
        }
    }
    grow() {
        if (this.count === 2) {
            wrap.children[this.posBushY].children[this.posBushX].className = "bush1";
        }
        if (((this.count - 2) % 4 === 0) && (this.count !== 2)) {
            let self = this;
            function appearBerry(){
                let randomX = Math.round(- 1.5 + Math.random() * 3);
                let randomY = Math.round(- 1.5 + Math.random() * 3);
                if ((randomY == 0 || randomY == -0) && (randomX == 0 || randomX == -0)) {
                    appearBerry();
                }
                let posBerryX = self.posBushX + randomX;
                let posBerryY = self.posBushY + randomY;

                if ( (posBerryY == self.lengthY) || (posBerryY == -1) || (posBerryX == self.lengthX) ||
                    (posBerryX == -1) || (wrap.children[posBerryY].children[posBerryX].classList[0])) {
                    return;
                } else {
                    self.bear(posBerryY, posBerryX);
                }
            }
            appearBerry();
        }
        this.count++
    }
    bear(posBerryY, posBerryX) {
        wrap.children[posBerryY].children[posBerryX].className = "berry";
        let posBerry = posBerryY * this.lengthX + posBerryX;
        this.plantsList[posBerry] = new Berry(posBerryY, posBerryX, this.lengthY, this.lengthX, this.plantsList);
    }
    die(posBush) {
        this.count = 0;
        wrap.children[this.posBushY].children[this.posBushX].className = "bush2";
        this.grow = function(){
            if (this.count === 2) {
                wrap.children[this.posBushY].children[this.posBushX].classList.remove("bush2");
                this.plantsList[posBush] = null;
            }
            this.count++;
        }
    }
}

export default Bush;