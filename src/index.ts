// GLOBAL VARS & TYPES
let capture: p5.Element;
let controls: HTMLElement = document.querySelector(".controls");
let indicador: HTMLElement = document.querySelector(".indicador");
let titulo: HTMLElement = document.querySelector("#titulo");
let desc: HTMLElement = document.querySelector("#desc");
let img: HTMLElement = document.querySelector("#img");

const p = document.createElement<"p">("p");
controls.appendChild(p);
let escenarios: any;
let counter = 0;
let colorActual: string;

function setup(): void {
  createCanvas(innerWidth, innerHeight);

  capture = createCapture(VIDEO);
  capture.size(600, 500);
  capture.hide();

  fetch("../db/db.json")
    .then((info) => info.json())
    .then((data) => (escenarios = data));
}

function draw(): void {
  background(0);
  image(capture, 0, 0, 600, 500);

  let zoom: p5.Image = get(mouseX, mouseY, 50, 50);
  let c = floor(hue(get(mouseX, mouseY)));

  image(zoom, mouseX, mouseY, 100, 100);

  colorActual = evaluarColor(c);

  indicador.style.left = `${c}px`;
  p.innerText = ` hue: ${c} color: ${colorActual}`;
}

const evaluarColor = (c: number): string => {
  if (c > 5 && c < 60) {
    return "naranja";
  } else if (c > 70 && c < 170) {
    return "verde";
  } else if (c >= 170 && c < 230) {
    return "azul";
  } else if (c > 250 && c < 330) {
    return "violeta";
  } else if (c > 335) {
    return "rojo";
  } else {
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
