import conf from "./configuration.js";
import Tree from "./tree.js";
import Bush from "./bush.js";
import Deer from "./deer.js";
import Mouse from "./mouse.js";
import Hunter from "./hunter.js";
import style from "../style/main.css";
import checkPlugin from "../libs/checkPlugin";

let time = 0;
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

const initDeer = [];
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

function initializePlants() {
    if (conf.intervalToAppearPlants !== 2) {
        if (conf.intervalToAppearPlants) {
            if (count <= conf.quantOfTree) {
                let tree = new Tree(0, 0, conf.globeLengthY, conf.globeLengthX, storage);
                tree.initializePosition();
            }
            if (count <= conf.quantOfBush) {
                let bush = new Bush(0, 0, conf.globeLengthY, conf.globeLengthX, storage);
                bush.initializePosition();
            }
            if (!(count <= conf.quantOfTree) && !(count <= conf.quantOfBush)) conf.setIntervalToAppearPlantsClose();
        }
        else {
            let i = 0;
            while (i < conf.quantOfTree) {
                let tree = new Tree(0, 0, conf.globeLengthY, conf.globeLengthX, storage);
                tree.initializePosition();
                i++;
            }
            let j = 0;
            while (j < conf.quantOfBush) {
                let bush = new Bush(0, 0, conf.globeLengthY, conf.globeLengthX, storage);
                bush.initializePosition();
                j++;
            }
            conf.setIntervalToAppearPlantsClose();
        }
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

function workApp() {
    setInterval(live, time);
}

let btn = document.getElementById("run");
btn.addEventListener("click", runApp);

function runApp() {
    conf.setTime();
    conf.setQuantOfTree();
    conf.setQuantOfBush();
    conf.setIntervalToAppearPlants();
    conf.setQuantOfDeer();
    conf.setQuantOfMouse();
    conf.setQuantOfHunter();

    for (let i = 0; i < conf.quantOfDeer; i++) {
        let name = "deer" + i;
        initDeer.push(new Deer(conf.globeLengthY, conf.globeLengthX, storage, performList, name));
        initDeer[i].initializePosition();
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
    time = conf.time;
    workApp();
}

//**********************************   Drag-n-drop section   ******************************

$('document').ready(function() {

    let body = $(document.body);
    let wrap = $("#wrap");
    $("#entitiesBox [data-name]").on("mousedown", function(event) {
        let target = $(event.currentTarget);
        let helper = $(event.currentTarget).find("[data-img]");
        let clone = helper.clone();

        clone.css({
            width: helper.width() / 2,
            height: helper.height() / 2
        });

        let cloneWidth = clone.width();
        let cloneHeight = clone.height();
        clone.addClass("drag-clone");
        clone.offset({
            top: event.pageY - cloneHeight / 2,
            left: event.pageX - cloneWidth / 2
        });
        clone.appendTo(body);

        let entityItem = helper.closest("[data-name]");
        entityItem.addClass("dragging");

        let rect = wrap.offset();
        rect.right = rect.left + wrap.width();
        rect.bottom = rect.top + wrap.height();

        let cloneRect = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        };

        body.on("mousemove.dragEntity", function(event) {
            clone.css({
                top: event.pageY - cloneHeight/2,
                left: event.pageX - cloneWidth/2
            });
            cloneRect = clone.get(0).getBoundingClientRect();
            if (overlapsTargetArea(rect, cloneRect)) {
                wrap.addClass("overlaps");
            } else {
                wrap.removeClass("overlaps");
            }
        });

        let currentElem = null;
        wrap.on("mouseover", function(event) {
            let target = event.target;
            if (target.tagName === "SPAN") {
                currentElem = target;
                target.style.borderColor = 'red';
            }
        });

        wrap.on("mouseout", function() {
            if (!currentElem) return;
            currentElem.style.borderColor = '';
            currentElem = null;
        });

        body.on("mouseup.dragEntity", function() {

            if(currentElem && !currentElem.className) {
                let coorX = $(currentElem.closest("div")).children().index(currentElem);
                let coorY = $(wrap).children().index(currentElem.closest("div"));

                let constructorName = target.attr("data-name");
                if (constructorName === "tree") {
                    let tree = new Tree(0, 0, conf.globeLengthY, conf.globeLengthX, storage);
                    tree.initializePosition([coorY, coorX]);
                } else if (constructorName === "bush") {
                    let bush = new Bush(0, 0, conf.globeLengthY, conf.globeLengthX, storage);
                    bush.initializePosition([coorY, coorX]);
                } else if (constructorName === "deer") {
                    let name = "deer" + Date.now().toString().slice(9);
                    let deer = new Deer(conf.globeLengthY, conf.globeLengthX, storage, performList, name);
                    deer.initializePosition([coorY, coorX]);
                    createBlockinfo(name);
                } else if (constructorName === "mouse") {
                    let name = "mouse" + Date.now().toString().slice(9);
                    let mouse = new Mouse(conf.globeLengthY, conf.globeLengthX, storage, performList, name);
                    mouse.initializePosition([coorY, coorX]);
                    createBlockinfo(name);
                } else if (constructorName === "hunter") {
                    let name = "hunter" + Date.now().toString().slice(9);
                    let hunter = new Hunter(conf.globeLengthY, conf.globeLengthX, storage, performList, name);
                    hunter.initializePosition([coorY, coorX]);
                    createBlockinfo(name);
                }
                currentElem.style.borderColor = '';
            }

            clone.remove();
            entityItem.removeClass("dragging");
            wrap.removeClass("overlaps");

            body.off("mousemove.dragEntity");
            body.off("mouseup.dragEntity");
            wrap.off("mouseover");
            wrap.off("mouseout");
        });
    });

    function overlapsTargetArea(rect1, rect2) {
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }

});

//*********************   Checkbox   ************************
$("input[type = 'checkbox']").checkPlugin();
