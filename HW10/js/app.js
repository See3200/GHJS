
import Tree from "./tree.js";
import Fruit from "./fruit.js";
import Bush from "./bush.js";
import Berry from "./berry.js";
import Deer from "./deer.js";
import Mouse from "./mouse.js";

const time = 500;
let count = 0;
const globeLengthY = 20;
const globeLengthX = 20;

const storage = [];
let performList = new Map();

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
const counter = document.getElementById("counter");

const tree = new Tree(0, 0, globeLengthY, globeLengthX, storage);
const tree1 = new Tree(0, 0, globeLengthY, globeLengthX, storage);
const tree2 = new Tree(0, 0, globeLengthY, globeLengthX, storage);
const tree3 = new Tree(0, 0, globeLengthY, globeLengthX, storage);
const bush = new Bush(0, 0, globeLengthY, globeLengthX, storage);
const bush1 = new Bush(0, 0, globeLengthY, globeLengthX, storage);
const bush2 = new Bush(0, 0, globeLengthY, globeLengthX, storage);
const bush3 = new Bush(0, 0, globeLengthY, globeLengthX, storage);
const deer = new Deer(globeLengthY, globeLengthX, storage, performList);
const mouse = new Mouse(globeLengthY, globeLengthX, storage, performList);

tree.initializePosition();
tree1.initializePosition();
tree2.initializePosition();
tree3.initializePosition();

bush.initializePosition();
bush1.initializePosition();
bush2.initializePosition();
bush3.initializePosition();

deer.initializePosition();
mouse.initializePosition();

function live() {
    count++;

    for (let x of storage) {
        if (x) {
            x.live();
        }
    }
    for (let x of performList.values()) {
        x();
    }
    deerSat.textContent = deer.satiety;
    deerHeal.textContent = deer.health;
    mouseSat.textContent = mouse.satiety;
    mouseHeal.textContent = mouse.health;
    counter.textContent = count;
}

setInterval(live, time);