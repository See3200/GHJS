import Tree from "./tree.js";
import Fruit from "./fruit.js";
import Bush from "./bush.js";
import Berry from "./berry.js";
import Deer from "./deer.js";
import Mouse from "./mouse.js";

const time = 1000;

const globeLengthY = 20;
const globeLengthX = 20;

const plantsList = [];
const animalsList = new Map();
const tempList = new Map();

let output = ``;

for (let y = 0; y < globeLengthY; y++) {
    output += `<div class="row">`;
    for (let x = 0; x < globeLengthX; x++) {
        output += `<span></span>`;
    }
    output += `</div>`;
}

const wdiv = document.createElement("div");
wdiv.classList.add("wrapper");
wdiv.id = "wrap";
document.body.appendChild(wdiv);
wdiv.innerHTML = output;
const wrap = document.getElementById("wrap");

const deerSat = document.getElementById("deerSatiety");
const deerHeal = document.getElementById("deerHealth");
const mouseSat = document.getElementById("mouseSatiety");
const mouseHeal = document.getElementById("mouseHealth");

const tree = new Tree(0, 0, globeLengthY, globeLengthX, plantsList);
const tree1 = new Tree(0, 0, globeLengthY, globeLengthX, plantsList);
const tree2 = new Tree(0, 0, globeLengthY, globeLengthX, plantsList);
const tree3 = new Tree(0, 0, globeLengthY, globeLengthX, plantsList);
const tree4 = new Tree(0, 0, globeLengthY, globeLengthX, plantsList);
const bush = new Bush(0, 0, globeLengthY, globeLengthX, plantsList);
const bush1 = new Bush(0, 0, globeLengthY, globeLengthX, plantsList);
const bush2 = new Bush(0, 0, globeLengthY, globeLengthX, plantsList);
const bush3 = new Bush(0, 0, globeLengthY, globeLengthX, plantsList);
const deer = new Deer(globeLengthY, globeLengthX, plantsList, animalsList, tempList, "deer");
const mouse = new Mouse(globeLengthY, globeLengthX, plantsList, animalsList, tempList, "mouse");

tree.initialPosTree();
tree1.initialPosTree();
tree2.initialPosTree();
tree3.initialPosTree();
tree4.initialPosTree();

bush.initialPosBush();
bush1.initialPosBush();
bush2.initialPosBush();
bush3.initialPosBush();

deer.initialPosDeer();
mouse.initialPosMouse();

function live() {

    for (let i = 0; i < plantsList.length; i++) {
        let x = plantsList[i];
        if (x) {
            if ((x instanceof Tree) || (x instanceof Fruit) || (x instanceof Bush) || (x instanceof Berry)) {
                x.grow();
            }
        }
    }
    for (let animal of animalsList.values()){
        if ( (animal instanceof Deer) || (animal instanceof Mouse) ) {
            animal.move();
        }
    }
    for (let task of tempList.values()) {
        task();
    }
    deerSat.textContent = deer.satiety;
    deerHeal.textContent = deer.health;
    mouseSat.textContent = mouse.satiety;
    mouseHeal.textContent = mouse.health;
}

setInterval(live, time);