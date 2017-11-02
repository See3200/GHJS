// logPropChanges (function) - function for logging changes of properties

function logPropChanges(obj) {
    var temp = {};
    for (var key in obj) {
        temp[key] = obj[key];
        Object.defineProperty(obj, key, {
            get: function () {
                console.log("Свойство " + this + " прочитано.");
                return temp[this];
            }.bind(key),
            set: function (val) {
                temp[this] = val;
                console.log("Свойство " + this + " перезаписано.");
            }.bind(key)
        })
    }
}
