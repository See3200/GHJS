
//*****************   Benchmarking   *********************

var obj1 = {};
var obj2 = {};
var arr1 = [];

for (var i = 0; i < 10000; i++) {
    obj1[i] = "something" + i;
}

for (var i = 0; i < 10000; i++) {
    arr1[i] = "something" + i;
}

for (var i = 0; i < 10000; i++) {
    var key = "something" + i;
    obj2[key] = "something" + i;
}


function walkIn(obj) {
    for (var key in obj) {
        obj[key] = 'key' + i + i;
    }
}

function walkForArr(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i] = 'key' + i + i;
    }
}

function walkForObj(obj) {
    var objKeys = Object.keys(obj);
    var length = Object.keys(obj).length;
    for (var i = 0; i < length; i++) {
        var key = objKeys[i];
        obj[key] = 'key' + i + i;
    }
}

function bench(f, obj) {
    var date = new Date();
    for (var i = 0; i < 1000; i++) {
        f(obj);
    }
    return new Date() - date;
}

var timeInObj1 = bench(walkIn, obj1);
    timeInObj2 = bench(walkIn, obj2);
    timeInArr = bench(walkIn, arr1);
    timeForObj1 = bench(walkForObj, obj1);
    timeForObj2 = bench(walkForObj, obj2);
    timeForArr = bench(walkForArr, arr1);

console.log('Время walkIn для obj1: ' + timeInObj1 + 'мс');
console.log('Время walkIn для obj2: ' + timeInObj2 + 'мс');
console.log('Время walkIn для arr1: ' + timeInArr + 'мс');
console.log('Время walkForObj для obj1: ' + timeForObj1 + 'мс');
console.log('Время walkForObj для obj2: ' + timeForObj2 + 'мс');
console.log('Время walkForArr для arr1: ' + timeForArr + 'мс');
