import Bush from "./bush.js";

class Berry {
    constructor(posBerryY, posBerryX, lengthY, lengthX, plantsList) {
        this.posBerryY = posBerryY;
        this.posBerryX = posBerryX;
        this.lengthY = lengthY;
        this.lengthX = lengthX;
        this.plantsList = plantsList;
        this.count = 0;
        this.posBerry = posBerryY * this.lengthX + posBerryX;
    }
    grow() {
        if (this.count === 4) {
            wrap.children[this.posBerryY].children[this.posBerryX].className = "deadBerry";
        }
        if (this.count === 8) {
            this.plantsList[this.posBerry] = new Bush(this.posBerryY, this.posBerryX,
                this.lengthY, this.lengthX, this.plantsList);
            wrap.children[this.posBerryY].children[this.posBerryX].className = "bush";
        }
        this.count++;
    }
    die(posBerry, animal) {
        this.count = 0;
        wrap.children[this.posBerryY].children[this.posBerryX].className = "berry1";
        if (animal === "mouse") {
            this.grow = function(){
                if (this.count === 4) {
                    wrap.children[this.posBerryY].children[this.posBerryX].classList.remove("berry1");
                    this.plantsList[posBerry] = null;
                }
                this.count++;
            }
        }
    }
}

export default Berry;
