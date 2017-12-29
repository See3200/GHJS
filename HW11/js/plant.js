class Plant {
    constructor(y, x, lengthY, lengthX, storage){
        this.positionY = y;
        this.positionX = x;
        this.position = 0;
        this.lengthY = lengthY;
        this.lengthX = lengthX;
        this.storage = storage;
        this.count = 0;
        this.className = "";
        this.classNameChild = "";
        this.flag = 0;
        this.duration = 0;
    }

    initializePosition() {
        this.positionY = Math.round(-0.5 + Math.random() * this.lengthY);
        this.positionX = Math.round(-0.5 + Math.random() * this.lengthX);
        if (!wrap.children[this.positionY].children[this.positionX].classList[0]) {
            this.position = this.positionY * this.lengthX + this.positionX;
            this.storage[this.position] = this;
            wrap.children[this.positionY].children[this.positionX].className = this.className;
        } else {
            this.initializePosition();
        }
    }

    grow() {
        if (this.count === 2) {
            wrap.children[this.positionY].children[this.positionX].className = this.className + 1;
        }
        if (((this.count - 2) % 4 === 0) && (this.count !== 2)) {
            let self = this;
            function definePosChild(){
                let randomX = Math.round(- 1.5 + Math.random() * 3);
                let randomY = Math.round(- 1.5 + Math.random() * 3);
                if ((randomY == 0 || randomY == -0) && (randomX == 0 || randomX == -0)) {
                    definePosChild();
                }
                let posChildX = self.positionX + randomX;
                let posChildY = self.positionY + randomY;

                if ( (posChildY == self.lengthY) || (posChildY == -1) || (posChildX == self.lengthX) ||
                    (posChildX == -1) || (wrap.children[posChildY].children[posChildX].classList[0])) {
                    return;
                } else {
                    self.bear(posChildY, posChildX);
                }
            }
            definePosChild();
        }
        this.count++
    }

    bear(posChildY, posChildX) {
        wrap.children[posChildY].children[posChildX].className = this.classNameChild;
    }

    beExposed(n) {
        this.flag = 1;
        this.duration = n;
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
        this.count++;
    }

    die(className) {
        wrap.children[this.positionY].children[this.positionX].classList.remove(className);
        wrap.children[this.positionY].children[this.positionX].style.opacity = "1";
    }

    resetCount() {
        this.count = 0;
    }

    recover() {
        this.flag = 2;
        if (this.count === 3) {
            this.flag = 0;
            wrap.children[this.positionY].children[this.positionX].className = this.className + 1;
        } else if (this.count === 1) {
            wrap.children[this.positionY].children[this.positionX].style.opacity = 1;
            wrap.children[this.positionY].children[this.positionX].className = this.className + 2;
        }
        this.count++;
    }

    live() {
        if (!this.flag) {
            return this.grow();
        } else if (this.flag === 1) {
            return this.beExposed(this.duration);
        } else {
            return this.recover();
        }
    }
}

export default Plant;