import {turno,jugador,idpartida,tablero,Partida,turno_div,ganador,llamoo,juegoterminado} from './game.js';

//this is for generate a random number for idpartida
export function generate(n) {
    let add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
    
    if ( n > max ) {
            return generate(max) + generate(n - max);
    }
    
    max        = Math.pow(10, n+add);
    let min    = max/10; // Math.pow(10, n) basically
    let number = Math.floor( Math.random() * (max - min + 1) ) + min;
    
    return ("" + number).substring(add); 
}
// 
// GAME LOGIC SECTION
// 
//this check if any wins or draw
export function iswinner(){
    if (//check if player X wins
        (tablero[0] == 1 && tablero[1] == 1 && tablero[2] == 1) ||
        (tablero[3] == 1 && tablero[4] == 1 && tablero[5] == 1) ||
        (tablero[6] == 1 && tablero[7] == 1 && tablero[8] == 1) ||
        (tablero[0] == 1 && tablero[3] == 1 && tablero[6] == 1) ||
        (tablero[1] == 1 && tablero[4] == 1 && tablero[7] == 1) ||
        (tablero[2] == 1 && tablero[5] == 1 && tablero[8] == 1) ||
        (tablero[0] == 1 && tablero[4] == 1 && tablero[8] == 1) ||
        (tablero[2] == 1 && tablero[4] == 1 && tablero[6] == 1)
      ) {
        //alert("El jugador X ha ganado!");
        //location.reload();
        return 1;
      }else if (//check if player O wins
        (tablero[0] == 2 && tablero[1] == 2 && tablero[2] == 2) ||
        (tablero[3] == 2 && tablero[4] == 2 && tablero[5] == 2) ||
        (tablero[6] == 2 && tablero[7] == 2 && tablero[8] == 2) ||
        (tablero[0] == 2 && tablero[3] == 2 && tablero[6] == 2) ||
        (tablero[1] == 2 && tablero[4] == 2 && tablero[7] == 2) ||
        (tablero[2] == 2 && tablero[5] == 2 && tablero[8] == 2) ||
        (tablero[0] == 2 && tablero[4] == 2 && tablero[8] == 2) ||
        (tablero[2] == 2 && tablero[4] == 2 && tablero[6] == 2)
      ) {
        //alert("El jugador O ha ganado!");
        //location.reload();
        return 2
      }else {//check if is a draw game
        let empate = true;
        for (let i = 0; i < tablero.length; i++) {
          if (tablero[i] == 0) {
            empate = false;
            break;
          }
        }
        if (empate) {
          //alert("Empate!");
          //location.reload();
          return 3;
        }
        return 0;//nothing happen
    }
}
export function paint(e){
    let celda = e;
    let id = celda.id;
    if (tablero[id - 1] == 0) {
        if (turno == 1){
          tablero[id - 1] = 1;
          celda.innerHTML = "<span class='material-symbols-outlined equis' style='font-size: 80px;'>close</span>";

        }else{
          tablero[id - 1] = 2;
          celda.innerHTML = "<span class='material-symbols-outlined circulo' style='font-size: 80px;'>radio_button_unchecked</span>";
        }
        
        return true;
    }
    return false;
}
//chequea si es el turno del jugador
export function ismyturn(){
    if (jugador !== "" && jugador != undefined){
        if (turno == jugador){
            return true;
        }
    }
    return false;
}
//cambia el turno por el otro jugador
export function turn(turno){
    if (turno == 1) {
        turno = 2;
      } else {
        turno = 1;
      }
    //console.log(turno);
    return turno;
}
//
//ONLINE MODE/SQL
//
//this write in sql database with php
export function write(){
    //['idpartida']['tablero']['turno']['ganador']['tarea'];

    fetch("main.php?idpartida="+idpartida+"&tablero="+tablero.toString()+"&turno="+turno+"&ganador="+ganador+"&tarea=write", {
      method: "POST",
      headers: {'Content-Type': 'application/json'}
      //body: JSON.stringify(data)
    })  
    //.then(response => response.json())
    //.then(console.log);
    //return false
}
//this read from sql database with php
//temp variables for data from fetch
let tempganador;
let tempturno = 1;
let tempidpartida;
let temptablero =   [0, 0, 0,
                     0, 0, 0,
                    0, 0, 0];
let process = true;
//lee los datos del servidor sql
export function read(){
    if (idpartida != undefined && idpartida != 0 && juegoterminado != 1){
      if (process){
        process = false; 
        try{
            let datos = fetch("main.php?idpartida="+idpartida+"&tarea=read", {
                method: "POST",
                headers: {'Content-Type': 'application/json'}
                //body: JSON.stringify(data)
            })  
            .then(response => response.json())
            .then(data => { 
                //console.log(data.tablero)
                if (data.idpartida == "nothing"){
                  process = true; 
                }else{
                comunication(data.idpartida,data.tablero.split(','),data.turno,data.ganador)

                return data;
              }
                
            });
        }catch{process = true;}
        for (let i = 0; i < tablero.length; i++) {
          if (temptablero[i] != tablero[i]) {
              //cambio = true;
              llamoo(true);
            break;
          }
        }
      }
    }
    //return datos;
}

export function comunication(tid,ttablero,tturno,tganador){
    //here set temp variables
    process = true;
    tempidpartida =tid;
    temptablero = ttablero;
    tempturno = tturno;
    tempganador = tganador;
    //console.log(tempidpartida);
}
//export variables for game.js
export function pide(){
    //let cambio = false;

    if (tempganador != undefined){//&& tablero != temptablero
        //console.log(temptablero);
        let tempganador2 = tempganador;
        tempganador = undefined;
        return '{"idpartida": "'+ tempidpartida + '", "tablero": "'+temptablero+ '", "turno": "'+tempturno+ '", "ganador": "'+tempganador2+'"}'
    }else{
        return undefined
    }
}
export function loadlink(){
    try{

        //if (location.search.split('?test=')[1] != ""){
          let data = location.search.split('?test=')[1]
          //console.log(data.split("|")[0]);
          idpartida = data.split("|")[0];
          //jugador = data.split("|")[1];
          Partida.innerHTML = "Partida ID: " + idpartida;
          //document.getElementById("X").disabled=true
          //document.getElementById("O").disabled=true
          cargarTablero();
        // }
    
        }catch (error) {
    
        }
}
//
//This modify htlm section
//

export function buttons(a){//a == bool
    document.getElementById("X").disabled=a;
    document.getElementById("O").disabled=a;
    if(a) {
      document.getElementById("game").style.display="none";
    }else{
      document.getElementById("game").style.display="block";
    }

}
export function menu(a){
  if(a) {
    document.getElementById("menu").style.display="grid";
    document.getElementById("game").style.display="none";
    document.getElementById("t_game").style.display="none";
    document.getElementById("i_game").style.display="none";
  }else{
    document.getElementById("menu").style.display="none";
    document.getElementById("game").style.display="block";
    document.getElementById("t_game").style.display="block";
    document.getElementById("i_game").style.display="block";
  }
}
export function link(){
  document.getElementById("partida").innerHTML = "Partida ID: " + idpartida;
    document.getElementById("enlace").innerHTML =  window.location.href.split('?game=')[0] + "?game=" + idpartida ;
    document.getElementById("enlace").setAttribute('href', window.location.href.split('?game=')[0] + "?game=" + idpartida);
}
