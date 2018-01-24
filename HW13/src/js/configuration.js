const conf = {
    globeLengthY: 20,
    globeLengthX: 20,
    time: 1000,
    quantOfDeer: 4,
    quantOfMouse: 2,
    quantOfHunter: 1,
    quantOfTree: 7,
    quantOfBush: 7,
    timeAfterDeath: 5,
    intervalToAppearPlants: 0,
    setTime: function () {
        conf.time = +(document.getElementsByName("time")[0].value || conf.time);
    },
    setQuantOfTree: function () {
        conf.quantOfTree = +(document.getElementsByName("tree")[0].value || conf.quantOfTree);
    },
    setQuantOfBush: function () {
        conf.quantOfBush = +(document.getElementsByName("bush")[0].value || conf.quantOfBush);
    },
    setQuantOfDeer: function () {
        conf.quantOfDeer = +(document.getElementsByName("deer")[0].value || conf.quantOfDeer);
    },
    setQuantOfMouse: function () {
        conf.quantOfMouse = +(document.getElementsByName("mouse")[0].value || conf.quantOfMouse);
    },
    setQuantOfHunter: function () {
        conf.quantOfHunter = +(document.getElementsByName("hunter")[0].value || conf.quantOfHunter);
    },
    setIntervalToAppearPlants: function () {
        conf.intervalToAppearPlants = document.getElementsByName("delay")[0].checked;
    },
    setIntervalToAppearPlantsClose: function () {
        conf.intervalToAppearPlants = 2;
    },
};

export default conf;
