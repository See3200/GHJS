class Fetus {
    constructor(positionY, positionX, lengthY, lengthX, storage) {
        this.positionY = positionY;
        this.positionX = positionX;
        this.position = 0;
        this.lengthY = lengthY;
        this.lengthX = lengthX;
        this.storage = storage;
        this.count = 0;
        this.parent = null;
        this.parentClass = "";
        this.className = "";
        this.flag = 0;
        this.count = 0;
    }

    grow() {
        if (this.count === 4) {
            wrap.children[this.positionY].children[this.positionX].className = this.className + 1;
        }
        if (this.count === 8) {
            this.position = this.positionY * this.lengthX + this.positionX;
            this.storage[this.position] = new this.parent(this.positionY, this.positionX,
                this.lengthY, this.lengthX, this.storage);
            wrap.children[this.positionY].children[this.positionX].className = this.parentClass;
        }
        this.count++;
    }

    beExposed(n) {
        this.flag = 1;
        this.duration = n;
        this.count++;
        let elem = wrap.children[this.positionY].children[this.positionX];
        let className = elem.className;
        let difOpacity = Math.ceil(1 / (this.duration + 1) * 100) / 100;
        let opacity = window.getComputedStyle(elem, null).getPropertyValue("opacity");

        if (this.count < this.duration) {
            wrap.children[this.positionY].children[this.positionX].style.opacity = (opacity - difOpacity).toString();
        } else {
            this.die(className);
        }
        if (wrap.children[this.positionY].children[this.positionX].style.opacity < 0) {
            wrap.children[this.positionY].children[this.positionX].style.opacity = 0;
        }
    }

    die(className) {
        wrap.children[this.positionY].children[this.positionX].classList.remove(className);
        wrap.children[this.positionY].children[this.positionX].style.opacity = "1";
        this.position = this.positionY * this.lengthX + this.positionX;
        this.storage[this.position] = null;
    }

    recover() {
        this.flag = 0;
        this.count = 3;
        wrap.children[this.positionY].children[this.positionX].style.opacity = 1;
        wrap.children[this.positionY].children[this.positionX].className = this.className + 2;
    }

    resetCount() {
        this.count = 0;
    }

    live() {
        if (!this.flag) {
            return this.grow();
        } else if (this.flag === 1) {
            return this.beExposed(this.duration);
        }
    }
}

export default Fetus;