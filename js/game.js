import {iswinner,ismyturn,turn,write,read,generate,buttons,link, paint, pide,menu} from './functions.js';

//1 == X
//2 == O
export let ganador=0;
export let turno = 1;
export let jugador =0;
export let idpartida=0;
export let tablero =   [0, 0, 0,
                        0, 0, 0,
                        0, 0, 0];
export let juegoterminado = 0;

export let Partida = document.getElementById("partida");
Partida.innerHTML = "Partida ID: ";
export let turno_div = document.getElementById("turno");
turno_div.innerHTML = "Turno del jugador: X";
menu(true);
document.getElementById("cargaid").addEventListener("click", function(e) {
    if (document.getElementById("partidai").value != ""){
        menu(false);
        idpartida = document.getElementById("partidai").value;
        link();
        read();
        cargarTablero();
    }else{
        alert("Ingrese una ID")
    }
    
});
document.getElementById("generaid").addEventListener("click", function(e) {

        menu(false);
        idpartida = generate(4);
        link();
        read();
        cargarTablero();

    
});
document.getElementById("X").addEventListener("click", function(e) {    
    jugador=1;
    buttons(true);
    read();
    
    //recibio=true;
    //cargarTablero();
});

document.getElementById("O").addEventListener("click", function(e) {    
    jugador=2;
    buttons(true);
    read();
    //recibio=true;
    //cargarTablero();
});



document.getElementById("tablero").addEventListener("click", function(e) {
    if (jugador == 0){
        alert("selecciona si quieres ser X o O")
    }else if (juegoterminado == 1){
    }else if (ismyturn()){
            let pinto = paint(e.target);
            if (pinto){
                ganador  = iswinner();
                // switch (ganador){
                //     case 1://wins X
                //         alert("Gana el Jugador X");
                //         juegoterminado = 1;
                //     break;
                //     case 2://wins O
                //         alert("Gana el Jugador O");
                //         juegoterminado = 1;
                //     break;
                //     case 3://draw
                //         alert("EMPATE");
                //         juegoterminado = 1;
                //     break;
                // }
                // if (iswinner() == 0 && iswinner() == 1 && iswinner() == 2 && iswinner() == 3){
                //     alert("asd")
                // }
                turno = turn(turno);
                write();            
                switch (turno){
                    case 1:
                        turno_div.innerHTML = "Turno del jugador: X";  
                        break;
                    case 2:
                        turno_div.innerHTML = "Turno del jugador: O";  
                        break
                }
                // recibio=true;
            }
    }
    
});


    //read();

//tablero = [0,1,0,2,0,0,1,0,2];
function cargarTablero() {
    for (var i = 0; i < tablero.length; i++) {
        var celda = document.getElementById(i + 1);
        //console.log(tablero[i]);
        if (tablero[i] == 1) {
            celda.innerHTML = "<span class='material-symbols-outlined equis' style='font-size: 80px;'>close</span>";
        } else if (tablero[i] == 2){
            celda.innerHTML = "<span class='material-symbols-outlined circulo' style='font-size: 80px;'>radio_button_unchecked</span>";
        }            
    }
    if (turno == 1){
        turno_div.innerHTML = "Turno del jugador X";
    }else if (turno==2){
        turno_div.innerHTML = "Turno del jugador O";
    }
    
}
//cargarTablero();
let recibio = false;
//this function check if data is correct exist and if exist load 
function recibe(){
    let data = pide()
    if (data != undefined){
        recibio = true;
        let jsonData = JSON.parse(data);
        //idpartida,tablero,turno,ganador = JSON.parse(jsonData);
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


                        