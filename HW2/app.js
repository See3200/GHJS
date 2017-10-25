// addEvent (function) - adds an event
// FlexElement (function) - constructor which creates objects for realization a flex element
// this.justifyHeight (function) - method which reduce height of the element in accordance with changes in the width of the element
// this.setDescriptorFlex (function) - define properties of the object
// FlexElement.startFlexElement (function) - method which creates new objects
// flexTable (object) - new object for realization a flex element
// checkAttrTable (function) - check if the button which turns on the flexibility is pressed
// reduceTable (function) - reduces the size of the table twice
// checkFlexTable (function) - decorator which adds the function for checking if the button is on or not

var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};
/***********************************  for button with id "onFlexTable" ****************************************/

function FlexElement(elem) {
    var selector = document.querySelector(elem);
    var initialElementWidth = 0;
    var initialElementHeight = 0;
    this.setInitialElementWidth = function() {
        initialElementWidth = selector.offsetWidth;
    };
    this.setInitialElementHeight = function() {
        initialElementHeight = selector.offsetHeight;
    };
    this.toString = function() {
        return elem;
    };
    this.valueOf = function(){
        return selector.offsetWidth;
    };
    this.toJSON = function() {
        return {
            iniElementWidth: initialElementWidth,
            iniElementHeight: initialElementHeight
        }
    };
    this.justifyHeight = function() {
        var coef = ((selector.offsetWidth) / initialElementWidth).toFixed(3);
        selector.style.height = coef * initialElementHeight + "px";
    };
    this.setDescriptorFlex = function() {
        Object.defineProperty(this, "toString", {enumerable: false});
        Object.defineProperty(this, "valueOf", {enumerable: false});
        Object.defineProperty(this, "constructor", {value: "FlexElement"});
    };
}

FlexElement.startFlexElement = function() {
    var flexTable = new FlexElement(".plastic");
    addEvent(window, "resize", flexTable.justifyHeight);
    addEvent(elemTable, "mousemove", flexTable.setInitialElementWidth);
    addEvent(elemTable, "mousemove", flexTable.setInitialElementHeight);
    addEvent(elemTable, "mousemove", flexTable.setDescriptorFlex);
    elemTable.removeEventListener("click", FlexElement.startFlexElement);
    var targ = event.target;
    targ.setAttribute("flex", "on");
    return flexTable;
};

var elemTable = document.querySelector("#onFlexTable");
addEvent(elemTable, "click", FlexElement.startFlexElement);


/*********************************  for button with id "onReduceTable"  *****************************************/

function checkAttrTable() {
    var elemTarg = document.querySelector("#onFlexTable");
    if (elemTarg.getAttribute("flex") === "on") {
        return 0;
    } else {
        return 1;
    }
}

function reduceTable() {
    var selector = document.querySelector(".plastic");
    var initialElementWidth = selector.offsetWidth;
    var initialElementHeight = selector.offsetHeight;
    selector.style.width = initialElementWidth / 2 + "px";
    selector.style.height = initialElementHeight / 2 + "px";
}

function checkFlexTable(f) {
    return function() {
        if (checkAttrTable()) {
            return f.apply(this, arguments);
        } else {
            alert("You already cannot reduce the table. Flexibility is on!");
        }
    }
}

reduceTable = checkFlexTable(reduceTable);

var elemBlock = document.querySelector("#onReduceTable");
addEvent(elemBlock, "click", reduceTable);