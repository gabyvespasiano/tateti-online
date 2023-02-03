import {iswinner,ismyturn,turn,write,read,generate,buttons,link, paint, pide,menu} from './functions.js';

// Se asigna el valor 1 para "X" y el valor 2 para "O"
//1 == X
//2 == O

// Variables globales para mantener el estado del juego
export let ganador=0; // Ganador actual
export let turno = 1; // Jugador actual
export let jugador =0; // Jugador que seleccionó "X" o "O"
export let idpartida=0; // ID de la partida actual
export let tablero =   [0, 0, 0,
                        0, 0, 0,
                        0, 0, 0]; // Estado actual del tablero
export let juegoterminado = 0; // Indica si el juego ha terminado

// Referencias a los elementos HTML para actualizar la información en la página
export let Partida = document.getElementById("partida");
Partida.innerHTML = "Partida ID: ";
export let turno_div = document.getElementById("turno");
turno_div.innerHTML = "Turno del jugador: X";

// Muestra el menú principal
menu(true);

// Evento para cargar una partida dada su ID
document.getElementById("cargaid").addEventListener("click", function(e) {
    if (document.getElementById("partidai").value != ""){
        // Si se ingresó una ID, se oculta el menú y se carga la partida
        menu(false);
        idpartida = document.getElementById("partidai").value;
        link();
        read();
        cargarTablero();
    }else{
        // Si no se ingresó una ID, se muestra un mensaje de error
        alert("Ingrese una ID")
    }
    
});

// Evento para generar una nueva partida
document.getElementById("generaid").addEventListener("click", function(e) {
    // Se oculta el menú y se genera una nueva partida
    menu(false);
    idpartida = generate(4);
    link();
    read();
    cargarTablero();
});

// Evento para seleccionar "X"
document.getElementById("X").addEventListener("click", function(e) {    
    jugador=1;
    buttons(true);
    read();
});

// Evento para seleccionar "O"
document.getElementById("O").addEventListener("click", function(e) {    
    jugador=2;
    buttons(true);
    read();
});
// Evento para realizar un movimiento en el tablero
document.getElementById("tablero").addEventListener("click", function(e) {
    // Verifica que el jugador haya seleccionado si ser X o O
    if (jugador == 0){
        alert("selecciona si quieres ser X o O");
    }
    // Verifica que el juego no haya terminado
    else if (juegoterminado == 1){
    }
    // Verifica que sea el turno del jugador
    else if (ismyturn()){
        // Pinta la celda seleccionada
        let pinto = paint(e.target);
        // Si la celda se pudo pintar
        if (pinto){
            // Verifica si hay un ganador
            ganador  = iswinner();
            // Cambia el turno
            turno = turn(turno);
            // Escribe el tablero
            write();            
            // Cambia el texto que muestra de quien es el turno
            switch (turno){
                case 1:
                    turno_div.innerHTML = "Turno del jugador: X";  
                    break;
                case 2:
                    turno_div.innerHTML = "Turno del jugador: O";  
                    break;
            }
        }
    }
});

// Función que carga el tablero
function cargarTablero() {
    // Recorre las celdas del tablero
    for (var i = 0; i < tablero.length; i++) {
        var celda = document.getElementById(i + 1);
        // Si la celda contiene un 1, se muestra una X
        if (tablero[i] == 1) {
            celda.innerHTML = "<span class='material-symbols-outlined equis' style='font-size: 80px;'>close</span>";
        // Si la celda contiene un 2, se muestra un O
        } else if (tablero[i] == 2){
            celda.innerHTML = "<span class='material-symbols-outlined circulo' style='font-size: 80px;'>radio_button_unchecked</span>";
        }            
    }
    // Cambia el texto que muestra de quien es el turno
    if (turno == 1){
        turno_div.innerHTML = "Turno del jugador X";
    }else if (turno==2){
        turno_div.innerHTML = "Turno del jugador O";
    }
}
// Función que verifica si hay datos nuevos para cargar
function recibe(){
    let data = pide();
    // Si hay datos nuevos
    if (data != undefined){
        recibio = true;
        let jsonData = JSON.parse(data);
        // Carga los datos
        ganador = parseInt(jsonData.ganador);
        turno = parseInt(jsonData.turno);
        tablero = jsonData.tablero.split(",");
        for (var i = 0; i < tablero.length; i++) {
            tablero[i] = parseInt(tablero[i]);
        }
        //console.log(tablero);
        cargarTablero();
        if (juegoterminado != 1){
            switch (ganador){
                case 1://wins X
                    alert("Gana el Jugador X");
                    juegoterminado = 1;
                break;
                case 2://wins O
                    alert("Gana el Jugador O");
                    juegoterminado = 1;
                break;
                case 3://draw
                    alert("EMPATE");
                    juegoterminado = 1;
                break;
            }
        }else
            if (location.search.includes("?")){
               // console.log(window.location.href.split('?')[0]);
                window.location = window.location.href.split('?')[0];
            }else{
                window.location = window.location.href;
            }
        }
        //console.log(tablero);
    }

    let llamo = false
    window.setInterval(function() {
        // if (llamo = false){
            if (idpartida != 0){
             read();
        //     //llamo = true;
        // }else{
             recibe();
            }


        // }
        // if (turno != jugador){
        //     llamo = false
        // }
        // // if (jugador != undefined && turno != jugador){
        // //     // if (recibio == false){
        // //     //     console.log("asd")
        // //         recibe();
        // //     // }else{
        // //         read();
        // //     // }
        // // }
        
    }, 1000);

    export function llamoo(value){
        llamo = value;
    }
    // read();
    // cargarTablero();
    // document.getElementById("test").addEventListener("click", function(e) {    
    //     if (llamo = false){
    //         console.log("read")
    //         read();
            
    //         //llamo = true;
    //     }else{
    //         console.log("recibe")
    //         recibe();
            


    //     }
    //     if (turno != jugador){
    //         llamo = false
    //     }
    // });

    var input = document.getElementById("partidai");
    input.addEventListener("input", function() {
        if (this.value.length > 0) {
            this.classList.add("has-content");
        } else {
            this.classList.remove("has-content");
        }
});

//     tablero =   [1, 2, 0,
//                          0, 1, 2,
//                          0, 2, 1];
//                          for (var i = 0; i < tablero.length; i++) {
//                             var celda = document.getElementById(i + 1);
//                             //console.log(tablero[i]);
//                             if (tablero[i] == 1) {
//                                 celda.innerHTML = "<span class='material-symbols-outlined equis' style='font-size: 80px;'>close</span>";
//                             } else if (tablero[i] == 2){
//                                 celda.innerHTML = "<span class='material-symbols-outlined circulo' style='font-size: 80px;'>radio_button_unchecked</span>";
//                             }            
//                         }
// menu(false);
function loadlink(){
    try{
          let data = location.search.split('?game=')[1]

          if (data != 0 && data != undefined){
            idpartida = data;
            Partida.innerHTML = "Partida ID: " + idpartida;
            menu(false);
            //idpartida = document.getElementById("partidai").value;
            link();
            read();
            cargarTablero();
          }
        }catch (error) {
    
        }
}
loadlink();


                        