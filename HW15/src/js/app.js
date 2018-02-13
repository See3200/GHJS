import style from "../style/main.css";


function submitForm1(e) {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let formData = new FormData(document.forms.form1);
    let quantSymbols = document.getElementById("#quantForm1");
    quantSymbols.textContent = formData.length;

    xhr.onreadystatechange = function() {
        let cont = document.getElementById("content");
        cont.innerHTML = xhr.responseText;
        alert("Response is:" + xhr.responseText);
    };

    xhr.send(formData);
}

let subForm1 = document.getElementsByName("form1");
subForm1.addEventListener("submit", submitForm1);


function submitForm2(e) {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let formData = new FormData(document.forms.form2);
    let quantSymbols = document.getElementById("#quantForm2");
    quantSymbols.textContent = formData.length;

    xhr.onreadystatechange = function() {
        let cont = document.getElementById("content");
        cont.innerHTML = xhr.responseText;
        alert("Response is:" + xhr.responseText);
    };

    xhr.send(formData);
}

let subForm2 = document.getElementsByName("form2");
subForm2.addEventListener("submit", submitForm2);

