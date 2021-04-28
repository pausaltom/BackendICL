


function procesarDataUser() {
    if (this.readyState == 4 && this.status == 200) {
        var string = this.responseText;
        console.log("data User "+string);
        var datosUser= string.slice("/");
        document.getElementById("nombre").setAttribute("value",datosUser[0]);
        document.getElementById("email").setAttribute("value",datosUser[1]);
        document.getElementById("telefono").setAttribute("value",datosUser[2]);
    }
}











function loadEvents() {
    loadDatosUser();
}


function loadDatosUser() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarDataUser;
    xmlhttp.open("GET", "http://localhost/php/user/configuracionCuenta/modelo/cambiarAjustesCuenta.php", true);
    xmlhttp.send();

}