// GLOBAL VARS & TYPES
let capture;
let controls = document.querySelector(".controls");
let indicador = document.querySelector(".indicador");
let titulo = document.querySelector("#titulo");
let desc = document.querySelector("#desc");
let img = document.querySelector("#img");
const p = document.createElement("p");
controls.appendChild(p);
let escenarios;
let counter = 0;
let colorActual;
function setup() {
    createCanvas(innerWidth, innerHeight);
    capture = createCapture(VIDEO);
    capture.size(600, 500);
    capture.hide();
    fetch("https://daniel21dev.github.io/detector-de-colores/db/db.json")
        .then((info) => info.json())
        .then((data) => (escenarios = data));
}
function draw() {
    background(0);
    image(capture, 0, 0, 600, 500);
    let zoom = get(mouseX, mouseY, 50, 50);
    let c = floor(hue(get(mouseX, mouseY)));
    image(zoom, mouseX, mouseY, 100, 100);
    colorActual = evaluarColor(c);
    indicador.style.left = `${c}px`;
    p.innerText = ` hue: ${c} color: ${colorActual}`;
}
const evaluarColor = (c) => {
    if (c > 5 && c < 60) {
        return "naranja";
    }
    else if (c > 70 && c < 170) {
        return "verde";
    }
    else if (c >= 170 && c < 230) {
        return "azul";
    }
    else if (c > 250 && c < 330) {
        return "violeta";
    }
    else if (c > 335) {
        return "rojo";
    }
    else {
        return "otro";
    }
};
function keyReleased() {
    if (colorActual !== "otro") {
        let escenario = escenarios[colorActual][counter];
        titulo.innerText = escenario.nombre;
        desc.innerText = escenario.desc;
        img.src = escenario.src;
        counter < 2 ? counter++ : (counter = 0);
        console.log(counter);
    }
}
function windowResized() {
    createCanvas(innerWidth, innerHeight);
}
