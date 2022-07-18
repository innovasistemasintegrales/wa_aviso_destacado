
const firebaseConfig = {
    apiKey: "AIzaSyA81u3a1tlVp0_NyTvlxARkmAQariTY68E",
    authDomain: "wa-avisos.firebaseapp.com",
    projectId: "wa-avisos",
    storageBucket: "wa-avisos.appspot.com",
    messagingSenderId: "1027043038",
    appId: "1:1027043038:web:89a7deb51124cbbf96dc4f"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storageRef = firebase.storage().ref();

/* ================================================FUNCIONES PARA VISTAS=========================================== */
function opcionCategoria(){
    location.reload();
}
function opcionCuadricula(){
  let contenedor_productos = document.querySelector("#contenedor_productos");
  contenedor_productos.innerHTML = vistaCuadricula();
};
function opcionLista(){
  let contenedor_productos = document.querySelector("#contenedor_productos");
  contenedor_productos.innerHTML = vistaLista();
};

function vistaCuadricula(){
  let template = `
  <section id="vista_cuadricula">
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="text-center cinta-2 py-2">
                    <h3 class="fw-bold text-white ">PRODUCTOS</h3>
                </div>
                <div class="card mt-2">
                    <div class="row">
                        <div class="col-auto">
                            <div class="articulo shadow">
                                <div class="text-center">
                                    <img src="https://contactop2p.com/img/tecnologia.png" alt=""
                                        class="img-fluid" width="150px" />
                                </div>
                                <div class="detalles">
                                    <h4 class="fw-bold text-center">Nombre</h4>
                                    <p class="text-start">
                                        Descripción Descripción Descripción
                                        Descripción
                                    </p>
                                    <h4>S/ 12.00</h4>
                                </div>
                                <div class="text-center">
                                    <a href="#"><span
                                            class="btn btn-primary rounded-pill boton-reservar">Añadir al
                                            carrito</span></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="articulo shadow">
                                <div class="text-center">
                                    <img src="https://contactop2p.com/img/tecnologia.png" alt=""
                                        class="img-fluid" width="150px" />
                                </div>
                                <div class="detalles">
                                    <h4 class="fw-bold text-center">Nombre</h4>
                                    <p class="text-start">
                                        Descripción Descripción Descripción
                                        Descripción
                                    </p>
                                    <h4>S/ 12.00</h4>
                                </div>
                                <div class="text-center">
                                    <a href="#"><span
                                            class="btn btn-primary rounded-pill boton-reservar">Añadir al
                                            carrito</span></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="articulo shadow">
                                <div class="text-center">
                                    <img src="https://contactop2p.com/img/tecnologia.png" alt=""
                                        class="img-fluid" width="150px" />
                                </div>
                                <div class="detalles">
                                    <h4 class="fw-bold text-center">Nombre</h4>
                                    <p class="text-start">
                                        Descripción Descripción Descripción
                                        Descripción
                                    </p>
                                    <h4>S/ 12.00</h4>
                                </div>
                                <div class="text-center">
                                    <a href="#"><span
                                            class="btn btn-primary rounded-pill boton-reservar">Añadir al
                                            carrito</span></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="articulo shadow">
                                <div class="text-center">
                                    <img src="https://contactop2p.com/img/tecnologia.png" alt=""
                                        class="img-fluid" width="150px" />
                                </div>
                                <div class="detalles">
                                    <h4 class="fw-bold text-center">Nombre</h4>
                                    <p class="text-start">
                                        Descripción Descripción Descripción
                                        Descripción
                                    </p>
                                    <h4>S/ 12.00</h4>
                                </div>
                                <div class="text-center">
                                    <a href="#"><span
                                            class="btn btn-primary rounded-pill boton-reservar">Añadir al
                                            carrito</span></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="articulo shadow">
                                <div class="text-center">
                                    <img src="https://contactop2p.com/img/tecnologia.png" alt=""
                                        class="img-fluid" width="150px" />
                                </div>
                                <div class="detalles">
                                    <h4 class="fw-bold text-center">Nombre</h4>
                                    <p class="text-start">
                                        Descripción Descripción Descripción
                                        Descripción
                                    </p>
                                    <h4>S/ 12.00</h4>
                                </div>
                                <div class="text-center">
                                    <a href="#"><span
                                            class="btn btn-primary rounded-pill boton-reservar">Añadir al
                                            carrito</span></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="articulo shadow">
                                <div class="text-center">
                                    <img src="https://contactop2p.com/img/tecnologia.png" alt=""
                                        class="img-fluid" width="150px" />
                                </div>
                                <div class="detalles">
                                    <h4 class="fw-bold text-center">Nombre</h4>
                                    <p class="text-start">
                                        Descripción Descripción Descripción
                                        Descripción
                                    </p>
                                    <h4>S/ 12.00</h4>
                                </div>
                                <div class="text-center">
                                    <a href="#"><span
                                            class="btn btn-primary rounded-pill boton-reservar">Añadir al
                                            carrito</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  `
  return template;
}
function vistaLista(){
  let template = `
  <section id="vista_lista">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col">
                <div class="text-center cinta-2 py-2">
                    <h3 class="fw-bold text-white">PRODUCTOS</h3>
                </div>
                <div class="card mt-2 px-3">
                    <div class="d-flex justify-content-between align-items-center m-2">
                        <img src="https://contactop2p.com/img/tecnologia.png" alt="" width="10%">
                        <div>
                            <span>Nombre</span>
                        </div>
                        <div>
                            <span class="d-none d-sm-none d-md-block d-lg-block">Descripción</span>
                        </div>
                        <div>
                            <span>S/. 25.00</span>
                        </div>
                        <div>
                            <span class="btn btn-primary d-sm-block d-md-block d-lg-none">+</span>
                        </div>
                        <div>
                            <span class="btn btn-primary d-none d-sm-none d-md-none d-lg-block">Añadir al carrito</span>
                        </div>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between align-items-center mx-2">
                        <img src="https://contactop2p.com/img/tecnologia.png" alt="" width="10%">
                        <div>
                            <span>Nombre</span>
                        </div>
                        <div>
                            <span class="d-none d-sm-none d-md-block d-lg-block">Descripción</span>
                        </div>
                        <div>
                            <span>S/. 25.00</span>
                        </div>
                        <div>
                            <span class="btn btn-primary d-sm-block d-md-block d-lg-none">+</span>
                        </div>
                        <div>
                            <span class="btn btn-primary d-none d-sm-none d-md-none d-lg-block">Añadir al carrito</span>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>
        </div>
    </div>
</section>
  `
  return template;

}

/* ==================================Funciones CRUD================================== */

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
    alert("Datos actualizados correctamente")
  }).catch((msj) =>{
    alert("Error al actualizar datos")
  })
}
/* Eliminar */
function deleteDB(){
    db.collection(coleccion).doc(id).delete().then((msj) => {
      alertSuccess("Documento eliminado");
    }).catch((msj) => {
      alertWarning("Error al eliminar documento");
    });
}
/* Galeria */
function setGaleria(){
  let imgGaleria = document.querySelector("#imgGaleria");
  let imgSubir = imgGaleria.files[0];
  let task = storageRef.child('imagenes/' + imgSubir.name).put(imgSubir);

  task.then(onSnapshot => onSnapshot.ref.getDownloadURL()).then( url =>{
    
  })
}


function prueba(){
    db.collection("Usuario").onSnapshot(coleccion =>{
    let array = coleccion.docs;
    for (let index = 0; index < array.length; index++) {
      /* const element = array[index]; */
      console.log(array[index].data()); 
    }
    })
    let decodedData = atob('MjAyMXNvZnQ=');
    console.log(decodedData);
}

function guardarRegistro(){
    let id = document.querySelector("#id_persona").value;
    let correo = document.querySelector("#correo").value;
    let contrasena = document.querySelector("#contrasena").value;
    let documento = document.querySelector("#documento").value;
    let nombres = document.querySelector("#nombres").value;
    let ciudad = document.querySelector("#ciudad").value;
    let telefono = document.querySelector("#telefono").value;
    if (correo != "" && contrasena != "" && documento != "" && nombres != "" && ciudad != "" && telefono != ""){
        let objeto = {
            id,
            correo,
            contrasena,
            documento,
            nombres,
            ciudad,
            telefono
        }

    }

}


