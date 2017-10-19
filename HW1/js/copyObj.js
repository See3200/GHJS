//*************   Copying the object   ********************

// initObj (object) - an object from which properties are copied
// resObj (object) - an object into which the properties are copied
function copyObj(initObj, resObj) {
    for (var key in initObj) {
        resObj[key] = initObj[key];
    }
}
var a = {
    name: "John",
    age: 34
};
var b = {}; // new object
copyObj(a, b);

alert(b.name); // "John"
