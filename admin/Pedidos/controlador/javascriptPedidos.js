var totalPag;
function procesarPedidos() {
    if (this.readyState == 4 && this.status == 200) {
        var string = this.responseText;
        //console.log('string: ' + string);

        var k = string.indexOf("#");
        //console.log('k' + k);

        var paginacion = string.slice(k + 1, string.length);
        totalPag = parseInt(paginacion);
        // console.log('pag:' + paginacion);


        var stringPedidos = string.slice(0, k);
        //console.log('string' + stringPedidos);

        var arrayliPedidos = stringPedidos.split("//").filter(Boolean);
         //console.log('arrayliPedidos  ' + arrayliPedidos);
        var numero = 1;
        arrayliPedidos.forEach(element => {
            var arrayCadaPedido = element.split('/__');
            // console.log('arrayCadaPedido ' + arrayCadaPedido);
            // console.log('Cod pedido: ' + arrayCadaPedido[0]);
            // console.log('Nombre cliente: ' + arrayCadaPedido[1]);
            // console.log('Teléfono: ' + arrayCadaPedido[2]);
            // console.log('Dirección: ' + arrayCadaPedido[3]);
            // console.log('Comentario: ' + arrayCadaPedido[4]);
            // console.log('Precio total: ' + arrayCadaPedido[5]);
            // console.log('Hora: ' + arrayCadaPedido[6]);
            // console.log('Estado: ' + arrayCadaPedido[7]);
            // console.log('ID_Estado: ' + arrayCadaPedido[8]);
            // console.log('Activo: ' + arrayCadaPedido[9]);
            var td1 = document.createElement("td");
            td1.innerHTML = arrayCadaPedido[0];
            td1.id=numero+"td1";
            var td2 = document.createElement("td");
            td2.innerHTML = arrayCadaPedido[1];
            td2.id=numero + "td2";
            var td3 = document.createElement("td");
            td3.id = numero + "td3";
            td3.innerHTML = arrayCadaPedido[2];
            var td4 = document.createElement("td");
            td4.id = numero + "td4";
            td4.innerHTML = arrayCadaPedido[3];
            var td5 = document.createElement("td");
            td5.id = numero + "td5";
            td5.innerHTML = arrayCadaPedido[4];
            var td6 = document.createElement("td");
            td6.id = numero + "td6";
            td6.innerHTML = arrayCadaPedido[5] + "€";
            var td7 = document.createElement("td");
            td7.id = numero + "td7";
            td7.innerHTML = arrayCadaPedido[6];
            var td8 = document.createElement("td");
            td8.id = numero + "td8";
            if (arrayCadaPedido[8] == 6) {
                console.log(arrayCadaPedido[8]);
                td8.innerHTML = arrayCadaPedido[7].fontcolor("red");
            } else if (arrayCadaPedido[8] == 5) {
                td8.innerHTML = arrayCadaPedido[7].fontcolor("yellow");
            } else if (arrayCadaPedido[8] == 4) {
                td8.innerHTML = arrayCadaPedido[7].fontcolor("green");
            } else {
                td8.innerHTML = arrayCadaPedido[7];
            }
            var td9 = document.createElement("td");
            td9.id = numero + "td9";
            let btnEstado=document.createElement("button");
            td9.appendChild(btnEstado);
            btnEstado.id=numero+"btnEditar";
            btnEstado.innerHTML="Cambiar estado";
            btnEstado.onclick= cambiarEstado;
            let tbody= document.getElementById("tbody");
            let tr =document.createElement("tr");
            tbody.appendChild(tr);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            tr.appendChild(td7);
            tr.appendChild(td8);
            tr.appendChild(td9);

            numero++;
        });
    }
}
var idPedido;
function cambiarEstado() {
    //console.log(this.id);
    let row = this.id.slice(0, 1);
    //console.log(row)
    idPedido = document.getElementById(row + "td1").textContent;
    //console.log(idPedido)
    loadPedidoPorID();
    //let resp =enviarDatatoUpdateEstado();
    
}
function procesarPedidoxID() {
    if (this.readyState == 4 && this.status == 200) {
        var string = this.responseText;
        //console.log('string: ' + string);
        let pedido = string.split("/");
        //console.log(pedido)
        let selectEstados = document.getElementById("selectEstados");
        selectEstados.style = "display:block";
        selectEstados.selectedIndex = pedido[1] - 1;
        
    }
}

/*function enviarDatatoUpdateEstado(idPedido){
    var indexOption;
    let selectEstados = document.getElementById("selectEstados");
    selectEstados.addEventListener("change",()=>{
        indexOption = selectEstados.options[selectEstados.selectedIndex].value;
        console.log("idPedido: "+idPedido+" idEstado: "+indexOption);
    });
    //indexOption= selectEstados.options[selectEstados.selectedIndex].value;
     
    //updateEstado(idPedido,indexOption);
    
    
    
}*/
function procesarEstado() {
    let selectEstados = document.getElementById("selectEstados");
    if (this.readyState == 4 && this.status == 200) {
        var string = this.responseText;
        //console.log(string)
        let lineaEstado = string.split("//");
        for (let index = 0; index < lineaEstado.length - 1; index++) {
            let cadaEstado = lineaEstado[index].split("/");//Array cada estado cadaEstado[0]->ID_Estado ...[1] -> Estado lo usamos para poder llenar el select del swal

            selectEstados.innerHTML += "<option value=" + cadaEstado[0] + ">" + cadaEstado[1] + "</option>" + "\n"
            //console.log(cadaEstado)
        }
    }

}

function respUpdateEstado(){
    if (this.readyState == 4 && this.status == 200) {
        var string = this.responseText;
        


    }

}
var role;
function procesarSession() {
    if (this.readyState == 4 && this.status == 200) {
        role = this.responseText;
        console.log('role' + role);
        if ((role != "NOSESSION" && role != "USERSESSION" && role != "ADMINSESSION" && role != "SUPERADMINSESSION")) {
            //console.log('role '+role);
            window.location = "../../../comun/logout.php";
        } else {
            if (role === "ADMINSESSION") {
                console.log("role " + role);
                return;
            } else {
                window.location = "../../../comun/logout.php";
            }
        }

    }
}
function limpiarTable() {
    document.getElementById("tbody").innerHTML="";    
}
function loadEvents() {
    comprobarSession();
    loadEstado();
    loadPedidos();    
    let selectEstados=document.getElementById("selectEstados");
    let optionsdelSelect=selectEstados.options;
    console.log(optionsdelSelect);
    optionsdelSelect.addEventListener("click",()=>{
        let indexOption = selectEstados.options[selectEstados.selectedIndex].value;
        updateEstado(indexOption);
    });
    selectEstados.addEventListener("",()=>{
        let indexOption = selectEstados.options[selectEstados.selectedIndex].value;
        updateEstado(indexOption);
    });

    document.getElementById("primera").addEventListener("click", () => {
        pagina = 1;
        //console.log("pagina"+pagina);
        loadPedidos();
        limpiarTable();
    });
    document.getElementById("anterior").addEventListener("click", () => {
        if (pagina === 1) {
            pagina = 1;
        } else {
            pagina--;
        }
        //console.log("pagina"+pagina);
        loadPedidos();
        limpiarTable();
    });
    document.getElementById("siguiente").addEventListener("click", () => {
        if (pagina === totalPag) {
            pagina = totalPag;
        } else {
            pagina++;
        }
        //console.log("pagina"+pagina);
        loadPedidos();
        limpiarTable();
    });
    document.getElementById("ultima").addEventListener("click", () => {
        pagina = totalPag;
        //console.log("pagina"+pagina);
        loadPedidos();
        limpiarTable();
    });

}

function comprobarSession() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarSession;
    xmlhttp.open("GET", "http://localhost/php/comun/comprobarSession.php", true);
    xmlhttp.send();
}
function updateEstado(idEstado){    
    let formData = new FormData();
    formData.append("idPedido",idPedido);
    formData.append("idEstado",idEstado);
    console.log(`idPedido ${idPedido} i idEstado ${idEstado}`)
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = respUpdateEstado;
    //xmlhttp.open("POST", "http://localhost/php/admin/Pedidos/modelo/cambiarEstados.php", true);
    //xmlhttp.send(formData);
}
function loadEstado() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarEstado;
    xmlhttp.open("GET", "http://localhost/php/admin/Pedidos/modelo/getEstados.php", true);
    xmlhttp.send();
}
var pagina = 1;
function loadPedidos() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarPedidos;
    xmlhttp.open("GET", "http://localhost/php/admin/Pedidos/modelo/getPedidos.php?pagina=" + pagina, true);
    xmlhttp.send();
}
function loadPedidoPorID() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarPedidoxID;
    xmlhttp.open("GET", "http://localhost/php/admin/Pedidos/modelo/getPedidoPorID.php?idPedido=" + idPedido, true);
    xmlhttp.send();
}

