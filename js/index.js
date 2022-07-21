/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  console.log('Runing cordova-' + cordova.platformId + '@' + cordova.version);
  //document.getElementById('deviceready').classList.add('ready');

  initGame();
}

function initGame(){
  if(detectarPerfiles()){
    window.location = "general.html";
  }
}

function detectarPerfiles(){
  let perfiles = window.localStorage.getItem("perfiles");
  if(perfiles !== null){
    return true;
  }
  return false;
}

function sacarFoto(){
  let cameraOptions = {
    quality: 75,
    destinationType: Camera.DestinationType.DATA_URL
  };
  navigator.camera.getPicture(onSuccess, onFail, cameraOptions);
}

function onSuccess(imgData){
  document.getElementById("foto").src ="data:image/jpeg;base64," + imgData;
}

function onFail(msg){
  alert("No se pudo tomar la foto. Motivo:" + msg);
}

/*function store() {
  // Leer los input:
  let keyInput = document.getElementById("key");
  let valueInput = document.getElementById("value");

  // Guardar los datos en el LocalStorage:
  Storage.put(keyInput.value.trim(), JSON.parse(valueInput.value.trim()));

  // Resetear formulario:
  keyInput.value = "";
  valueInput.value = "";

  // Actualizar tabla:
  fill();
}*/

// Ontener el valor de una clave

function fill() {
  let cont = document.querySelector("#ls tbody");
  cont.innerHTML = null;
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = Storage.get(key);
    let tr = document.createElement("tr");
    let tdk = document.createElement("td");
    tdk.innerHTML = key;
    tr.appendChild(tdk);
    let tdv = document.createElement("td");
    tdv.innerHTML = value !== null ? JSON.stringify(value) : "_NULL_";
    tr.appendChild(tdv);
    let tdborrar = document.createElement("td");
    let btnborrar = document.createElement("button");
    btnborrar.innerHTML = "X";
    btnborrar.onclick = function () {
      Storage.del(key);
      fill();
    };
    tdborrar.appendChild(btnborrar);
    tr.appendChild(tdborrar);
    cont.appendChild(tr);
  }
}
