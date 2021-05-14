function formatoDireccion() {
    let direccion = document.getElementById("Dirección").textContent;
    console.log('dir: ' + direccion);
    let direccionsinbarras = direccion.split("//");
    console.log('Sin barras ' + direccionsinbarras);
    let arrayComponentesDireccion = direccionsinbarras[0].split("..");
    console.log('Componentes dir ' + arrayComponentesDireccion);
    let provincia = document.getElementById("provincia");
    let municipio = document.getElementById("municipio");
    let cp = document.getElementById("cp");
    let Direccion = document.getElementById("Direccion");
    let Numero = document.getElementById("Numero");
    let Piso = document.getElementById("Piso");
    let Bloque = document.getElementById("Bloque");
    let Puerta = document.getElementById("Puerta");
    let Escalera = document.getElementById("Escalera");
    provincia.innerHTML=arrayComponentesDireccion[0];
    municipio.innerHTML=arrayComponentesDireccion[1];
    cp.innerHTML=arrayComponentesDireccion[2];
    Direccion.innerHTML=arrayComponentesDireccion[3];
    Numero.innerHTML=arrayComponentesDireccion[4];
    Piso.innerHTML=arrayComponentesDireccion[5];
    Bloque.innerHTML=arrayComponentesDireccion[6];
    Puerta.innerHTML=arrayComponentesDireccion[7];
    Escalera.innerHTML=arrayComponentesDireccion[8];
}
function loadEvents() {
    formatoDireccion();
}
