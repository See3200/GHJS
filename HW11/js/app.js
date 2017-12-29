import conf from "./configuration.js";
import Tree from "./tree.js";
import Bush from "./bush.js";
import Deer from "./deer.js";
import Mouse from "./mouse.js";
import Hunter from "./hunter.js";

const time = conf.time;
let count = 0;

const storage = [];
const performList = new Map();

let output = ``;

for (let y = 0; y < conf.globeLengthY; y++) {
    output += `<div class="row">`;
    for (let x = 0; x < conf.globeLengthX; x++) {
        output += `<span></span>`;
    }
    output += `</div>`;
}

const wdiv = document.createElement("div");
wdiv.classList.add("wrapper");
wdiv.id = "wrap";
let mainBlock = document.getElementById("main");
mainBlock.appendChild(wdiv);
wdiv.innerHTML = output;
const wrap = document.getElementById("wrap");

const counter = document.getElementById("counter");

const initDeers = [];
const initMice = [];
const initHunters = [];

function createBlockinfo(name) {
    let blockInfo = document.getElementById("infoTable").cloneNode(true);
    blockInfo.removeAttribute("id");
    blockInfo.setAttribute("id", name);
    document.getElementById("informList").appendChild(blockInfo);
    document.getElementById(name).classList.remove("hidden");
    document.querySelector(`#${name} .info-name`).textContent = name;
}
for (let i = 0; i < conf.quantOfDeer; i++) {
    let name = "deer" + i;
    initDeers.push(new Deer(conf.globeLengthY, conf.globeLengthX, storage, performList, name));
    initDeers[i].initializePosition();
    createBlockinfo(name);
}
for (let i = 0; i < conf.quantOfMouse; i++) {
    let name = "mouse" + i;
    initMice.push(new Mouse(conf.globeLengthY, conf.globeLengthX, storage, performList, name));
    initMice[i].initializePosition();
    createBlockinfo(name);
}
for (let i = 0; i < conf.quantOfHunter; i++) {
    let name = "hunter" + i;
    initHunters.push(new Hunter(conf.globeLengthY, conf.globeLengthX, storage, performList, name));
    initHunters[i].initializePosition();
    createBlockinfo(name);
}
function initializePlants() {
    if (count % conf.intervalToAppearPlants === 0 && count <= conf.quantOfTree * conf.intervalToAppearPlants) {
        let tree = new Tree(0, 0, conf.globeLengthY, conf.globeLengthX, storage);
        tree.initializePosition();
    }
    if (count % conf.intervalToAppearPlants === 0 && count <= conf.quantOfBush * conf.intervalToAppearPlants) {
        let bush = new Bush(0, 0, conf.globeLengthY, conf.globeLengthX, storage);
        bush.initializePosition();
    }
}

function live() {
    count++;

    initializePlants();
    for (let x of storage) {
        if (x) {
            x.live();
        }
    }
    for (let x of performList.values()) {
        x();
    }
    counter.textContent = count;
}

setInterval(live, time);