
  const firebaseConfig = {
    apiKey: "AIzaSyBXZOWobzJlVPHYcm6KXFbByv6654dcKOk",
    authDomain: "wa-avisos-60bd2.firebaseapp.com",
    projectId: "wa-avisos-60bd2",
    storageBucket: "wa-avisos-60bd2.appspot.com",
    messagingSenderId: "602741880834",
    appId: "1:602741880834:web:3d878bae1d0829bcb78f1b"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storageRef = firebase.storage().ref();


/* Crear*/
function createDB(coleccion, data){
  db.collection(coleccion).doc().set(data).then((msj) =>{
    alert("Datos guardados correctamente");
  }).catch((msj) =>{
    alert("Error al guardar datos");
  })
}
/* Actualizar */
function updateDB(coleccion, id, data){
  db.collection(coleccion).doc(id).update(data).then((msj) => {
    alert("Datos actualizados correctamente");
  }).catch((msj) =>{
    alert("Error al actualizar datos")
  })
}
/* Eliminar */
function deleteDB(coleccion, id){
    db.collection(coleccion).doc(id).delete().then((msj) => {
      alert("Documento eliminado");
    }).catch((msj) => {
      alert("Error al eliminar documento");
    });
}
/* Galeria */
/* function setGaleria(){
  let imgGaleria = document.querySelector("#imgGaleria");
  let imgSubir = imgGaleria.files[0];
  let task = storageRef.child('imagenes/' + imgSubir.name).put(imgSubir);

  task.then(onSnapshot => onSnapshot.ref.getDownloadURL()).then( url =>{
    
  })
} */

/* ================================== GUARDAR REGISTRO ====================================== */
function limpiarRegistro(){
    let correo = document.querySelector("#correo");
    let contrasena = document.querySelector("#contrasena");
    let nombres = document.querySelector("#nombres");
    let ciudad = document.querySelector("#ciudad");
    let telefono = document.querySelector("#telefono");

    correo.value = "";
    correo.value = "";
    contrasena.value = "";
    nombres.value = "";
    ciudad.value = "";
    telefono.value = "";
}

function validarCorreo(){
    let correo = document.querySelector("#correo").value;
    
    db.collection("personas").get().then(coleccion =>{
        let array = coleccion.docs;
        let documento;
        for (let i = 0; i < array.length; i++) {
            documento = array[i].data();
            console.log(documento);
            if(documento.correo == correo){
                alert("El correo ya se encuentra registrado");
                limpiarRegistro();
                document.querySelector("#correo").focus();
            }

        }      
    })
    
}

function guardarRegistro(){

    let fechaActual = new Date();
    const diaActual = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() + 1;
    const anioActual = fechaActual.getFullYear();

    let idPersona = Math.random() * (100 - 1) + 1;
    let fecha = anioActual+"-"+mesActual+"-"+diaActual;
    let estadoPago = false;
    db.collection("personas").get().then(coleccion =>{
        let array = coleccion.docs;
        /* idPersona = array.length + 1; */
        for (let i = 0; i < array.length; i++) {
            let objeto = array[i].data();
            if (objeto.idPersona == idPersona) {
                idPersona = Math.random() * (100 - 1) + 1;
            }
        }

        let id;
        let rol = document.querySelector("#rol_persona").value;
        let correo = document.querySelector("#correo").value;
        let contrasena = document.querySelector("#contrasena").value;
        let nombres = document.querySelector("#nombres").value;
        let ciudad = document.querySelector("#ciudad").value;
        let telefono = document.querySelector("#telefono").value;
        let expresiones = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        let valido = expresiones.test(correo);

        if (correo != "" && contrasena != "" && nombres != "" && ciudad != "" && telefono != ""){
            if (valido == true) {
                if (telefono.length == 9) {
                    var documento = db.collection("personas").doc();
                    documento.set({
                        id : documento.id,
                        idPersona,
                        rol,
                        correo,
                        contrasena,
                        nombres,
                        ciudad,
                        telefono,
                        fecha,
                        estadoPago
                    })
                    alert("Registro exitoso");
                    limpiarRegistro();
                }
                else{
                    alert("ingrese un número de celular válido");
                }
            }
            else{
                alert("Ingrese un correo valido");
            }
        }
        else{
            alert("Todos los campos son obligatorios");
        }
        
    }) 
    

}

/* ================================== LOGIN ====================================== */
function limpiarLogin(){
    let usuario = document.querySelector("#usuario_login");
    let password = document.querySelector("#password_login");
    usuario.value = "";
    password.value = "";
}

function validarUsuario(){
    let usuario = document.querySelector("#usuario").value;
    let password = document.querySelector("#password").value;

    if (usuario == "" || password == "") {
        alert("Ingrese las credenciales");
    }else{
        login(usuario,password);
    }
}

function login(usuario,password){
    db.collection("personas").onSnapshot(coleccion =>{
        let array = coleccion.docs;
        let usuarioTemporal
        let documento;

        for (let i = 0; i < array.length; i++) {
            documento = array[i].data();
            if (documento.correo == usuario && documento.contrasena == password) {
                usuarioTemporal = documento;
                if (documento.rol == 1) {
                    window.location.href = "root.html";
                localStorage.setItem("persona", JSON.stringify(usuarioTemporal));
                limpiarLogin();
                }
                else if (documento.rol == 2) {
                    window.location.href = "administrador.html";
                    /* sessionStorage.setItem("id", usuarioTemporal.id); */
                localStorage.setItem("persona", JSON.stringify(usuarioTemporal));
                limpiarLogin();
                }
                else if (documento.rol == 3) {
                    window.location.href = "comprador.html";
                /* sessionStorage.setItem("id", usuarioTemporal.id); */
                localStorage.setItem("persona", JSON.stringify(usuarioTemporal));
                limpiarLogin();
                }
                               

            }
        }
    })
}

function incioSesion(){
    let perfil = document.querySelector("#perfil");

    let persona = localStorage.getItem("persona");
    /* let nombres = JSON.parse(persona).nombres; */
    perfil.innerHTML = perfil.innerHTML + perfilData(persona);

    /* console.log(JSON.parse(persona).nombres); */
}

/* ================================== MODULO RECUPERAR CONTRASEÑA ====================================== */
function limpiarContrasena(){
    let miContrasena = document.querySelector("#miContrasena");
    miContrasena.value = "";
}

function limpiarRecuperar(){
    let correoRecuperar = document.querySelector("#correoRecuperar");
    correoRecuperar.value = "";
    location.reload();
}

function recuperarContrasena(){
    let contrasena = document.querySelector("#contrasena");
    let correoRecuperar = document.querySelector("#correoRecuperar").value;

    if (correoRecuperar == "") {
        alert("Por favor ingrese su correo de registro");
    }
    else{
        db.collection("personas").get().then(coleccion =>{
            let array = coleccion.docs;
            let password;
            let documento;
            for (let i = 0; i < array.length; i++) {
                documento= array[i].data();
                if (documento.correo == correoRecuperar) {
                    password = documento.contrasena;
                }
            }
            if (password){
                contrasena.innerHTML = contrasena.innerHTML + mostrarContrasena(password);
            }
            else{
                alert("Correo ingresado no existe en la base de datos");
            }
            
        })
    }
}

function mostrarContrasena(password){
    let template = `
    <div class="p-4">
        <input id="id_persona" type="number" hidden>
        <label for="">Su contraseña es </label>
        <input id="miContrasena" class="form-control mb-3" type="text" value="${password}" disabled>                          
    </div>
    `
    return template;
}

/* ================================== PERFIL DE USUARIO ====================================== */
function perfilData(persona) {
    let template = `
        <li><a class="dropdown-item" href="#">${JSON.parse(persona).nombres}</a></li>
        <li><a class="dropdown-item" href="#" onclick="confirmaCuenta(${JSON.parse(persona).idPersona})">Eliminar cuenta</a></li>
    `
    return template;
}

function limpiarNuevoAviso() {
    let titulo = document.querySelector("#titulo");
    let descripcion = document.querySelector("#descripcion");

    titulo.value = "0";
    descripcion.value = "";

}

function confirmaCuenta(idPersona){
    let mensaje;
    let opcion = confirm("¿Estas seguro que quieres eliminar tu cuenta?");
    if (opcion == true) {
        db.collection("personas").get().then(coleccion =>{
            let array = coleccion.docs;
            let documento;
            let id;
            for (let i = 0; i < array.length; i++) {
                documento = array[i].data();
                id = array[i].id
                if (documento.idPersona == idPersona) {
                    db.collection("personas").doc(id).delete().then((msj) => {
                        alert("Cuenta eliminada con éxito");
                        window.location.href = "https://clientparq.innovaservicios.pe/";
                      }).catch((msj) => {
                        alert("Error al eliminar documento");
                      });
                }
            }
        })
	}
	
}

function confirmaAviso(idAviso){

    let opcion = confirm("Estas seguro que quieres eliminar el aviso");
    if (opcion == true) {
        db.collection("avisos").get().then(coleccion =>{
            let array = coleccion.docs;
            let documento;
            let id;
            for (let i = 0; i < array.length; i++) {
                documento = array[i].data();
                id = array[i].id
                if (documento.indexAviso == idAviso) {
                    deleteDB("avisos", id)
                }
                
            }
        })
	}
}

function nuevoAviso() {
    let nuevoAviso = document.querySelector("#nuevoAviso");
    let persona = localStorage.getItem("persona");
    db.collection("avisos").get().then(coleccion =>{
        let array = coleccion.docs;
        let idAviso = Math.random() * (100 - 1) + 1;
        for (let i = 0; i < array.length; i++) {
            let objeto = array[i].data();
            if (objeto.idAviso == idAviso) {
                idAviso = Math.random() * (100 - 1) + 1;
            }
            
        }
        
        nuevoAviso.innerHTML = nuevoAviso.innerHTML + vistaNuevoAviso(persona, idAviso)
    })    
}

function vistaNuevoAviso(persona, idAviso){
    let template =`
        <div class="mb-2">
            <input id="indexAviso" type="text" class="form-control form-control-sm" value="${idAviso}" disabled hidden>
        </div>
        <div class="mb-2">
            <input id="id_comprador" type="text" class="form-control form-control-sm" value="${JSON.parse(persona).id}" disabled hidden>
        </div>
        <div class="mb-2">
            <label for="">Titulo</label>
            <select id="titulo" class="form-select mb-3" aria-label=".form-select-lg example">
                <option value="0" selected>Elegir un titulo</option>
                <option value="Compro">Compro</option>
                <option value="Busco alquilar">Busco alquilar</option>
                <option value="Busco">Busco</option>
            </select>
        </div>
        <div class="mb-2">
            <label for="exampleFormControlTextarea1" class="form-label">Descripción del producto o servicio</label>
            <textarea id="descripcion" class="form-control mb-3" id="exampleFormControlTextarea1" rows="4" placeholder="IMPORTANTE: En esta sección únicamente debes de escribir la descripción del producto o servicio, está prohibido poner el número de celular"></textarea>
        </div>
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="estado" checked>
            <label id="estado" class="form-check-label" for="estado">Estado de la publicación</label>
        </div>
        <div class="mb-2">
            <input id="nombres" type="text" class="form-control form-control-sm" value="${JSON.parse(persona).nombres}" disabled hidden>
        </div>
        <div class="mb-2">
            <input id="telefono"  type="text" class="form-control form-control-sm" value="${JSON.parse(persona).telefono}" disabled hidden>
        </div>
        <div class="mb-2">
            <input id="ciudad" type="text" class="form-control form-control-sm" value="${JSON.parse(persona).ciudad}" disabled hidden>
        </div>
    `
    return template;
}

/* ================================== GUARDAR AVISOS ====================================== */
function guardarAviso(){
    let id;
    let indexAviso = document.querySelector("#indexAviso").value;
    let id_comprador = document.querySelector("#id_comprador").value;
    let titulo = document.querySelector("#titulo").value;
    let descripcion = document.querySelector("#descripcion").value;
    let estado = document.querySelector("#estado").checked;
    let comprador = document.querySelector("#nombres").value;
    let telefono = document.querySelector("#telefono").value;
    let ciudad = document.querySelector("#ciudad").value;
    let fecha;

    /* Fecha */
    let fechaActual = new Date();
    let minutoActual = fechaActual.getMinutes();
    let horaActual = fechaActual.getHours();
    const diaActual = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() + 1;
    const anioActual = fechaActual.getFullYear();
    
    fecha = diaActual + "/" + mesActual + "/" + anioActual + " " + horaActual + ":" + minutoActual

    if (titulo != "" && descripcion != "") {
            var documento = db.collection("avisos").doc();
            documento.set({
                id: documento.id,
                indexAviso,
                id_comprador,
                titulo,
                descripcion,
                estado,
                comprador,
                telefono,
                ciudad,
                fecha
            });
            alert("Registro exitoso");
            limpiarNuevoAviso();
    }
    else{
        alert("Los campos son obligatorios")
    }
}

/* ================================== LISTAR AVISOS ====================================== */
function mostrarAvisoPropio() {

    let persona = localStorage.getItem("persona");
    let id = JSON.parse(persona).id;

    let avisoPropio = document.querySelector("#avisoPropio");

    db.collection("avisos").onSnapshot(coleccion =>{
        let array = coleccion.docs;
        let documento;
        let estadoVisual;
        let idAviso;

        for (let i = 0; i < array.length; i++) {
            documento = array[i].data();
            if (documento.id_comprador == id) {
                idAviso = documento.indexAviso;
                if (documento.estado == true) {
                    estadoVisual = "Disponible";
                }
                else{
                    estadoVisual = " No Disponible";
                }
                avisoPropio.innerHTML = avisoPropio.innerHTML + vistaAvisoPropio(documento, estadoVisual, idAviso);
            }
        }
    })
    
}

function estadoPago(){
    let persona = localStorage.getItem("persona");
    let fecha = JSON.parse(persona).fecha;
    let estadoPago = JSON.parse(persona).estadoPago;

    var fecha1 = new Date(fecha);
    var fecha2 = new Date();
    const f_Formateada1 = Date.UTC(fecha1.getFullYear(),fecha1.getMonth(),fecha1.getDate());
    const f_Formateada2 = Date.UTC(fecha2.getFullYear(),fecha2.getMonth(),fecha2.getDate());
    let day = (24*60*60*1000);
    let diferencia = ((f_Formateada2 - f_Formateada1) / day);
   
    if (estadoPago == true && diferencia <=29) {
        mostrarAvisoPagado();
    }
    else{
        mostrarAvisoGeneral();
    }
    
}

function mostrarAvisoGeneral(){
    let avisoGeneral = document.querySelector("#avisoGeneral");
    db.collection("avisos").onSnapshot(coleccion =>{
        let array = coleccion.docs;
        let documento;
        let estadoVisual;
        for (let i = 0; i < array.length; i++) {
            documento = array[i].data();
            if (documento.estado == true) {
                estadoVisual = "Disponible"
            }
            else{
                estadoVisual = "No Disponible"
            }
            avisoGeneral.innerHTML = avisoGeneral.innerHTML + vistaAvisoGeneral(documento, estadoVisual);
            
        }
    });
}

function mostrarAvisoPagado(){
    let avisoGeneral = document.querySelector("#avisoGeneral");

    db.collection("avisos").onSnapshot(coleccion =>{
        let array = coleccion.docs;
        let documento;
        let estadoVisual;
        /* let idAviso; */

        for (let i = 0; i < array.length; i++) {
            documento = array[i].data();
            if (documento.estado == true) {
                estadoVisual = "Disponible";
            }
            else{
                estadoVisual = " No Disponible";
            }
            avisoGeneral.innerHTML = avisoGeneral.innerHTML + vistaAvisoPagado(documento, estadoVisual);
        }
    })
}

function mostrarAvisoIndex(){
    let avisoIndex = document.querySelector("#avisoIndex");
    db.collection("avisos").onSnapshot(coleccion =>{
        let array = coleccion.docs;
        let documento;
        let estadoVisual;
        for (let i = 0; i < array.length; i++) {
            documento = array[i].data();
            if (documento.estado == true) {
                estadoVisual = "Disponible"
            }
            else{
                estadoVisual = " No Disponible"
            }
            avisoIndex.innerHTML = avisoIndex.innerHTML + vistaAvisoIndex(documento, estadoVisual);
            
        }
    });
}

/* Templates */

function vistaAvisoGeneral(documento, estadoVisual){
    let template = `
    <div class="col-auto">
        <div class="contenedor-articulo shadow">
            <div class="mb-2">
                <input id="id_comprador" type="number" class="form-control form-control-sm" value="${documento.id_comprador}" disabled hidden>
            </div>
            <div class="detalles text-center">
                <h4 class="fw-bold text-center">${documento.titulo}</h4>
                <hr>
                <textarea name="descripcion" id="" cols="18" rows="5" class="p-2" disabled>${documento.descripcion}</textarea>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="estado" ${documento.estado ? "checked":null} disabled>
                    <label class="form-check-label" for="estado">${estadoVisual}</label>
                </div>
            </div>
            <div class="fecha my-2">
                <span>Publicado: ${documento.fecha}</span>
            </div>
            <div class="text-center">
                <a href="/files/pages/pasarela.html"><span class="btn btn-success rounded-pill btn-estilo">Ofrecer</span></a>
            </div>
        </div>
    </div>
    `
    return template;
    
}

function vistaAvisoPropio(documento, estadoVisual, idAviso){
    console.log(idAviso);
    let template = `
    <div class="col-auto">
        <div class="contenedor-articulo1 shadow">
            <div class="mb-2">
                <input id="id_comprador" type="number" class="form-control form-control-sm" value="${documento.id_comprador}" disabled hidden>
            </div>
            <div class="detalles text-center">
                <h5 class="fw-bold text-center">${documento.titulo}</h5>
                <hr>
                <textarea name="descripcion" id="" cols="18" rows="3" class="p-2" disabled>${documento.descripcion}</textarea>
            </div>
            <div class="mb-2">
                <input id="nombres" type="text" class="form-control form-control-sm" value="${documento.comprador}" disabled>
            </div>
            <div class="mb-2">
                <input id="telefono" type="text" class="form-control form-control-sm" value="${documento.telefono}" disabled>
            </div>
            <div class="mb-2">
                <input id="ciudad" type="text" class="form-control form-control-sm" value="${documento.ciudad}" disabled>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="estado" ${documento.estado ? "checked":null} disabled>
                <label class="form-check-label" for="estado">${estadoVisual}</label>
            </div>
            <div class="fecha my-2">
                <span>Publicado: ${documento.fecha}</span>
            </div>
            <div class="text-center">
                <span data-bs-toggle="modal" data-bs-target="#editarAviso" class="btn btn-warning rounded-pill btn-estilo" onclick="mostrarEditarAviso(${idAviso})">Editar</span>
            </div>
            <div class="text-end pt-1">
                <a class="text-danger" onclick="confirmaAviso(${idAviso})">Eliminar</a>
            </div>
        </div>
    </div>
    `
    return template;
}

function vistaAvisoPagado(documento, estadoVisual){
    let template = `
    <div class="col-auto">
        <div class="contenedor-articulo1 shadow">
            <div class="mb-2">
                <input id="id_comprador" type="number" class="form-control form-control-sm" value="${documento.id_comprador}" disabled hidden>
            </div>
            <div class="detalles text-center">
                <h5 class="fw-bold text-center">${documento.titulo}</h5>
                <hr>
                <textarea name="descripcion" id="" cols="18" rows="3" class="p-2" disabled>${documento.descripcion}</textarea>
            </div>
            <div class="mb-2">
                <input id="nombres" type="text" class="form-control form-control-sm" value="${documento.comprador}" disabled>
            </div>
            <div class="mb-2">
                <input id="telefono" type="text" class="form-control form-control-sm" value="${documento.telefono}" disabled>
            </div>
            <div class="mb-2">
                <input id="ciudad" type="text" class="form-control form-control-sm" value="${documento.ciudad}" disabled>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="estado" ${documento.estado ? "checked":null} disabled>
                <label class="form-check-label" for="estado">${estadoVisual}</label>
            </div>
            <div class="fecha my-2">
                <span>Publicado: ${documento.fecha}</span>
            </div>
            <div class="text-center">
            <a href="https://wa.me/${documento.telefono}" target="_blank"><span class="btn btn-primary rounded-pill btn-estilo" onclick="">Contactar</span></a>
            </div>
        </div>
    </div>
    `
    return template;
}

function vistaAvisoIndex(documento, estadoVisual){
    let template = `
    <div class="col-auto">
        <div class="contenedor-articulo shadow">
            <div class="detalles text-center">
                <h4 class="fw-bold text-center">${documento.titulo}</h4>
                <hr>
                <textarea name="descripcion" id="" cols="18" rows="5" class="p-2" disabled>${documento.descripcion}</textarea>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="estado" ${documento.estado ? "checked":null} disabled>
                    <label class="form-check-label" for="estado">${estadoVisual}</label>
                </div>
            </div>
            <div class="fecha my-2">
                <span>Publicado: ${documento.fecha}</span>
            </div>
            <div class="text-center">
                <a href="/files/pages/login.html"><span class="btn btn-primary rounded-pill btn-estilo">Ofrecer</span></a>
            </div>
        </div>
    </div>
    
    `
    return template;
}

/* ================================== EDITAR AVISOS ====================================== */
function mostrarEditarAviso(idAviso){
    let modalEditarAviso = document.querySelector("#modalEditarAviso");

    db.collection("avisos").get().then(coleccion =>{
        let array = coleccion.docs;
        let documento;

        for (let i = 0; i < array.length; i++) {
            documento = array[i].data();
            if (documento.indexAviso == idAviso) {
                modalEditarAviso.innerHTML = modalEditarAviso.innerHTML + vistaEditaAviso(documento);
            }
        }
    })
}

function vistaEditaAviso(documento){
    let template = `
    <div>
        <input id="idPersonaEditar" type="text" value="${documento.id_comprador}" hidden>
        <input id="idAvisoEditar" type="text" value="${documento.id}" hidden>
    </div>
    <label for="">Titulo</label>
    <select id="tituloEditar" class="form-select mb-3" aria-label=".form-select-lg example">
        <option value="0" selected>Elegir un titulo</option>
        <option value="Compro">Compro</option>
        <option value="Busco alquilar">Busco alquilar</option>
        <option value="Busco">Busco</option>
    </select>
    <div class="mb-3">
        <label for="descripcionEditar" class="form-label">Descripción</label>
        <textarea id="descripcionEditar" class="form-control mb-3" rows="4">${documento.descripcion}</textarea>
        <div class="mb-2">
            <input id="nombresEditar" type="text" class="form-control form-control-sm" value="${documento.comprador}">
        </div>
        <div class="mb-2">
            <input id="telefonoEditar" type="text" class="form-control form-control-sm" value="${documento.telefono}">
        </div>
        <div class="mb-2">
            <input id="ciudadEditar" type="text" class="form-control form-control-sm" value="${documento.ciudad}">
        </div>
        <div class="form-check form-switch">
            <input id="estadoEditar" class="form-check-input" type="checkbox" role="switch" id="estado" ${documento.estado ? "checked":null}>
            <label class="form-check-label" for="estado">Estado de la publicación</label>
        </div>
    </div>
    `
    return template;
}

function editarAviso(){
    let idPersonaEditar = document.querySelector("#idPersonaEditar").value;
    let idAvisoEditar = document.querySelector("#idAvisoEditar").value;
    let tituloEditar = document.querySelector("#tituloEditar").value;
    let descripcionEditar = document.querySelector("#descripcionEditar").value;
    let nombresEditar = document.querySelector("#nombresEditar").value;
    let telefonoEditar = document.querySelector("#telefonoEditar").value;
    let ciudadEditar = document.querySelector("#ciudadEditar").value;
    let estadoEditar = document.querySelector("#estadoEditar").checked;

    let documento ={
        titulo : tituloEditar,
        descripcion : descripcionEditar,
        comprador : nombresEditar,
        telefono : telefonoEditar,
        ciudad : ciudadEditar,
        estado : estadoEditar
    }
    let objeto = {
        nombres : nombresEditar,
        telefono : telefonoEditar,
        ciudad : ciudadEditar,
    }
    if (descripcionEditar != ""){
        updateDB("avisos", idAvisoEditar, documento);
        updateDB("personas", idPersonaEditar, objeto);
        alert("Datos actualizados correctamente");
    }
    else{
        alert("Todos los campos son obligatorios")
    }
}

/* ================================== MODULO ADMINISTRADOR ====================================== */

/* Vendedores */
function mostrarClientesAdmin(){
    let tb_solicitud = document.querySelector("#tb_solicitud");
    db.collection("personas").onSnapshot(coleccion =>{
        let array = coleccion.docs;
        let documento;
        let estadoVisual;
        let idPersona;
        let dias;

        for (let i = 0; i < array.length; i++) {
            documento = array[i].data();
            if (documento.rol == 1 || documento.rol == 2) {
                
            }
            else{
                var fecha1 = new Date(documento.fecha);
                var fecha2 = new Date();
                const f_Formateada1 = Date.UTC(fecha1.getFullYear(),fecha1.getMonth(),fecha1.getDate());
                const f_Formateada2 = Date.UTC(fecha2.getFullYear(),fecha2.getMonth(),fecha2.getDate());
                let day = (24*60*60*1000);
                let diferencia = ((f_Formateada2 - f_Formateada1) / day);

                idPersona = documento.idPersona;
                if (documento.estadoPago == true) {
                    estadoVisual = "Habilitado";
                    dias = diferencia;
                }
                else{
                    estadoVisual = "No Habilitado";
                    dias = 0;
                }
                tb_solicitud.innerHTML = tb_solicitud.innerHTML + vistaClientesAdmin(documento, estadoVisual, idPersona, dias);
            }
            
            
        }
    });

/* mostrarClientesAdmin */
}
function vistaClientesAdmin(documento, estadoVisual, idPersona, dias){
    let template = `
        <td>${documento.nombres}</td>
        <td>${documento.correo}</td>
        <td>${documento.telefono}</td>
        <td>${documento.ciudad}</td>
        <td>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="estado" ${documento.estadoPago ? "checked":null} disabled>
                <label class="form-check-label" for="estado">${estadoVisual}</label>
            </div>
        </td>
        <td>${dias}</td>
        <td class="text-center">
        <span data-bs-toggle="modal" data-bs-target="#editarPagos" class="btn btn-warning rounded-pill btn-estilo" onclick="modalEditarPago(${idPersona})">Pago</span>
        </td>
    `
    return template;
}

function modalEditarPago(idPersona){
    let modalPagos = document.querySelector("#modalPagos");

    db.collection("personas").get().then(coleccion =>{
        let array = coleccion.docs;
        let documento;

        for (let i = 0; i < array.length; i++) {
            documento = array[i].data();
            if (documento.idPersona == idPersona) {
                modalPagos.innerHTML = modalPagos.innerHTML + vistaModalPago(documento);
            }
        }
    })
}

function vistaModalPago(documento){
    let template = `
    <div>
        <input id="idPersonaEditar" type="text" value="${documento.id}" hidden>
    </div>
    <div class="mb-2">
        <input id="nombresEditar" type="text" class="form-control form-control-sm" value="${documento.nombres}" disabled>
    </div>
    <div class="mb-2">
        <input id="telefonoEditar" type="text" class="form-control form-control-sm" value="${documento.telefono}" disabled>
    </div>
    <div class="form-check form-switch">
        <input id="estadoEditarPago" class="form-check-input" type="checkbox" role="switch" id="estado" ${documento.estadoPago ? "checked":null}>
        <label class="form-check-label" for="estado">Estado de pago</label>
    </div>
    `
    return template;
}

function editarPago(){

    let idPersonaEditar = document.querySelector("#idPersonaEditar").value;
    let estadoEditarPago = document.querySelector("#estadoEditarPago").checked;

    let fechaActual = new Date();
    const diaActual = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() + 1;
    const anioActual = fechaActual.getFullYear();
    let fecha = anioActual+"-"+mesActual+"-"+diaActual;

    
    let documento = {
        estadoPago : estadoEditarPago,
        fecha
    }
    updateDB("personas", idPersonaEditar, documento);
    alert("Datos actualizados correctamente");
    $('#tb_solicitud').empty();
}

/* Avisos  */
function mostrarAvisosAdmin(){
    let tb_avisos = document.querySelector("#tb_avisos");
    db.collection("avisos").onSnapshot(coleccion =>{
        let array = coleccion.docs;
        let documento;
        for (let i = 0; i < array.length; i++) {
            documento = array[i].data();
            idAviso = documento.indexAviso;
            tb_avisos.innerHTML = tb_avisos.innerHTML +  vistaAvisosAdmin(documento, idAviso);
        }
    })
}

function vistaAvisosAdmin(documento, idAviso){
    let template = `
        <td>${documento.comprador}</td>
        <td>${documento.descripcion}</td>
        <td>${documento.telefono}</td>
        <td>${documento.ciudad}</td>
        <td class="text-center">
        <span data-bs-toggle="modal" data-bs-target="#editarAviso" class="btn btn-warning rounded-pill btn-estilo" onclick="modalEditarAvisoAdmin(${idAviso})">Editar</span>
        </td>
    `
    return template;
}

function modalEditarAvisoAdmin(idAviso){
    let modalAvisos = document.querySelector("#modalAvisos");

    db.collection("avisos").get().then(coleccion =>{
        let array = coleccion.docs;
        let documento;

        for (let i = 0; i < array.length; i++) {
            documento = array[i].data();
            if (documento.indexAviso == idAviso) {
                modalAvisos.innerHTML = modalAvisos.innerHTML + vistaModalAvisoAdmin(documento);
            }
        }
    })
}

function vistaModalAvisoAdmin(documento){
    let template = `
    <div>
        <input id="idEditarAviso" type="text" value="${documento.id}" hidden>
    </div>
    <div class="mb-2">
        <input id="nombresEditar" type="text" class="form-control form-control-sm" value="${documento.comprador}" disabled>
    </div>
    <div class="mb-2">
        <textarea id="descripcionEditar" class="form-control mb-3" rows="4">${documento.descripcion}</textarea>
    </div>
    `
    return template;
}

function editarAvisoAdmin(){
    let idEditarAviso = document.querySelector("#idEditarAviso").value;
    let descripcionEditar = document.querySelector("#descripcionEditar").value;

    let documento = {
        descripcion : descripcionEditar
    }
    updateDB("avisos", idEditarAviso, documento);


}

/* ================================== MODULO ROOT ====================================== */
function mostrarRoot(){
    let tb_usuarios = document.querySelector("#tb_usuarios");
    $('#tb_usuarios').empty();
    db.collection("personas").onSnapshot(coleccion =>{
        let array = coleccion.docs;
        let documento;
        let idPersona;       

        for (let i = 0; i < array.length; i++) {
            documento = array[i].data();
            if (documento.rol == 2) {
                console.log(documento);

                idPersona = documento.idPersona;
                tb_usuarios.innerHTML = tb_usuarios.innerHTML + vistaRoot(documento, idPersona);
            
            }            
            
        }
    });

/* mostrarClientesAdmin */
}
function vistaRoot(documento,idPersona){
    let template = `
        <td>${documento.nombres}</td>
        <td>${documento.correo}</td>
        <td>${documento.telefono}</td>
        <td>${documento.ciudad}</td>
        <td class="text-center">
        <span class="btn btn-warning rounded-pill btn-estilo" onclick="eliminarAdministrador(${idPersona})">Eliminar</span>
        </td>
    `
    return template;
}

function eliminarAdministrador(idPersona){
    let opcion = confirm("Estas seguro que quieres eliminar el administrador");
    if (opcion == true) {
        db.collection("personas").get().then(coleccion =>{
            let array = coleccion.docs;
            let documento;
            let id;
            for (let i = 0; i < array.length; i++) {
                documento = array[i].data();
                id = array[i].id
                if (documento.idPersona == idPersona) {
                    deleteDB("personas", id)
                }
                
            }
        })
	}
}