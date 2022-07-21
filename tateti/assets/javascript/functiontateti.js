let asignadorToStart;
let sumarPuntaje = {
    ganador: 10,
    empate: 5
}
let ocupados = ["", "", "", "", "", "", "", "", ""];
let combinaciones = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function inicial() {
    asignadorToStart = (Math.floor(Math.random() * 2) + 1);
    document.getElementById("nombre1").innerHTML = Storage.get("Jugador1").nombre + " es cruz";
    document.getElementById("nombre2").innerHTML = Storage.get("Jugador2").nombre + " es circulo";
    let contenedorCont = document.getElementById("contenedor");
    for (i = 0; i < 9; i++) {
        let casillero = document.createElement("div");
        casillero.setAttribute("id", "cell");
        casillero.setAttribute("data-cell-index", i)
        contenedorCont.appendChild(casillero);
        if (asignadorToStart == 1) {
            document.getElementById("nombre1").style.color = Storage.get("Jugador1").color = "#c4c4c4";
            document.getElementById("nombre2").style.color = "#c1272d";
        } else {
            document.getElementById("nombre1").style.color = "#c1272d";
            document.getElementById("nombre2").style.color = Storage.get("Jugador2").color = "#c4c4c4";
        }
        casillero.onclick = evt => {
            if (casillero.getAttribute("data-player-index") == null) {
                let imgSeleccion = document.createElement("img");
                if (asignadorToStart == 1) {
                    casillero.setAttribute("data-player-index", 1);
                    imgSeleccion.setAttribute("src", "assets/css/img/cruz.png");
                    ocupados[evt.target.getAttribute("data-cell-index")] = 1;
                    for (let i = 0; i <= 7; i++) {
                        let combinacionesForWin = combinaciones[i];
                        let a = ocupados[combinacionesForWin[0]];
                        let b = ocupados[combinacionesForWin[1]];
                        let c = ocupados[combinacionesForWin[2]];
                        if (a == "" || b == "" || c == "") {
                            continue;
                        }
                        if (a === b && b === c) {
                            document.getElementById("mostrarganador").innerHTML = Storage.get("Jugador1").nombre + " GANASTE!";
                            let puntajeT1 = Storage.get("Jugador1").puntajeT;
                            let Total1;
                            Total1 = puntajeT1 + sumarPuntaje.ganador;
                            let Jugador1Copia = {
                                nombre: Storage.get("Jugador1").nombre,
                                apodo: Storage.get("Jugador1").apodo,
                                color: Storage.get("Jugador1").color,
                                foto: Storage.get("Jugador1").foto,
                                puntajeT: Total1,
                                puntajeG: Storage.get("Jugador1").puntajeG,
                                puntajeJ3: Storage.get("Jugador1").puntajeJ3,
                                Total: Storage.get("Jugador1").Total
                            }
                            localStorage.setItem("Jugador1", JSON.stringify(Jugador1Copia))

                            document.getElementById("botonesT").style.width = "100%";
                            document.getElementById("botonesT").style.height = "100%";
                            document.getElementById("botonesT").style.backgroundColor = "rgba(50, 50, 50, 0.7)"; 
                            document.getElementById("botonesT").style.position = "absolute";
                            document.getElementById("botonesT").style.display = "grid";
                            document.getElementById("botonesT").style.gridTemplateColumns = "250px 250px";
                            document.getElementById("botonesT").style.gridAutoRows = "120px";
                            document.getElementById("botonesT").style.justifyContent = "center";
                            document.getElementById("botonesT").style.justifyItems = "center";
                            document.getElementById("botonesT").style.alignItems = "center";
                            document.getElementById("botonesT").style.alignContent = "center";
                            document.getElementById("mostrarganador").style.display = "flex";
                            break;
                        }
                    }
                    asignadorToStart = 0;
                    document.getElementById("nombre1").style.color = "#c1272d";
                    document.getElementById("nombre2").style.color = Storage.get("Jugador2").color = "#c4c4c4";
                } else {
                    casillero.setAttribute("data-player-index", 0);
                    imgSeleccion.setAttribute("src", "assets/css/img/circulo.png");
                    ocupados[evt.target.getAttribute("data-cell-index")] = 0;
                    for (let i = 0; i <= 7; i++) {
                        let combinacionesForWin = combinaciones[i];
                        let a = ocupados[combinacionesForWin[0]];
                        let b = ocupados[combinacionesForWin[1]];
                        let c = ocupados[combinacionesForWin[2]];
                        if (a === '' || b === '' || c === '') {
                            continue;
                        }
                        if (a === b && b === c) {
                            document.getElementById("mostrarganador").innerHTML = Storage.get("Jugador2").nombre + " GANASTE!";
                            let puntajeT2 = Storage.get("Jugador2").puntajeT;
                            let Total2;
                            Total2 = puntajeT2 + sumarPuntaje.ganador;
                            let Jugador2Copia = {
                                nombre: Storage.get("Jugador2").nombre,
                                apodo: Storage.get("Jugador2").apodo,
                                color: Storage.get("Jugador2").color,
                                foto: Storage.get("Jugador2").foto,
                                puntajeT: Total2,
                                puntajeG: Storage.get("Jugador2").puntajeG,
                                puntajeJ3: Storage.get("Jugador2").puntajeJ3,
                                Total: Storage.get("Jugador2").Total
                            }
                            localStorage.setItem("Jugador2", JSON.stringify(Jugador2Copia))
                            
                            document.getElementById("botonesT").style.width = "100%";
                            document.getElementById("botonesT").style.height = "100%";
                            document.getElementById("botonesT").style.backgroundColor = "rgba(50, 50, 50, 0.7)";
                            document.getElementById("botonesT").style.position = "absolute";
                            document.getElementById("botonesT").style.display = "grid";
                            document.getElementById("botonesT").style.gridTemplateColumns = "250px 250px";
                            document.getElementById("botonesT").style.gridAutoRows = "120px";
                            document.getElementById("botonesT").style.justifyContent = "center";
                            document.getElementById("botonesT").style.justifyItems = "center";
                            document.getElementById("botonesT").style.alignItems = "center";
                            document.getElementById("botonesT").style.alignContent = "center";
                            document.getElementById("mostrarganador").style.display = "flex";
                            break
                        }
                    }
                    asignadorToStart = 1;
                    document.getElementById("nombre1").style.color = Storage.get("Jugador1").color = "#c4c4c4";
                    document.getElementById("nombre2").style.color = "#c1272d";
                }
                evt.target.appendChild(imgSeleccion);
                if (!ocupados.includes("")) {
                    document.getElementById("mostrarganador").innerHTML = "EMPATE";
                    let puntajeT3 = Storage.get("Jugador1").puntajeT;
                    let puntajeT4 = Storage.get("Jugador2").puntajeT;
                    let Total3;
                    let Total4;
                    Total3 = puntajeT3 + sumarPuntaje.empate;
                    Total4 = puntajeT4 + sumarPuntaje.empate;
                    let Jugador1Copia = {
                        nombre: Storage.get("Jugador1").nombre,
                        apodo: Storage.get("Jugador1").apodo,
                        color: Storage.get("Jugador1").color,
                        foto: Storage.get("Jugador1").foto,
                        puntajeT: Total3,
                        puntajeG: Storage.get("Jugador1").puntajeG,
                        puntajeJ3: Storage.get("Jugador1").puntajeJ3,
                        Total: Storage.get("Jugador1").Total
                    }      
                    localStorage.setItem("Jugador1", JSON.stringify(Jugador1Copia))

                    let Jugador2Copia = {
                        nombre: Storage.get("Jugador2").nombre,
                        apodo: Storage.get("Jugador2").apodo,
                        color: Storage.get("Jugador2").color,
                        foto: Storage.get("Jugador2").foto,
                        puntajeT: Total4,
                        puntajeG: Storage.get("Jugador2").puntajeG,
                        puntajeJ3: Storage.get("Jugador2").puntajeJ3,
                        Total: Storage.get("Jugador2").Total
                    }
                    localStorage.setItem("Jugador2", JSON.stringify(Jugador2Copia))

                    document.getElementById("botonesT").style.width = "100%";
                    document.getElementById("botonesT").style.height = "100%";
                    document.getElementById("botonesT").style.backgroundColor = "rgba(50, 50, 50, 0.7)";
                    document.getElementById("botonesT").style.position = "absolute";
                    document.getElementById("botonesT").style.display = "grid";
                    document.getElementById("botonesT").style.gridTemplateColumns = "250px 250px";
                    document.getElementById("botonesT").style.gridAutoRows = "120px";
                    document.getElementById("botonesT").style.justifyContent = "center";
                    document.getElementById("botonesT").style.justifyItems = "center";
                    document.getElementById("botonesT").style.alignItems = "center";
                    document.getElementById("botonesT").style.alignContent = "center";
                    document.getElementById("mostrarganador").style.display = "flex";
                }
            };
        };
    }
}