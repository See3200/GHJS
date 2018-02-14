import style from "../style/main.css";


function submitForm1(e) {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    let data = document.querySelector("input[name=name1]").value;
    xhr.open('GET', '/get?' + "value=" + data, true);
    let quantSymbols = document.getElementById("quantForm1");
    quantSymbols.textContent = data.length;

    xhr.onreadystatechange = function() {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            let cont = document.getElementById("content");
            cont.innerHTML = xhr.responseText;
            alert("Response is:" + xhr.responseText);
        }
    };
    xhr.send();
}

let subForm1 = document.getElementsByName("form1")[0];
subForm1.addEventListener("submit", submitForm1);


function submitForm2(e) {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    let data = document.querySelector("input[name=name2]").value;
    let quantSymbols = document.getElementById("quantForm2");
    quantSymbols.textContent = data.length;

    xhr.onreadystatechange = function() {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            let cont = document.getElementById("content");
            cont.innerHTML = xhr.responseText;
            alert("Response is:" + xhr.responseText);
        }
    };

    xhr.send(JSON.stringify({value: data}));
}

let subForm2 = document.getElementsByName("form2")[0];
subForm2.addEventListener("submit", submitForm2);

