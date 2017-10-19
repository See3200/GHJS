
//*****************   Benchmarking   *********************

var obj1 = {};
var obj2 = {};
var arr1 = [];

for (var i = 0; i < 100000; i++) {
    obj1[i] = Math.floor(Math.random() * 1000).toString();
}

for (var i = 0; i < 100000; i++) {
    arr1[i] = Math.floor(Math.random() * 1000).toString();
}

for (var i = 0; i < arr1.length; i++) {
    var key = "a" + (arr1[i] * Math.random());
    obj2[key] = Math.floor(Math.random() * 1000).toString();
}


function walkIn(obj) {
    var quant = 0;
    for (var key in obj) {
        quant++;
    }
}

function walkForArr(arr) {
    var quant = 0;
    for (var i = 0; i < arr.length; i++) {
        quant++
    }
}

function walkForObj(obj) {
    var quant = 0;
    for (var i = 0; i < 100000; i++) {
        quant++;
    }
}

function bench(f) {
    var date = new Date();
    for (var i = 0; i < 100; i++) {
        f();
    }
    return new Date() - date;
}

var timeInObj1 = 0,
    timeInObj2 = 0,
    timeInArr = 0,
    timeForObj1 = 0,
    timeForObj2 = 0,
    timeForArr = 0;

for (var i = 0; i < 100; i++) {
    timeInObj1 += bench(walkIn(obj1));
    timeInObj2 += bench(walkIn(obj2));
    timeInArr += bench(walkIn(arr1));
    timeForObj1 += bench(walkForObj(obj1));
    timeForObj2 += bench(walkForObj(obj2));
    timeForArr += bench(walkForArr(arr1));
}

alert('Время walkIn для obj1: ' + timeInObj1 + 'мс');
alert('Время walkIn для obj2: ' + timeInObj2 + 'мс');
alert('Время walkIn для arr1: ' + timeInArr + 'мс');
alert('Время walkForObj для obj1: ' + timeForObj1 + 'мс');
alert('Время walkForObj для obj2: ' + timeForObj2 + 'мс');
alert('Время walkForArr для arr1: ' + timeForArr + 'мс');
