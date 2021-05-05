var totalPag;
function procesarUsuarios() {
    if (this.readyState == 4 && this.status == 200) {
        let string = this.responseText;
        console.log('string: ' + string);

        let k = string.indexOf("#");
        console.log('k' + k);

        let paginacion = string.slice(k + 1, string.length);
        totalPag = parseInt(paginacion);
        console.log('pag:' + paginacion);


        let stringUsuarios = string.slice(0, k);

        console.log('string ' + stringUsuarios);
        let arrayliUsuarios = stringUsuarios.split("__//").filter(Boolean);
        //console.log('arrayliUsuarios  '+arrayliUsuarios);

        arrayliUsuarios.forEach(element => {
            let arrayCadaUsuario = element.split('/--/');
            let tbody = document.getElementById("tbody");
            console.log('id: ' + arrayCadaUsuario[0]);
            console.log('Nom: ' + arrayCadaUsuario[1]);
            console.log('Tel: ' + arrayCadaUsuario[2]);
            console.log('em: ' + arrayCadaUsuario[3]);
            console.log('dir: ' + arrayCadaUsuario[4]);
            console.log('rol: ' + arrayCadaUsuario[5]);
            let tr = document.createElement("tr");
            if (role === "ADMINSESSION") {
                let td1 = document.createElement("td");
                td1.innerHTML = arrayCadaUsuario[0];
                let td2 = document.createElement("td");
                td2.innerHTML = arrayCadaUsuario[1];
                let td3 = document.createElement("td");
                td3.innerHTML = arrayCadaUsuario[2];
                let td4 = document.createElement("td");
                td4.innerHTML = arrayCadaUsuario[3];
                let td5 = document.createElement("td");
                td5.innerHTML = arrayCadaUsuario[4];
                let td6 = document.createElement("td");
                td6.innerHTML = arrayCadaUsuario[5];
                tbody.appendChild(tr);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
            } else {
                let td1s = document.createElement("td");
                td1s.innerHTML = arrayCadaUsuario[0];
                let td2s = document.createElement("td");
                td2s.innerHTML = arrayCadaUsuario[1];
                let td3s = document.createElement("td");
                td3s.innerHTML = arrayCadaUsuario[2];
                let td4s = document.createElement("td");
                td4s.innerHTML = arrayCadaUsuario[3];
                let td5s = document.createElement("td");
                td5s.innerHTML = arrayCadaUsuario[4];
                let td6s = document.createElement("td");
                td6s.innerHTML = arrayCadaUsuario[5];
                let td7s = document.createElement("td");
                let editar = document.createElement("a");
                editar.href = "../vista/editarUsuario.html?i=" + arrayCadaUsuario[0];
                editar.innerHTML = "Editar";
                td7s.appendChild(editar);
                tr.appendChild(td7s);
                tbody.appendChild(tr);
                tr.appendChild(td1s);
                tr.appendChild(td2s);
                tr.appendChild(td3s);
                tr.appendChild(td4s);
                tr.appendChild(td5s);
                tr.appendChild(td6s);
                tr.appendChild(td7s);
            }

            // var td4 = document.createElement("td");
            // if (role != "NOSESSION" && role != "USERSESSION") {
            //     var editar = document.createElement("a");
            //     editar.href="../../admin/Usuario/vista/editarUsuario.html?idProduct="+arrayCadaUsuario[0];
            //     //console.log(editar.id);
            //     //editar.value = arrayCadaUsuario[0];
            //     editar.innerHTML = "Editar";
            //     td4.appendChild(editar);
            // } else {
            //     var anadir = document.createElement("a");
            //     anadir.href="../../admin/Usuario/vista/editarUsuario.html?idProduct="+arrayCadaUsuario[0];
            //     //console.log(anadir.id);
            //     //anadir.value = arrayCadaUsuario[0];
            //     anadir.innerHTML = "Añadir";
            //     td4.appendChild(anadir);

            // }

        });
    }
}

var role;
function procesarSession() {

    if (this.readyState == 4 && this.status == 200) {
        role = this.responseText;
        console.log('role' + role);
        if ((role != "ADMINSESSION" && role != "SUPERADMINSESSION")) {
            console.log('role ' + role);
            window.location = "../../../comun/logout.php";
        }
        if (role === "SUPERADMINSESSION") {
            console.log("role "+role);
            document.getElementById("crearUsuario").style.display ="block"
            document.getElementById("acciones").style.display = "block";
        }else{
            document.getElementById("crearUsuario").style.display ="none"
            document.getElementById("acciones").style.display = "none";
        }
    }
}
function limpiarTable() {
    document.getElementById("tbody").innerHTML = "";
}

function loadEvents() {
    //     document.getElementById("crearProd").style.visibility = "hidden";
    comprobarSession();
    loadUsuarios();
    document.getElementById("primera").addEventListener("click", () => {
        pagina = 1;
        console.log("pagina" + pagina);
        limpiarTable();
        loadUsuarios();
    });
    document.getElementById("anterior").addEventListener("click", () => {
        if (pagina === 1) {
            pagina = 1;
        } else {
            pagina--;
        }
        console.log("pagina" + pagina);
        limpiarTable();
        loadUsuarios();
    });
    document.getElementById("siguiente").addEventListener("click", () => {
        if (pagina === totalPag) {
            pagina = totalPag;
        } else {
            pagina++;
        }
        console.log("pagina" + pagina);
        limpiarTable();
        loadUsuarios();
    });
    document.getElementById("ultima").addEventListener("click", () => {
        pagina = totalPag;
        console.log("pagina" + pagina);
        limpiarTable();
        loadUsuarios();
    });
    // document.getElementsByClassName("editButton").addEventListener("click",() => {
    //     console.log("hola soy el btnEdit "+ getElementsByClassName("editButton").value);
    //     window.location="../../admin/Usuario/vista/editarUsuario.html?idProduct="+document.getElementsByClassName("editButton").value;
    //   });
}

function comprobarSession() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarSession;
    xmlhttp.open("GET", "http://localhost/php/comun/comprobarSession.php", true);
    xmlhttp.send();
}
var pagina = 1;
function loadUsuarios() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarUsuarios;
    xmlhttp.open("GET", "http://localhost/php/admin/Usuarios/modelo/getUsuarios.php?pagina=" + pagina, true);
    xmlhttp.send();
}
