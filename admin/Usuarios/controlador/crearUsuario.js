function procesarRoles() {
    var selectorRole = document.getElementById("selectorRole");
    if (this.readyState == 4 && this.status == 200) {
        var stringAll = this.responseText;
        //console.log('stringRoles '+stringAll);

        var arrayliRole = stringAll.split("//",);
        // console.log('arrayliRole  '+arrayliRole);

        for (let i = 0; i < arrayliRole.length - 1; i++) {
            var arraycomponentesRoles = arrayliRole[i].split("/");
            selectorRole.innerHTML += "<option value="+arraycomponentesRoles[0]+">" + arraycomponentesRoles[1] + "</option>" + "\n"
            //console.log("arrayComponents "+arraycomponentesRoles[1]);

        }
        document.getElementById("IDRole").setAttribute("value",1);

    }
}
function procesarUsuario() {
    if (this.readyState == 4 && this.status == 200) {
        var string = this.responseText;
        console.log("string "+string);
    }
}

var role;
function procesarSession() {
    if (this.readyState == 4 && this.status == 200) {
        role = this.responseText;
        console.log('role' + role);
        if (role != "SUPERADMINSESSION") {
            window.location = "../../../comun/logout.php";
        }
    }
}
function loadEvents() {
    comprobarSession();
    loadRoles();
    var selectorRole = document.getElementById("selectorRole");
    selectorRole.addEventListener("change",()=>{
        let index =selectorRole.options[selectorRole.selectedIndex].value;
        console.log('index '+index);
        document.getElementById("IDRole").setAttribute("value",index);
    });
    
}
function comprobarSession() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarSession;
    xmlhttp.open("GET", "http://localhost/php/comun/comprobarSession.php", true);
    xmlhttp.send();
}
function creacionUsuario() {
    const formulario = document.getElementById("formNewUser");
    var formData = new FormData(formulario);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarUsuario;
    xmlhttp.open("POST","http://localhost/php/admin/Usuarios/modelo/crearUsuario.php", true);
    xmlhttp.send(formData);
}
function loadRoles() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarRoles;
    xmlhttp.open("GET", "http://localhost/php/admin/Usuarios/modelo/getRoles.php", true);
    xmlhttp.send();
}
