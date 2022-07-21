let Jugador1= {
    nombre: "",
    apodo: "",
    color: "",
    foto: "",
    puntajeT: 0,
    puntajeG: 0,
    puntajeJ3: 0,
    Total: 0
}

let Jugador2= {
    nombre: "",
    apodo: "",
    color: "",
    foto: "",
    puntajeT: 0,
    puntajeG: 0,
    puntajeJ3: 0,
    Total: 0
}

function store() {
    let nombre = document.getElementById("inputNombre").value;
    let apodo = document.getElementById("inputApodo").value;
    let color = document.getElementById("inputColor").value;
    let foto = document.getElementById("foto").src;

    if(nombre === "" ||  apodo === "" || color === "#e01a59" || color === "#c1272d" || color === "#ff0000" || foto === ""){
        alert("Complete el campo correctamente");
    }else{
        if(Storage.get("Jugador1") == null){
            Jugador1.nombre = nombre
            Jugador1.apodo = apodo
            Jugador1.color = color
            Jugador1.foto = foto

            Storage.put("Jugador1", Jugador1);
            window.location.href = "index.html";
        }else{
            if(nombre == Storage.get("Jugador1").nombre){
                alert("Complete este campo con otro nombre distinto");
            }else if(apodo == Storage.get("Jugador1").apodo){
                alert("Complete este campo con otro apodo distinto");
            } else if(color == Storage.get("Jugador1").color){
                alert("Complete este campo con otro color distinto");
            }else{
                Jugador2.nombre = nombre
                Jugador2.apodo = apodo
                Jugador2.color = color
                Jugador2.foto = foto

                Storage.put("Jugador2", Jugador2);
                window.location.href = "general.html";
            }
        }
    }
}

function mostrarNombres(){
    let nombreJugador1 = Storage.get('Jugador1').nombre;
    let nombreJugador2 = Storage.get('Jugador2').nombre;
    let colorJugador1 = Storage.get('Jugador1').color;
    let colorJugador2 = Storage.get('Jugador2').color;
    
    document.getElementById("Jugador1").innerHTML = nombreJugador1;
    document.getElementById("Jugador1").style.color = colorJugador1;
    document.getElementById("Jugador2").innerHTML = nombreJugador2;
    document.getElementById("Jugador2").style.color = colorJugador2;
}

function mostrarFoto(){
    let nombreJugador1 = Storage.get('Jugador1').nombre;
    let nombreJugador2 = Storage.get('Jugador2').nombre;
    let colorJugador1 = Storage.get('Jugador1').color;
    let colorJugador2 = Storage.get('Jugador2').color;
    let fotoJugador1 = Storage.get('Jugador1').foto;
    let fotoJugador2 = Storage.get('Jugador2').foto;
    
    document.getElementById("imagenJugador1").src = fotoJugador1;
    document.getElementById("j1").innerHTML = nombreJugador1;
    document.getElementById("j1").style.color = colorJugador1;
    document.getElementById("imagenJugador2").src = fotoJugador2;
    document.getElementById("j2").innerHTML = nombreJugador2;
    document.getElementById("j2").style.color = colorJugador2;
}

function puntajes(){
    let puntajeTJugador1 = Storage.get('Jugador1').puntajeT;
    let puntajeGJugador1 = Storage.get('Jugador1').puntajeG;
    let puntajeJ3Jugador1 = Storage.get('Jugador1').puntajeJ3;
    let TotalJugador1 = Storage.get('Jugador1').Total;
    let puntajeTJugador2 = Storage.get('Jugador2').puntajeT;
    let puntajeGJugador2 = Storage.get('Jugador2').puntajeG;
    let puntajeJ3Jugador2 = Storage.get('Jugador2').puntajeJ3;
    let TotalJugador2 = Storage.get('Jugador2').Total;
    
    TotalJugador1 = Storage.get("Jugador1").puntajeT + Storage.get("Jugador1").puntajeG + Storage.get("Jugador1").puntajeJ3;
    TotalJugador2 = Storage.get("Jugador2").puntajeT + Storage.get("Jugador2").puntajeG + Storage.get("Jugador2").puntajeJ3;

    document.getElementById("T1").innerHTML = puntajeTJugador1;
    document.getElementById("G1").innerHTML = puntajeGJugador1;
    document.getElementById("J31").innerHTML = puntajeJ3Jugador1;
    document.getElementById("total1").innerHTML = TotalJugador1;
    document.getElementById("T2").innerHTML = puntajeTJugador2;
    document.getElementById("G2").innerHTML = puntajeGJugador2;
    document.getElementById("J32").innerHTML = puntajeJ3Jugador2;
    document.getElementById("total2").innerHTML = TotalJugador2;
}

function editarPerfiles(){
    let nombre = document.getElementById("inputNombre").value;
    let apodo = document.getElementById("inputApodo").value;
    let color = document.getElementById("inputColor").value;
    let foto = document.getElementById("foto").src;
    let seleccion = document.getElementById("select");

    if(seleccion.value === "Jugador1"){
        let Jugador1Copia = {
            nombre: nombre == "" ? Storage.get("Jugador1").nombre : nombre,
            apodo: apodo == "" ? Storage.get("Jugador1").apodo : apodo,
            color: color == "" ? Storage.get("Jugador1").color : color,
            foto: foto == "" ? Storage.get("Jugador1").foto : foto,
            puntajeT: Storage.get("Jugador1").puntajeT,
            puntajeG: Storage.get("Jugador1").puntajeG,
            puntajeJ3: Storage.get("Jugador1").puntajeJ3,
            Total: Storage.get("Jugador1").Total
        };
        Storage.put("Jugador1", Jugador1Copia);
        window.location.href = "general.html";
        
    }else{
        let Jugador2Copia = {
            nombre: nombre == "" ? Storage.get("Jugador2").nombre : nombre,
            apodo: apodo == "" ? Storage.get("Jugador2").apodo : apodo,
            color: color == "" ? Storage.get("Jugador2").color : color,
            foto: foto == "" ? Storage.get("Jugador2").foto : foto,
            puntajeT: Storage.get("Jugador2").puntajeT,
            puntajeG: Storage.get("Jugador2").puntajeG,
            puntajeJ3: Storage.get("Jugador2").puntajeJ3,
            Total: Storage.get("Jugador2").Total

            
        };
        Storage.put("Jugador2", Jugador2Copia);
        window.location.href = "general.html";
    }
}
