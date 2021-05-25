var totalPag;
function procesarPedidos() {
    if (this.readyState == 4 && this.status == 200) {
        var string = this.responseText;
        //console.log('string: ' + string);

        var k = string.indexOf("#");
        //console.log('k' + k);

        var paginacion = string.slice(k + 1, string.length);
        totalPag = parseInt(paginacion);
        console.log('pag:' + paginacion);


         var stringPedidos = string.slice(0, k);

        console.log('string' + stringPedidos);
        var arrayliPedidos = stringPedidos.split("/_&_/").filter(Boolean);
        console.log('arrayliPedidos  '+arrayliPedidos);
        var numero = 1;
        arrayliPedidos.forEach(element => {
            var arrayCadaPedido = element.split('/__/');
            console.log('arrayCadaPedido '+arrayCadaPedido);
            var tbody = document.getElementById("tbody");
            console.log('Cod pedido: '+arrayCadaPedido[0]);
            console.log('Nombre cliente: '+arrayCadaPedido[1]);
            console.log('Teléfono: '+arrayCadaPedido[2]);
            console.log('Dirección: '+arrayCadaPedido[3]);
            console.log('Comentario: '+arrayCadaPedido[4]);
            console.log('Precio total: '+arrayCadaPedido[5]);
            console.log('Hora: '+arrayCadaPedido[6]);
            console.log('Estado: '+arrayCadaPedido[7]);
            console.log('ID_Estado: '+arrayCadaPedido[8]);
            console.log('Activo: '+arrayCadaPedido[9].toString());
             
           
 
 
 
 
 
           
 
            // var tr = document.createElement("tr");
            // var td1 = document.createElement("td");
            // var img = document.createElement("img");
            // img.src = rutaImagen(arrayCadaPedido[1]);
            // img.width = 200;
            // img.alt = "Imagen Pedido";
            // td1.appendChild(img);
            // var td2 = document.createElement("td");
            // td2.innerHTML = arrayCadaPedido[2];
            // var td3 = document.createElement("td");
            // td3.innerHTML = arrayCadaPedido[3] + "€";
            // var td4 = document.createElement("td");
            // if (role != "NOSESSION" && role != "USERSESSION") {
            //     var editar = document.createElement("a");
            //     editar.href = "../../admin/Pedido/vista/editarPedido.html?idProduct=" + arrayCadaPedido[0];
            //     //console.log(editar.id);
            //     //editar.value = arrayCadaPedido[0];
            //     editar.innerHTML = "Editar";
            //     td4.appendChild(editar);
            // } else {
            //     var anadir = document.createElement("button");
            //     var cantidad = document.createElement("input");
            //     anadir.innerHTML = "Añadir";
            //     anadir.id = "anadir" + numero;
            //     anadir.value = arrayCadaPedido[0];
            //     cantidad.type = "number";
            //     cantidad.min = 1;
            //     cantidad.max = 50;
            //     cantidad.value = 1;
            //     cantidad.id = "cantidad" + numero;
            //     cantidad.style = "width=30px;margin-rigth=10px";
            //     anadir.onclick = cambiarCantidad;

            //     //anadir.href="../../carrito/vista/carrito.html?idProduct="+arrayCadaPedido[0];
            //     anadir.append(cantidad);
            //     td4.appendChild(anadir);
            //     td4.insertBefore(cantidad, anadir);
            //     numero++;
            // }
            // tbody.appendChild(tr);
            // tr.appendChild(td1);
            // tr.appendChild(td2);
            // tr.appendChild(td3);
            // tr.appendChild(td4);
        });
    }
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
                console.log("role "+role);
                return ;
            } else {
                window.location = "../../comun/logout.php";
            }
        }

    }
}
function limpiarTable() {
    document.getElementById("tbody").innerHTML = "";
}

function loadEvents() {
    comprobarSession();
    loadPedidos();
    document.getElementById("primera").addEventListener("click", () => {
        pagina = 1;
        //console.log("pagina"+pagina);
        limpiarTable();
        loadPedidos();
    });
    document.getElementById("anterior").addEventListener("click", () => {
        if (pagina === 1) {
            pagina = 1;
        } else {
            pagina--;
        }
        //console.log("pagina"+pagina);
        limpiarTable();
        loadPedidos();
    });
    document.getElementById("siguiente").addEventListener("click", () => {
        if (pagina === totalPag) {
            pagina = totalPag;
        } else {
            pagina++;
        }
        //console.log("pagina"+pagina);
        limpiarTable();
        loadPedidos();
    });
    document.getElementById("ultima").addEventListener("click", () => {
        pagina = totalPag;
        //console.log("pagina"+pagina);
        limpiarTable();
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

