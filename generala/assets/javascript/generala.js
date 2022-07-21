let contenedorDados = document.getElementById("contenedorDados");
var cellPintadas= [];
let totalpuntaje1, totalpuntaje2;
let estadoDelJuego = {
        dados: [],
        dadosSeleccionados: [],
        jugador: Math.floor(Math.random() * 2) + 1,
        contTiros: 0,
        puntajes: [[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0]],
        jugadas: 0
};

let sumarPuntaje = {
    ganador: 20,
    empate: 8
}

function nombresColor(){
    document.getElementById("nombresJugador1").innerHTML = Storage.get("Jugador1").nombre;
    document.getElementById("nombresJugador2").innerHTML = Storage.get("Jugador2").nombre;
    document.getElementById("nombresJugador1").style.color = Storage.get("Jugador1").color;
    document.getElementById("nombresJugador2").style.color = Storage.get("Jugador2").color;
}

function tirarDado() {
    return Math.floor(Math.random() * 6) + 1;
}

function tirarDados() {

    resetearCeldas();
    
    if (estadoDelJuego.dadosSeleccionados.length === 0) {
        estadoDelJuego.dadosSeleccionados = [0, 1, 2, 3, 4];
    }
    estadoDelJuego.dadosSeleccionados.forEach(indice => {
        estadoDelJuego.dados[indice] = tirarDado();
    });
    estadoDelJuego.dados.sort((a, b) => { return a - b; });
    estadoDelJuego.contTiros++;
    pintarOpcionesDeJuego();

    
    actualizarPantalla();
    if (estadoDelJuego.contTiros === 3) {
        forzarAnotarPuntos();
    }

}

function pintarOpcionesDeJuego(){

    cellPintadas = [];
    cellPintadas = estadoDelJuego.dados;

    estadoDelJuego.dados.forEach(element => {

        if(esEscalera()){
            let celda = document.querySelector("#puntajes tr:nth-of-type(" + (7) + ") td:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")");
            if(celda.innerHTML == '')
            celda.style.backgroundColor = '#c1272d';
            cellPintadas.push(7)
        }

        if(esFull()){
            let celda = document.querySelector("#puntajes tr:nth-of-type(" + (8) + ") td:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")");
            if(celda.innerHTML == '')
            celda.style.backgroundColor = '#c1272d'
            cellPintadas.push(8)
        }

        if(esPoker()){
            let celda = document.querySelector("#puntajes tr:nth-of-type(" + (9) + ") td:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")");
            if(celda.innerHTML == '')
            celda.style.backgroundColor = '#c1272d'
            cellPintadas.push(9)
        }


        if(esGenerala()){

            let celda = document.querySelector("#puntajes tr:nth-of-type(" + (10) + ") td:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")");
            if(celda.innerHTML == ''){
                celda.style.backgroundColor = '#c1272d'
                cellPintadas.push(10)
            }else{
                let celda = document.querySelector("#puntajes tr:nth-of-type(" + (11) + ") td:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")");
                celda.style.backgroundColor = '#c1272d'
                cellPintadas.push(11)
            }

        }
       
        let celda = document.querySelector("#puntajes tr:nth-of-type(" + (element) + ") td:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")");
        if(celda.innerHTML == '')
        celda.style.backgroundColor = '#c1272d'

    });
    
}

function resetearCeldas(){

    if(cellPintadas.length > 0)
    cellPintadas.forEach(element => {
        let celda = document.querySelector("#puntajes tr:nth-of-type(" + (element) + ") td:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")");
        celda.style.backgroundColor = '#f6cc06'
    });
}

function forzarAnotarPuntos() {
    habilitarBoton(false);
    document.querySelectorAll("#contenedorDados div img").forEach(img => {
        img.onclick = null;
    });
}

function actualizarPantalla() {
    estadoDelJuego.dadosSeleccionados = [];
    if (estadoDelJuego.dados.length === 0) {
        dadosReset();
    } else {
        contenedorDados.innerHTML = null;
        for (let i = 0; i < 5; i++) {
            contenedorDados.appendChild(dibujarDado(i, estadoDelJuego.dados[i], true));
        }    
    }
    document.getElementById("turno").innerHTML = estadoDelJuego.jugador;
    document.getElementById("tiro").innerHTML = estadoDelJuego.contTiros;
    document.querySelectorAll("#puntajes tbody td").forEach(celda => celda.classList.remove("jugando"));
    document.querySelectorAll("#puntajes tbody td:nth-of-type(" + estadoDelJuego.jugador + ")").forEach(celda => celda.classList.add("jugando"));
    document.querySelectorAll("#puntajes thead th").forEach(celda => celda.classList.remove("jugando"));
    document.querySelectorAll("#puntajes thead th:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")").forEach(celda => celda.classList.add("jugando"));
}

function anotarPuntos(juego) {

    if(estadoDelJuego.dados.length >0 ){
        resetearCeldas();
        let celda = document.querySelector("#puntajes tr:nth-of-type(" + (juego + 1) + ") td:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")");
        if (!celda.classList.contains("anotado")) { 
        let generalaForzadaPorDoble = false;
        let dobleForzadaPorGenerala = false;
        switch (juego) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:

            case 5:
                estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] = puntos(juego + 1);
                break;
            case 6:
                estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] = esEscalera() ? puntosJuegoEspecial(20) : 0;
                break;
            case 7:
                estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] = esFull() ? puntosJuegoEspecial(30) : 0;
                break;
            case 8:
                estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] = esPoker() ? puntosJuegoEspecial(40) : 0;
                break;
            case 9:
                if (esGenerala()) { 
                    if (estadoDelJuego.contTiros === 1) {
                        estadoDelJuego.puntajes[(estadoDelJuego.jugador - 1)][juego] = 1000;
                        juegoTerminado();
                    }else{
                        estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] = puntosJuegoEspecial(50);
                    }
                } else {
                    if (document.querySelector("#puntajes tr:nth-of-type(11) td:nth-of-type(" + estadoDelJuego.jugador + ")").classList.contains("anotado")) {
                        estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] = 0;
                    } else {
                        estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][10] = 0;
                        dobleForzadaPorGenerala = true;
                    }
                }
                break;
            case 10:

                if (esGenerala()) {

                    if(estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][9] > 0){

                        estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] = puntosJuegoEspecial(100);
                        celda.innerHTML = estadoDelJuego.puntajes
                        [estadoDelJuego.jugador - 1][juego];
                        celda.classList.add("anotado");
                        let celdaTotal = document.querySelector("#puntajes tr:nth-of-type(12) td:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")");
                        celdaTotal.innerHTML = totalPuntos();
                        juegoTerminado();
                        

                    }else{

                        estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] = puntosJuegoEspecial(50);

                    }
                    
                };

                break;
        }

        if (!generalaForzadaPorDoble && !dobleForzadaPorGenerala) {
            celda.innerHTML = estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego] === 0 ? "X" : estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][juego];
            celda.classList.add("anotado");
        } else if (generalaForzadaPorDoble) {
            let celdaG = document.querySelector("#puntajes tr:nth-of-type(11) td:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")");
            celdaG.innerHTML = estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][9] === 0 ? "X" : estadoDelJuego.puntajes[estadoDelJuego.jugador - 1][9];
            celdaG.classList.add("anotado");
        } else if (dobleForzadaPorGenerala) {
            let celdaDG = document.querySelector("#puntajes tr:nth-of-type(10) td:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")");
            celdaDG.innerHTML = "X";
            celdaDG.classList.add("anotado");
        }
        let celdaTotal = document.querySelector("#puntajes tr:nth-of-type(12) td:nth-of-type(" + (estadoDelJuego.jugador + 1) + ")");
        celdaTotal.innerHTML = totalPuntos();
        cambiarJugador();
    }

    }else{
        window.alert('Debe tirar los dados')
    }
    
}

function puntosJuegoEspecial(puntosJuego) {
    return estadoDelJuego.contTiros === 1 ? puntosJuego + 5 : puntosJuego;
}

function totalPuntos() {
    return estadoDelJuego.puntajes[estadoDelJuego.jugador - 1].reduce((total, puntaje) => {
        return total + puntaje;
    }, 0);
}

function quienGano() {

    estadoDelJuego.puntajes[0].reduce((total, puntaje) => {
        totalpuntaje1 = total + puntaje;
        return total + puntaje;
    }, 0);
    
    estadoDelJuego.puntajes[1].reduce((total, puntaje) => {
        totalpuntaje2 = total + puntaje;
        return total + puntaje;
    }, 0);

    if (totalpuntaje1 < totalpuntaje2) {

        document.getElementById("mostrarganador").innerHTML = Storage.get("Jugador2").nombre + " GANASTE!";
        document.getElementById("botonTirarDados").style.display = "none";
        let puntajeT2 = Storage.get("Jugador2").puntajeG;
        let Total2;
        Total2 = puntajeT2 + sumarPuntaje.ganador;
        let Jugador2Copia = {
            nombre: Storage.get("Jugador2").nombre,
            apodo: Storage.get("Jugador2").apodo,
            color: Storage.get("Jugador2").color,
            foto: Storage.get("Jugador2").foto,
            puntajeT: Storage.get("Jugador2").puntajeT,
            puntajeG: Total2,
            puntajeJ3: Storage.get("Jugador2").puntajeJ3,
            Total: Storage.get("Jugador2").Total
        }
        localStorage.setItem("Jugador2", JSON.stringify(Jugador2Copia))
        
        document.getElementById("botonesG").style.width = "100%";
        document.getElementById("botonesG").style.height = "100%";
        document.getElementById("botonesG").style.backgroundColor = "rgba(50, 50, 50, 0.7)"; 
        document.getElementById("botonesG").style.position = "absolute";
        document.getElementById("botonesG").style.display = "grid";
        document.getElementById("botonesG").style.gridTemplateColumns = "240px 240px";
        document.getElementById("botonesG").style.gridAutoRows = "120px";
        document.getElementById("botonesG").style.justifyContent = "center";
        document.getElementById("botonesG").style.justifyItems = "center";
        document.getElementById("botonesG").style.alignItems = "center";
        document.getElementById("botonesG").style.alignContent = "center";
        document.getElementById("botonesG").style.top = "0";
        document.getElementById("mostrarganador").style.display = "flex";
        
    } else if (totalpuntaje2 < totalpuntaje1) {

        document.getElementById("mostrarganador").innerHTML = Storage.get("Jugador1").nombre + " GANASTE!";
        document.getElementById("botonTirarDados").style.display = "none";
        let puntajeT1 = Storage.get("Jugador1").puntajeG;
        let Total1;
        Total1 = puntajeT1 + sumarPuntaje.ganador;
        let Jugador1Copia = {
            nombre: Storage.get("Jugador1").nombre,
            apodo: Storage.get("Jugador1").apodo,
            color: Storage.get("Jugador1").color,
            foto: Storage.get("Jugador1").foto,
            puntajeT: Storage.get("Jugador1").puntajeT,
            puntajeG: Total1,
            puntajeJ3: Storage.get("Jugador1").puntajeJ3,
            Total: Storage.get("Jugador1").Total
        }
        localStorage.setItem("Jugador1", JSON.stringify(Jugador1Copia))
        
        document.getElementById("botonesG").style.width = "100%";
        document.getElementById("botonesG").style.height = "100%";
        document.getElementById("botonesG").style.backgroundColor = "rgba(50, 50, 50, 0.7)"; 
        document.getElementById("botonesG").style.position = "absolute";
        document.getElementById("botonesG").style.display = "grid";
        document.getElementById("botonesG").style.gridTemplateColumns = "240px 240px";
        document.getElementById("botonesG").style.gridAutoRows = "120px";
        document.getElementById("botonesG").style.justifyContent = "center";
        document.getElementById("botonesG").style.justifyItems = "center";
        document.getElementById("botonesG").style.alignItems = "center";
        document.getElementById("botonesG").style.alignContent = "center";
        document.getElementById("botonesG").style.top = "0";
        document.getElementById("mostrarganador").style.display = "flex";

    } else {
        document.getElementById("mostrarganador").innerHTML = "Empate!";
        document.getElementById("botonTirarDados").style.display = "none";

        let puntajeT3 = Storage.get("Jugador1").puntajeG;
        let puntajeT4 = Storage.get("Jugador2").puntajeG;
        let Total3;
        let Total4;
        Total3 = puntajeT3 + sumarPuntaje.empate;
        Total4 = puntajeT4 + sumarPuntaje.empate;
        let Jugador1Copia = {
            nombre: Storage.get("Jugador1").nombre,
            apodo: Storage.get("Jugador1").apodo,
            color: Storage.get("Jugador1").color,
            foto: Storage.get("Jugador1").foto,
            puntajeT: Storage.get("Jugador1").puntajeT,
            puntajeG: Total3,
            puntajeJ3: Storage.get("Jugador1").puntajeJ3,
            Total: Storage.get("Jugador1").Total
        }
        localStorage.setItem("Jugador1", JSON.stringify(Jugador1Copia))

        let Jugador2Copia = {
            nombre: Storage.get("Jugador2").nombre,
            apodo: Storage.get("Jugador2").apodo,
            color: Storage.get("Jugador2").color,
            foto: Storage.get("Jugador2").foto,
            puntajeT: Storage.get("Jugador2").puntajeT,
            puntajeG: Total4,
            puntajeJ3: Storage.get("Jugador2").puntajeJ3,
            Total: Storage.get("Jugador2").Total
        }
        localStorage.setItem("Jugador2", JSON.stringify(Jugador2Copia))

        document.getElementById("botonesG").style.width = "100%";
        document.getElementById("botonesG").style.height = "100%";
        document.getElementById("botonesG").style.backgroundColor = "rgba(50, 50, 50, 0.7)"; 
        document.getElementById("botonesG").style.position = "absolute";
        document.getElementById("botonesG").style.display = "grid";
        document.getElementById("botonesG").style.gridTemplateColumns = "240px 240px";
        document.getElementById("botonesG").style.gridAutoRows = "120px";
        document.getElementById("botonesG").style.justifyContent = "center";
        document.getElementById("botonesG").style.justifyItems = "center";
        document.getElementById("botonesG").style.alignItems = "center";
        document.getElementById("botonesG").style.alignContent = "center";
        document.getElementById("botonesG").style.top = "0";
        document.getElementById("mostrarganador").style.display = "flex";
    }
}

function cambiarJugador() {
    estadoDelJuego.contTiros = 0;
    estadoDelJuego.dados = [];
    estadoDelJuego.dadosSeleccionados = [];
    estadoDelJuego.jugador = estadoDelJuego.jugador === 2 ? 1 : 2;
    estadoDelJuego.jugadas++;
    actualizarPantalla();
    if (estadoDelJuego.jugadas === 11 * estadoDelJuego.puntajes.length) {
        juegoTerminado();
    }
    habilitarBoton(true);
}

function habilitarBoton(habilitar) {
    let boton = document.querySelector("#botonTirarDados a");
    if (habilitar) {
        boton.setAttribute("href", "javascript:tirarDados();");
        boton.classList.remove("disabled");
    } else {
        boton.removeAttribute("href");
        boton.classList.add("disabled");
    }
}

function dadosReset() {
    contenedorDados.innerHTML = null;
    for (let i = 0; i < 5; i++) {
        contenedorDados.appendChild(dibujarDado(i, 0));
    }
}

function dibujarDado(i, valor, setupHandler) {
    let dado = document.createElement("div");
    let imgdado = document.createElement("img");
    imgdado.setAttribute("src", "assets/css/img/dado_" + valor + ".png");
    imgdado.setAttribute("data-dado-index", i);
    dado.appendChild(imgdado);

    if (setupHandler) {
        imgdado.onclick = evt => {
            let dadoSeleccionado = parseInt(evt.target.getAttribute("data-dado-index"));
            if (estadoDelJuego.dadosSeleccionados.indexOf(dadoSeleccionado) === -1) {
                estadoDelJuego.dadosSeleccionados.push(dadoSeleccionado);
                evt.target.classList.add("seleccionado");
            } else {
                estadoDelJuego.dadosSeleccionados.splice(estadoDelJuego.dadosSeleccionados.indexOf(dadoSeleccionado), 1);
                evt.target.classList.remove("seleccionado");
            }
        };
    }

    return dado;
}

function juegoTerminado() {
    quienGano();
    habilitarBoton(false);
    document.getElementById("botonReiniciarJuego").style.display = "inline-block";
}

function esEscalera() {
    return /12345|23456|13456/.test(dadosComoString());
}

function esFull() {
    return /1{3}(22|33|44|55|66)|2{3}(33|44|55|66)|3{3}(44|55|66)|4{3}(55|66)|5{3}(66)|1{2}(222|333|444|555|666)|2{2}(333|444|555|666)|3{2}(444|555|666)|4{2}(555|666)|5{2}(666)/.test(dadosComoString());
}

function esPoker() {
    return /1{4}|2{4}|3{4}|4{4}|5{4}|6{4}/.test(dadosComoString());
}

function esGenerala() {
    return /1{5}|2{5}|3{5}|4{5}|5{5}|6{5}/.test(dadosComoString());
}

function puntos(elDado) {
    let puntosSumados = 0;
    estadoDelJuego.dados.forEach(dado => {
        puntosSumados += (elDado === dado) ? elDado : 0;
    });
    return puntosSumados;
}

function dadosComoString() {
    return estadoDelJuego.dados.join('');
}