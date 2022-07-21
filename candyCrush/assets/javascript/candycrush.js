
    const DnD = {
        dragEl: null,
        onDragStart: function(e) {
            dragEl = e.target;
            this.classList.add("drag--moving");
            DnD.dragEl = this;
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/html", this.innerHTML);
            colorInicial =  this.style.backgroundImage;
            cellIdInicial = parseInt(this.id);
        },
        onDragOver: function(e) {
          if (dragEl) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
          }

        },
        onDragEnter: function(e) {
            if (dragEl) {
                e.target.classList.add('over');
            }
        },
        onDragLeave: function(e) {
            if (dragEl) {
                e.target.classList.remove('over');
            }
        },
        onDrop: function(e) {
          if (e.stopPropagation) e.stopPropagation();
          colorFinal = this.style.backgroundImage;
          cellIdFinal = parseInt(this.id)
          this.style.backgroundImage = colorInicial;
          cells[cellIdInicial].style.backgroundImage = colorFinal;
          return false;
        },
        onDragEnd: function(e) {
          this.classList.remove("drag--moving");
          console.log('dragEnd')
          //movimientos validos
  
          let movimientos = [
              cellIdInicial -1, 
              cellIdInicial-width,
              cellIdInicial + 1, 
              cellIdInicial +width,
            ]
  
          let validMove = movimientos.includes(cellIdFinal);
          const existMovie = validarMovimiento(cells)
          if(cellIdFinal && validMove && existMovie) {
              iniciarPuntaje = true;
              cellIdFinal = null;
             
              setTimeout(() => {
                  validaciones();
                  pintarPuntaje();
  
              }, 200);
              if(!validarSiQuedanMovimientosDisponiblesEnTablero()){
                  cargarNuevasFichas()
              }
              
          } else if(cellIdFinal && !validMove){
              cells[cellIdFinal].style.backgroundImage =  colorFinal;
              cells[cellIdInicial].style.backgroundImage = colorInicial;
  
          } else{
              cells[cellIdFinal].style.backgroundImage =  colorFinal;
              cells[cellIdInicial].style.backgroundImage = colorInicial;
          }
  
        }
      };
    let statusJugadores = 
    [
        {
            name:Storage.get("Jugador1").nombre,
            puntaje : 0,
            id:1,
            isJugo: false
        },
        {
            name:Storage.get("Jugador2").nombre,
            puntaje : 0,
            id:2,
            isJugo: false
        }
    ];
    let statusActual = {
        name:Storage.get("Jugador1").nombre,
        puntaje: 0,
        id:1

    }
    const contenedor = document.querySelector('.contenedor');
    let stopGame = false;
    asignadorToStart = (Math.floor(Math.random() * 2) + 1);
    const width = 8;
    let minuto = 1;
    let segundos = 59;
    let JugadorActual = Storage.get("Jugador1").nombre;
    let iniciarPuntaje = false;
    
    let cells = [];
    const candyColors = [
        'url(assets/img/caramelo1.png)',
        'url(assets/img/caramelo2.png)',
        'url(assets/img/caramelo3.png)',
        'url(assets/img/caramelo4.png)',
        'url(assets/img/caramelo6.png)',
        'url(assets/img/caramelo7.png)',
        'url(assets/img/caramelo8.png)'
      ]
    let score = 0;

    //crear tablaero
    function crearTablero() {
        for (let i = 0; i < width*width; i++) {
            const cell  = document.createElement('div');    
            cell.classList.add('cellImg');
            cell.setAttribute('draggable', true);
            cell.setAttribute('id', i);
            let color =  Math.floor(Math.random() * candyColors.length);
            cell.style.backgroundImage = candyColors[color];
            contenedor.appendChild(cell);
            cells.push(cell);
        }

    }

    function removeTablero(){
        for(let i = 0; i< width*width; i++){
            const cell = document.getElementById(i.toString());
            contenedor.removeChild(cell)
        }
        cells = [];
    }

    // arrastrar los objetos
    let colorInicial;
    let colorFinal;
    let cellIdInicial;
    let cellIdFinal;

    function dragStart() {
        console.log('dragStar');
        colorInicial =  this.style.backgroundImage;
        cellIdInicial = parseInt(this.id);

    }

    function dragOver(e) {
        e.preventDefault();

    }
    function dragEnter(e) {
        e.preventDefault()

    }
    function dragLeave() {
        // this.style.backgroundImage = ''
    }

    function dragDrop() {
        colorFinal = this.style.backgroundImage;
        cellIdFinal = parseInt(this.id)
        this.style.backgroundImage = colorInicial;
        cells[cellIdInicial].style.backgroundImage = colorFinal;

    }

    function dragEnd() {
        console.log('dragEnd')
        //movimientos validos

        let movimientos = [
            cellIdInicial -1, 
            cellIdInicial-width,
            cellIdInicial + 1, 
            cellIdInicial +width,
          ]

        let validMove = movimientos.includes(cellIdFinal);
        const existMovie = validarMovimiento(cells)
        if(cellIdFinal && validMove && existMovie) {
            iniciarPuntaje = true;
            cellIdFinal = null;
           
            setTimeout(() => {
                validaciones();
                pintarPuntaje();

            }, 200);
            if(!validarSiQuedanMovimientosDisponiblesEnTablero()){
                cargarNuevasFichas()
            }
            
        } else if(cellIdFinal && !validMove){
            cells[cellIdFinal].style.backgroundImage =  colorFinal;
            cells[cellIdInicial].style.backgroundImage = colorInicial;

        } else{
            cells[cellIdFinal].style.backgroundImage =  colorFinal;
            cells[cellIdInicial].style.backgroundImage = colorInicial;
        }


    }

    //validar si existe movimiento

    function validarMovimiento(items){

        if(validarMovimientoColumna(items) || validarMovimientoFila(items)){
            return true
        }else{
            return false
        }
       
    }

    function validarMovimientoFila(items){

        for(i = 0; i <= 61; i++) {
            let filaDeTres = [i, i+1, i+2]
            let colorActive = items[i].style.backgroundImage;
            const isBlank = items[i].style.backgroundImage === '';
            const invalidMov = [6, 7, 14,15, 22, 23, 30, 31, 38, 39, 46,47, 54, 55]
            
            if(invalidMov.includes(i)) continue

            if(filaDeTres.every(index => items[index].style.backgroundImage === colorActive && !isBlank)){
                return true;
            }
        }

    }

    function validarMovimientoColumna(items){
        for(i = 0; i <= 47; i++) {
            let columDeTres = [i, i+width, i+width*2]
            let colorActive = items[i].style.backgroundImage;
            const isBlank = items[i].style.backgroundImage === '';


            if(columDeTres.every(index => items[index].style.backgroundImage === colorActive && !isBlank)){
                return true;
            }
        }
    }

    function validarSiQuedanMovimientosDisponiblesEnTablero(){

        for(let i = 0; i<width; i++){ 

            for(j = 0; j<width; j++){

                let pos = i;
                if(i > 0){
                    pos =(i * j *width) + i;
                }

                if(i < 5 &&  cells[pos].style.backgroundImage == cells[pos+1].style.backgroundImage){
                    if(j==0){
                        let imags = [cells[pos+3].style.backgroundImage, cells[(pos+1)+width].style.backgroundImage];
                        imags.forEach(element => {
                            if(element == cells[pos].style.backgroundImage){
                                return true
                            }
                        });
                    } else
                    if(j==7){
                        let imags = [cells[pos+3].style.backgroundImage, cells[(pos+1)-width].style.backgroundImage];
                        imags.forEach(element => {
                            if(element == cells[pos].style.backgroundImage){
                                return true
                            }
                        });
                    }else{
                        let imags = [cells[pos+3].style.backgroundImage, cells[(pos+1)-width].style.backgroundImage, cells[(pos+1)+width].style.backgroundImage];
                        imags.forEach(element => {
                            if(element == cells[pos].style.backgroundImage){
                                return true
                            }
                        });
                    }



                }else if(i < 6 && cells[pos].style.backgroundImage === cells[pos+2].style.backgroundImage){
                    if(j==0){
                        let imags = [cells[(pos+1)+width].style.backgroundImage];
                        imags.forEach(element => {
                            if(element == cells[pos].style.backgroundImage){
                                return true
                            }
                        });
                    } else
                    if(j==7){
                        let imags = [cells[(pos+1)-width].style.backgroundImage];
                        imags.forEach(element => {
                            if(element == cells[pos].style.backgroundImage){
                                return true
                            }
                        });
                    } else{
                        let imags = [cells[(pos+1)-width].style.backgroundImage, cells[(pos+1)+width].style.backgroundImage];
                        imags.forEach(element => {
                            if(element == cells[pos].style.backgroundImage){
                                return true
                            }
                        });
                    }

                }

                if(j < 5 && cells[pos].style.backgroundImage === cells[pos+width].style.backgroundImage){
                    if(i==0){
                        let imags = [cells[pos+width*2].style.backgroundImage, cells[(pos+width)+1].style.backgroundImage];
                        imags.forEach(element => {
                            if(element == cells[pos].style.backgroundImage){
                                return true
                            }
                        });
                    }else
                    if(i==7){
                        let imags = [cells[pos+width*2].style.backgroundImage, cells[(pos+width)-1].style.backgroundImage];
                        imags.forEach(element => {
                            if(element == cells[pos].style.backgroundImage){
                                return true
                            }
                        });
                    } else{
                        let imags = [cells[pos+width*2].style.backgroundImage, cells[(pos+width)-1].style.backgroundImage, cells[(+width)+1].style.backgroundImage, cells[(pos-1)-width].style.backgroundImage];
                        imags.forEach(element => {
                            if(element == cells[pos].style.backgroundImage){
                                return true
                            }
                        });
                    }

                } else if(j < 6 && cells[pos].style.backgroundImage === cells[pos + (width*2)].style.backgroundImage){
                    if(i == 0){
                        let imags = [cells[(pos+1)+1].style.backgroundImage];
                        imags.forEach(element => {
                            if(element == cells[pos].style.backgroundImage){
                                return true
                            }
                        });
                    }else

                    if(i == 7){
                        let imags = [cells[(pos+1)-1].style.backgroundImage];
                        imags.forEach(element => {
                            if(element == cells[pos].style.backgroundImage){
                                return true
                            }
                        });
                    } else{
                        let imags = [cells[(pos+1)-1].style.backgroundImage, cells[(pos+1)-1].style.backgroundImage];
                        imags.forEach(element => {
                            if(element == cells[pos].style.backgroundImage){
                                return true
                            }
                        });
                    }

                }
                
            }
        }
    }

    //validar movimientos en las filas

    function validarCincoEnFila() {
        for(i = 0; i < 59; i++) {
            let filaDeCuatro = [i, i+1, i+2, i+3, i+4]
            let colorActive = cells[i].style.backgroundImage;
            const isBlank = cells[i].style.backgroundImage === '';
            const invalidMov = [4,5, 6, 7, 11, 12,13, 14, 20,21, 22, 23, 28,29, 30, 31, 36,37, 38, 39, 44,45, 46,47, 52,53, 54, 55]
            
            if(invalidMov.includes(i)) continue

            if(filaDeCuatro.every(index => cells[index].style.backgroundImage === colorActive && !isBlank)){
                actualizarPuntaje(30)
                filaDeCuatro.forEach(element => {
                    cells[element].style.backgroundImage = '';
                });
                cargarNuevasFichas();
            }
        }
    }

    function validarCuatroEnFila() {
        for(i = 0; i < 60; i++) {
            let filaDeCuatro = [i, i+1, i+2, i+3]
            let colorActive = cells[i].style.backgroundImage;
            const isBlank = cells[i].style.backgroundImage === '';
            const invalidMov = [5, 6, 7, 12, 13, 14, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46,47, 53, 54, 55]
            
            if(invalidMov.includes(i)) continue

            if(filaDeCuatro.every(index => cells[index].style.backgroundImage === colorActive && !isBlank)){
                actualizarPuntaje(20)
                filaDeCuatro.forEach(element => {
                    cells[element].style.backgroundImage = '';
                });
                cargarNuevasFichas();
            }
        }
    }

    function validarTresEnFila() {
        for(i = 0; i <= 61; i++) {
            let filaDeTres = [i, i+1, i+2]
            let colorActive = cells[i].style.backgroundImage;
            const isBlank = cells[i].style.backgroundImage === '';
            const invalidMov = [6, 7, 14,15, 22, 23, 30, 31, 38, 39, 46,47, 54, 55]
            
            if(invalidMov.includes(i)) continue

            if(filaDeTres.every(index => cells[index].style.backgroundImage === colorActive && !isBlank)){
                actualizarPuntaje(10)
                filaDeTres.forEach(element => {
                    cells[element].style.backgroundImage = '';
                });
                cargarNuevasFichas();
            }
        }
    }

    //Validar los movimientos en las columnas

    function validarCincoEnColumna() {
        for(i = 0; i <= 31; i++) {
            let columDeCuatro = [i, i+width, i+width*2, i+width*3, i+width*4]
            let colorActive = cells[i].style.backgroundImage;
            const isBlank = cells[i].style.backgroundImage === '';


            if(columDeCuatro.every(index => cells[index].style.backgroundImage === colorActive && !isBlank)){
                actualizarPuntaje(30)
                columDeCuatro.forEach(element => {
                    cells[element].style.backgroundImage = '';
                });
                cargarNuevasFichas();
            }
        }
    }

    function validarCuatroEnColumna() {
        for(i = 0; i <= 39; i++) {
            let columDeCuatro = [i, i+width, i+width*2, i+width*3]
            let colorActive = cells[i].style.backgroundImage;
            const isBlank = cells[i].style.backgroundImage === '';


            if(columDeCuatro.every(index => cells[index].style.backgroundImage === colorActive && !isBlank)){
                actualizarPuntaje(20)
                columDeCuatro.forEach(element => {
                    cells[element].style.backgroundImage = '';
                });
                cargarNuevasFichas();
            }
        }
    }

    function validarTresEnColumna() {
        for(i = 0; i <= 47; i++) {
            let columDeTres = [i, i+width, i+width*2]
            let colorActive = cells[i].style.backgroundImage;
            const isBlank = cells[i].style.backgroundImage === '';


            if(columDeTres.every(index => cells[index].style.backgroundImage === colorActive && !isBlank)){
                actualizarPuntaje(10)
                columDeTres.forEach(element => {
                    cells[element].style.backgroundImage = '';
                });
                cargarNuevasFichas();
            }
        }
    }

    //cargar nuevas fichas
    function cargarNuevasFichas() {
        for (i = 63; i >= 0; i--) {
            if(cells[i].style.backgroundImage == '') {
                let nuevaFicha = crearElementosCercanos(i)
                cells[i].style.backgroundImage = nuevaFicha
            }
        }
        setTimeout(() => {
            validaciones();
            pintarPuntaje();
        }, 200);

    }

    function crearElementosCercanos(i){
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        const isFirstRow = firstRow.includes(i)
        if (isFirstRow && (cells[i].style.backgroundImage === '')) {
          let randomColor = Math.floor(Math.random() * candyColors.length)
         return candyColors[randomColor]
        }else{
            let pos = i;
            if( pos >= 0){
                if(cells[pos].style.backgroundImage != ''){
                    let nuevaFicha = cells[pos].style.backgroundImage;
                    cells[pos].style.backgroundImage = '';
                    return nuevaFicha
                }else{
                    let j = pos-width;
                    while(j >= 0){
                        if(cells[j].style.backgroundImage != ''){
                            let nuevaFicha = cells[j].style.backgroundImage;
                            cells[j].style.backgroundImage = '';
                            return nuevaFicha;
                        }
                        j = j-width;
                        if(j < 0){
                            let randomColor = Math.floor(Math.random() * candyColors.length);
                            let nuevaFicha = candyColors[randomColor]
                            return nuevaFicha;
                        }
                    }
                }
            }else{
                let randomColor = Math.floor(Math.random() * candyColors.length);
                return  candyColors[randomColor]
            }

        }

    }

    function validaciones(){
        validarCincoEnColumna()
        validarCuatroEnColumna()
        validarTresEnColumna();

        validarCincoEnFila();
        validarCuatroEnFila();
        validarTresEnFila()

    }

    ///otras validaciones

    function  pintarPuntaje() {
        const scoreLocal = document.getElementById('score')
        scoreLocal.innerHTML = score;
    }
   
        
    function actualizarPuntaje(puntaje){
        if( iniciarPuntaje){
            score += puntaje
            statusActual.puntaje = statusActual.puntaje + puntaje;
        }

    }

    function pintarTiempo() {
        const tiempoLocalMin = document.getElementById("tiempo");
        tiempoLocalMin.innerHTML = `${minuto} : ${segundos}`;
    }

    function pintarNombreJugador(nombre){
        document.getElementById('nombreJugador').innerHTML = nombre
    }

   
    function actualizarTiempo(){
        pintarTiempo();
        segundos--;
        if(segundos == 0){
            if(minuto == 0 && segundos == 0){
                stopGame = true
                validarJugador();
                cambiarDeJugador()
                return
            }
            segundos = 59;
            minuto = minuto -1;
        }       
        
    }

    function validarJugador(){
    if(statusActual.id == 1){
        statusJugadores[0].isJugo = true;
        statusJugadores[0].puntaje = score;
    } else if(statusActual.id == 2){
        statusJugadores[1].isJugo = true
        statusJugadores[1].puntaje = score;
    }
}

    function reset(){

        if(statusJugadores[0].isJugo && statusJugadores[1].isJugo){
            document.getElementById("cambioJugador").style.display = "none";
            buscarGanador()
            return;
        } else if(statusJugadores[0].isJugo){
            statusActual.name = statusJugadores[1].name
            statusActual.puntaje = statusJugadores[1].puntaje
            statusActual.id = statusJugadores[1].id
            score = 0;
            minuto = 1;
            segundos = 59;
            iniciarPuntaje = false;
            removeTablero();
            crearTablero();
            cells.forEach(cell => cell.addEventListener('dragstart', dragStart));
            cells.forEach(cell => cell.addEventListener('dragend', dragEnd));
            cells.forEach(cell => cell.addEventListener('dragover', dragOver));
            cells.forEach(cell => cell.addEventListener('dragenter', dragEnter));
            cells.forEach(cell => cell.addEventListener('dragleave', dragLeave));
            cells.forEach(cell => cell.addEventListener('drop', dragDrop));
            validaciones()
            document.getElementById("cambioJugador").style.display = "none";
            JugadorActual = Storage.get("Jugador2").nombre;
            pintarNombreJugador(JugadorActual)
            pintarPuntaje();
            stopGame = false;
            return;

        }else if(statusJugadores[1].isJugo){

        }

    }

    function buscarGanador(){
        if(statusJugadores[0].puntaje == statusJugadores[1].puntaje){
            pintarResultados(null)
        } else if(statusJugadores[0].puntaje > statusJugadores[1].puntaje){
            pintarResultados(statusJugadores[0])
        }else{
            pintarResultados(statusJugadores[1])
        }
    }

    function pintarResultados(ganador){
        if(ganador == null){
        mostrarResultados(null, null)
        }else{
            if(ganador.id == 1){
                const scoreJ3 = Storage.get("Jugador1").puntajeJ3 + 30;
                const scoreTotal = Storage.get("Jugador1").puntajeT +  Storage.get("Jugador1").puntajeG + scoreJ3
                let Jugador1 = {
                    nombre: Storage.get("Jugador1").nombre,
                    apodo: Storage.get("Jugador1").apodo,
                    color: Storage.get("Jugador1").color,
                    foto: Storage.get("Jugador1").foto,
                    puntajeT: Storage.get("Jugador1").puntajeT,
                    puntajeG: Storage.get("Jugador1").puntajeG,
                    puntajeJ3: scoreJ3,
                    Total:scoreTotal
                }
                localStorage.setItem("Jugador1", JSON.stringify(Jugador1))
              
            } else if(ganador.id == 2){
                const scoreJ3 = Storage.get("Jugador2").puntajeJ3 + 30;
                const scoreTotal = Storage.get("Jugador2").puntajeT +  Storage.get("Jugador2").puntajeG + scoreJ3
                let Jugador2 = {
                    nombre: Storage.get("Jugador2").nombre,
                    apodo: Storage.get("Jugador2").apodo,
                    color: Storage.get("Jugador2").color,
                    foto: Storage.get("Jugador2").foto,
                    puntajeT: Storage.get("Jugador2").puntajeT,
                    puntajeG: Storage.get("Jugador2").puntajeG,
                    puntajeJ3: scoreJ3,
                    Total: scoreTotal
                }
                localStorage.setItem("Jugador2", JSON.stringify(Jugador2))
    
            }
            mostrarResultados(ganador, true);
        }
    }

       
    function mostrarResultados(ganador, fin){

        document.getElementById("botonesT").style.width = "100%";
        document.getElementById("botonesT").style.height = "100%";
        document.getElementById("botonesT").style.backgroundColor = "rgba(128, 128, 128, 0.7)"; 
        document.getElementById("botonesT").style.position = "absolute";
        document.getElementById("botonesT").style.display = "flex";
        document.getElementById("botonesT").style.justifyContent = "center";
        document.getElementById("botonesT").style.alignItems = "center";
        document.getElementById("botonesT").style.flexDirection = "column";
        document.getElementById("mostrarganador").style.display = "flex";
        document.getElementById("mostrarganador").style.flexDirection = "row";

        if(fin !== null){
            if(!fin){
               
            }else{
                document.getElementById("mostrarganador").innerHTML = `${ganador.name} GANASTE `
            }
            
        }else{
            document.getElementById("mostrarganador").innerHTML = 'EMPATE'
        }

    }

    function cambiarDeJugador(){

        document.getElementById("cambioJugador").style.width = "100%";
        document.getElementById("cambioJugador").style.height = "100%";
        document.getElementById("cambioJugador").style.backgroundColor = "rgba(128, 128, 128, 0.7)"; 
        document.getElementById("cambioJugador").style.position = "absolute";
        document.getElementById("cambioJugador").style.display = "flex";
        document.getElementById("cambioJugador").style.flexDirection = "column";
        document.getElementById("cambioJugador").style.justifyContent = "center";
        document.getElementById("cambioJugador").style.alignItems = "center";
        document.getElementById("jugadorActual").style.display = "block";
        document.getElementById("jugadorActual").style.textAlign = "center";
        document.getElementById("jugadorActual").style.padding = "1rem";

        document.getElementById("jugador").innerHTML = statusActual.name +  " con " + statusActual.puntaje + " puntos.";
        const element = document.getElementById("botonAceptar").onclick = function() {reset()};
        // element.addEventListener("click", function(){
        //     reset()
        // });

    }

    function initial(){
        crearTablero();
        cells.forEach(cell => cell.addEventListener('dragstart', DnD.onDragStart, false));
        cells.forEach(cell => cell.addEventListener('dragend', DnD.onDragEnd, false));
        cells.forEach(cell => cell.addEventListener('dragover', DnD.onDragOver, false));
        cells.forEach(cell => cell.addEventListener('dragenter', DnD.onDragEnter, false));
        cells.forEach(cell => cell.addEventListener('dragleave', DnD.onDragLeave, false));
        cells.forEach(cell => cell.addEventListener('drop', DnD.onDrop, false));
        validaciones();
        pintarPuntaje();
        pintarTiempo();
        pintarNombreJugador(JugadorActual);
        window.setInterval(()=>{
            if(stopGame){
    
            }else{
                actualizarTiempo();
            }
        }, 1000);
    }