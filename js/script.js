// Array de palabras
let posiblesPalabras = [
  ["amarillo", "Un color"],
  ["atlantico", "Un océano"],
  ["ordenador", "Una gran herramienta  ;)"],
  ["laurel", "Un árbol"],
  ["plaza", "Espacio público"],
  ["avenida", "Espacio público"],
  ["calle", "Espacio público"],
  ["desarrolador", "Una profesión"],
  ["rueda", "Gran invento"],
  ["cereza", "Una fruta"],
  ["petanca", "Un juego"],
  ["pintor", "Una profesión"],
  ["naranjo", "Un árbol"],
  ["higuera", "Un árbol"],
  ["everest", "Un monte"],
  ["relampago", "Antecede al trueno"],
  ["jirafa", "Un animal"],
  ["nogal", "Un árbol"],
  ["tigre", "Un animal"],
  ["elefante", "Un animal"],
  ["mosquito", "Un insecto"],
  ["caballo", "Un animal"],
  ["rinoceronte", "Un animal"],
  ["portugal", "Un país"],
  ["españa", "Un país"],
  ["noruega", "Un país"],
  ["italia", "Un país"],
  ["rusia", "Un país"],
  ["uruguay", "Un país"],
  ["ilustracion", "Representación gráfica"],
  ["tarta", "De la pastelería"],
  ["pepito", "De la pastelería"],
  ["excursion", "Actividad en la naturaleza"],
  ["empanadilla", "De la panadería"],
  ["pastel", "De la pastelería"],
  ["colegio", "Lugar para estudiar"],
  ["carrera", "Competición"],
  ["mermelada", "Confitura"],
];

let abecedario = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "Ñ",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

/* En este ejercicio tener en cuenta trabajo con cadenas de texto */

// Variables globales

let palabrasecreta = ""; // Palabra aleatoria que obtenemos del array de posibles palabras
let posicion; // Posicion de la palabra que obtenemos del array de posibles palabras
let palabraoculta = ""; // Palabra que con los aciertos y los guiones que mostramos en pantalla

// Para mostrar el estado de aciertos
let palabra = document.getElementById("palabra");

// Contador de intentos
let cont = 6;

// Botones de letras
let buttons;

// Boton para volver a iniciar el juego
let inicio = document.getElementById("inicio");

let botonera = document.getElementById("botonera");
let intentos = document.getElementById("intentos");
let imagen = document.getElementById("imagen");
let pista = document.getElementById("pista");

// principal del programa
const iniciarJuego = () => {
  crearBotonesLetras();
  generarPalabraSecreta();
  escribirGuiones();
  intentos.textContent = 6;
};

// Genera una palabra al azar dentro del array de palabras
const generarPalabraSecreta = () => {
  posicion = Math.floor(Math.random() * posiblesPalabras.length);
  palabrasecreta = posiblesPalabras[posicion][0].toUpperCase();
  console.log("La palabra secreta es " + palabrasecreta);
};

// Funcion para pintar los guiones de la palabra
const escribirGuiones = () => {
  /*   palabra.textContent = "";
  for (let i = 0; i < palabrasecreta.length; i++) {
    palabraoculta += "_";
  }
  palabra.textContent = palabraoculta; */

  // Relleno con guiones
  let guion = "_";
  palabraoculta = guion.repeat(palabrasecreta.length);
  // Muestro la palabra oculta por pantalla
  palabra.textContent = palabraoculta;
};

//Generar abecedario
const crearBotonesLetras = () => {
  let boton;
  let fragment = document.createDocumentFragment();
  abecedario.forEach((letra) => {
    boton = document.createElement("BUTTON");
    /*   boton.className =
      "tamanio-botones btn btn-outline-success m-1 font-weight-bold"; */
    boton.classList.add(
      "tamanio-botones",
      "btn",
      "btn-outline-success",
      "m-1",
      "font-weight-bold"
    );
    boton.textContent = letra;
    fragment.appendChild(boton);
  });
  botonera.appendChild(fragment);
};

// tratar click
const tratarClick = (event) => {
  let botonPulsado = event.target;
  let letra = botonPulsado.textContent;

  if (botonPulsado.nodeName === "BUTTON") {
    // Borramos la clase bootstrap para el botón, para poder añadir la nueva con el error o acierto
    botonPulsado.classList.remove("btn-outline-success");
    // Si no lo encuentra, no hace falta recorrerlo
    if (palabrasecreta.indexOf(letra) != -1) {
      palabra.textContent = "";
      // Si palabra tiene varias letras iguales
      for (let i = 0; i < palabrasecreta.length; i++) {
        if (palabrasecreta[i] === letra) {
          // No existe un splice para strings
          palabraoculta =
            palabraoculta.substring(0, i) + letra + palabraoculta.substring(i + 1);
        }
      }
      palabra.textContent = palabraoculta;
      botonPulsado.classList.add("btn-success");
    }
    // Si no lo encuentra cambiamos imagen y decrementamos contador
    else {
      botonPulsado.classList.add("btn-danger");
      // botonPulsado.className = "tamanio-botones btn  m-1";
     
      intentos.textContent = --cont;
      imagen.src = "imagenes/ahorcado_" + cont + ".png";
    }
    // Deshabilitamos el boton
    botonPulsado.disabled = true;
  }
  finalizarJuego();
};

// Recargar la pagina
const recargaPagina = () => {
  location.reload(true);
};

// Mostar  pista
const mostrarPista = () => {
  document.getElementById("texto-pista").textContent =
    posiblesPalabras[posicion][1];
};

// Comprueba si ha finalizado
const finalizarJuego = () => {
  if (palabraoculta.indexOf("_") == -1) {
    botonera.classList.add("cabecera");
    inicio.textContent = "Empezar";
    botonera.textContent = "FELICIDADES";
  } else {
    if (cont == 0) {
      botonera.classList.add("cabecera");
      botonera.textContent = "No has acertado!!!";
      palabra.textContent = "La palabra era: " + palabrasecreta;
    }
  }
};

// Eventos
document.addEventListener("DOMContentLoaded", iniciarJuego);
botonera.addEventListener("click", tratarClick);
pista.addEventListener("click", mostrarPista);
inicio.addEventListener("click", recargaPagina);
