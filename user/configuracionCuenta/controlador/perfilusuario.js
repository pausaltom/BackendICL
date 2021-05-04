
function procesarDataUser() {
    if (this.readyState == 4 && this.status == 200) {
        var string = this.responseText;
        console.log("data User " + string);
        var datosUser = string.split("/%//");
        console.log('datos ' + datosUser);

        document.getElementById("nombre").setAttribute("value", datosUser[0]);
        document.getElementById("telefono").setAttribute("value", datosUser[1]);
        document.getElementById("email").setAttribute("value", datosUser[2]);
        document.getElementById("contraDefinitiva").setAttribute("value", datosUser[3]);
        document.getElementById("iduser").setAttribute("value", datosUser[4]);
    }
}
function comprobarContrasIguales() {
    let contraNueva = document.getElementById("nuevaPassword").value;
    let ConfirmarContra = document.getElementById("ConfirmarPassword").value;
    var spanErr = document.getElementById("spanErr");
    var divErr = document.getElementById("diverr");
    spanErr.textContent = "";
    if (contraNueva != ConfirmarContra || contraNueva === "" || ConfirmarContra === "") {
        spanErr.style = "color: red;";
        spanErr.textContent = "Nueva Contraseña no válida";
        divErr.appendChild(spanErr);
    } else {
        spanErr.style = "color: green;";
        spanErr.textContent = "Nueva Contraseña válida";
        divErr.appendChild(spanErr);
        var cbCambiarContra = document.getElementById("checkboxButton");
        cbCambiarContra.checked = false;
        console.log('this ' + cbCambiarContra.checked);
        cbChecked();
        document.getElementById("contraDefinitiva").setAttribute("value",contraNueva);
    }
}

function cbChecked() {
    var spanErr = document.getElementById("spanErr");
    spanErr.textContent = "";
    let divContra = document.getElementById("divContra");
    let divNuevaContra = document.getElementById("nuevaContra");
    var cbCambiarContra = document.getElementById("checkboxButton");
    console.log('this ' + cbCambiarContra.checked);
    if (cbCambiarContra.checked) {
        divContra.style.display = "none";
        divNuevaContra.style.display = "block";
        console.log('divContra ' + divContra.style.display);
    } else {
        divContra.style.display = "block";
        divNuevaContra.style.display = "none";
        console.log('divContra ' + divContra.style.display);
    }
}
var role;
function procesarSession() { 
    
    if (this.readyState == 4 && this.status == 200) {
        role = this.responseText;
        console.log('role' + role);
        if ((role != "USERSESSION" && role != "ADMINSESSION" && role != "SUPERADMINSESSION")) {
            console.log('role '+role);
            window.location = "../../../comun/logout.php";
        }
    }
}
function procesarAjustes(){
    if (this.readyState == 4 && this.status == 200) {
        let string = this.responseText;
        console.log('Resp del form'+ string);
    }
}
function loadEvents() {
    comprobarSession();
    loadDatosUser();
    document.getElementById("guardarContra").addEventListener("click", comprobarContrasIguales);
    document.getElementById("btnEnviar").addEventListener("click", guardarAjustesCuenta);


}
function comprobarSession() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarSession;
    xmlhttp.open("GET", "http://localhost/php/comun/comprobarSession.php", true);
    xmlhttp.send();
}

function guardarAjustesCuenta() {
    var formData = new FormData(document.getElementById("formAjustesCuenta"));
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarAjustes;
    xmlhttp.open("POST", "http://localhost/php/admin/Producto/modelo/cambiarAjustesCuenta.php", true);
    xmlhttp.send(formData);
}

function loadDatosUser() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarDataUser;
    xmlhttp.open("GET", "http://localhost/php/user/configuracionCuenta/modelo/loadDatosUsuario.php", true);
    xmlhttp.send();

}
