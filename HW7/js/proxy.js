let weakmap = new WeakMap();

function proxyClass(obj) {

    return new Proxy(obj, {
        construct: function(target, argumentsList) {
            let descendant = new obj(...argumentsList);
            weakmap.set(descendant, argumentsList);
            return descendant;
        }
    });
}

class CreateDiv {
    constructor(width, height, name) {
        this.width = width;
        this.height = height;
        this.name = name;
    }
    createElem() {
        let div = document.createElement("div");
        div.style.width= this.width + "px";
        div.style.height= this.height + "px";
        div.innerHTML = `${this.name}`;
        document.body.appendChild(div);
    }
}

class CreateDiv2 {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
CreateDiv = proxyClass(CreateDiv);
CreateDiv2 = proxyClass(CreateDiv2);

let div1 = new CreateDiv(100, 50, "DIV");
let div2 = new CreateDiv2(90, 45);

console.log(weakmap.get(div1));
console.log(weakmap.get(div2));

