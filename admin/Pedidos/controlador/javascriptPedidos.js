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
        
        var arrayliPedidos = stringPedidos.split("//", 5);//cambiar el 5 si queremos cambiar el número de registros por pag
        // console.log('arrayliPedidos  ' + arrayliPedidos);
        var numero = 1;
        arrayliPedidos.forEach(element => {
            var arrayCadaPedido = element.split('/__/');
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
            var td1 = document.getElementById(numero+"td1");
            td1.innerHTML = arrayCadaPedido[0]
            var td2 = document.getElementById(numero+"td2");
            td2.innerHTML = arrayCadaPedido[1];
            var td3 = document.getElementById(numero+"td3");
            td3.innerHTML = arrayCadaPedido[2];
            var td4 = document.getElementById(numero+"td4");
            td4.innerHTML = arrayCadaPedido[3];
            var td5 = document.getElementById(numero+"td5");
            td5.innerHTML = arrayCadaPedido[4];
            var td6 = document.getElementById(numero+"td6");
            td6.innerHTML = arrayCadaPedido[5] + "€";
            var td7 = document.getElementById(numero+"td7");
            td7.innerHTML = arrayCadaPedido[6];
            var td8 = document.getElementById(numero+"td8");
            if(arrayCadaPedido[8]==6) {
                console.log(arrayCadaPedido[8]);
                td8.innerHTML = arrayCadaPedido[7].fontcolor("red");
            } else if(arrayCadaPedido[8]==5) {
                td8.innerHTML = arrayCadaPedido[7].fontcolor("yellow");
            } else if(arrayCadaPedido[8] ==4) {
                td8.innerHTML = arrayCadaPedido[7].fontcolor("green");
            }else{
                td8.innerHTML = arrayCadaPedido[7];
            }
           
            numero++;
        });
    }
}
function cambiarEstado(e) {
    console.log(e.id);
    
}
function respCarrito() {
    if (this.readyState == 4 && this.status == 200) {
        let string = this.responseText;
        //console.log('str' + string);
        let ArrayStringResp = string.split("/");
        if (ArrayStringResp[1] === "0") {
            let nombreCantidad = ArrayStringResp[0].split("#");
            alert(`${nombreCantidad[1]} ${nombreCantidad[0]} añadido al carrito correctamente`);
        } else {
            alert(ArrayStringResp[0]);
        }
    }
}
var role;
function procesarSession() {
    if (this.readyState == 4 && this.status == 200) {
        role = this.responseText;
        console.log('role' + role);
        if ((role != "NOSESSION" && role != "USERSESSION" && role != "ADMINSESSION" && role != "SUPERADMINSESSION")) {
            //console.log('role '+role);
            window.location = "../../comun/logout.php";
        } else {
            if (role === "ADMINSESSION") {
                console.log("role " + role);
                return;
            } else {
                window.location = "../../comun/logout.php";
            }
        }

    }
}

function loadEvents() {
    comprobarSession();
    loadPedidos();
    document.getElementById("primera").addEventListener("click", () => {
        pagina = 1;
        //console.log("pagina"+pagina);
        loadPedidos();
    });
    document.getElementById("anterior").addEventListener("click", () => {
        if (pagina === 1) {
            pagina = 1;
        } else {
            pagina--;
        }
        //console.log("pagina"+pagina);
        loadPedidos();
    });
    document.getElementById("siguiente").addEventListener("click", () => {
        if (pagina === totalPag) {
            pagina = totalPag;
        } else {
            pagina++;
        }
        //console.log("pagina"+pagina);
        loadPedidos();
    });
    document.getElementById("ultima").addEventListener("click", () => {
        pagina = totalPag;
        //console.log("pagina"+pagina);
        loadPedidos();
    });

}

function comprobarSession() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarSession;
    xmlhttp.open("GET", "http://localhost/php/comun/comprobarSession.php", true);
    xmlhttp.send();
}
var pagina = 1;
function loadPedidos() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarPedidos;
    xmlhttp.open("GET", "http://localhost/php/admin/Pedidos/modelo/getPedidos.php?pagina=" + pagina, true);
    xmlhttp.send();
}

