var totalPag;
function procesarProductos() {
    if (this.readyState == 4 && this.status == 200) {
        var string = this.responseText;
        //console.log('string: ' + string);

        var k = string.indexOf("#");
        //console.log('k' + k);

        var paginacion = string.slice(k + 1, string.length);
        totalPag = parseInt(paginacion);
        //console.log('pag:' + paginacion);
        

        var stringProductos = string.slice(0, k);

        //console.log('string' + stringProductos);
        var arrayliProductos = stringProductos.split("//").filter(Boolean);
        //console.log('arrayliProductos  '+arrayliProductos);

        arrayliProductos.forEach(element => {
            var arrayCadaProducto = element.split('/');
            var tbody = document.getElementById("tbody");
            //console.log('id: '+arrayCadaProducto[0]);
            //console.log('img: '+arrayCadaProducto[1]);
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var img = document.createElement("img");
            img.src = rutaImagen(arrayCadaProducto[1]);
            img.width = 200;
            img.alt = "Imagen Producto";
            td1.appendChild(img);
            var td2 = document.createElement("td");
            td2.innerHTML = arrayCadaProducto[2];
            var td3 = document.createElement("td");
            td3.innerHTML = arrayCadaProducto[3] + "€";
            var td4 = document.createElement("td");
            if (role != "NOSESSION" && role != "USERSESSION") {
                var editar = document.createElement("a");
                editar.href="../../admin/Producto/vista/editarProducto.html?idProduct="+arrayCadaProducto[0];
                //console.log(editar.id);
                //editar.value = arrayCadaProducto[0];
                editar.innerHTML = "Editar";
                td4.appendChild(editar);
            } else {
                var cantidad = document.createElement("input");
                var anadir = document.createElement("a");
                cantidad.type="number";
                cantidad.defaultValue=1;
                cantidad.min=1;
                cantidad.max=50;
                cantidad.style="margin-right:10px;width:40px;"
                
                anadir.href="../../admin/Producto/vista/editarProducto.html?idProduct="+arrayCadaProducto[0];
                //console.log(anadir.id);
                //anadir.value = arrayCadaProducto[0];
                anadir.innerHTML = "Añadir";
                anadir.appendChild(cantidad);
                td4.appendChild(anadir);
                td4.insertBefore(cantidad,anadir);
                

            }
            tbody.appendChild(tr);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
        });
    }
}
function rutaImagen(imgName) {
    var rutaImgTemp = "/php/uploads/" + imgName;
    var rutaImg = rutaImgTemp.split(" ").join("");
    return rutaImg;
}

var role;
function procesarSession() { 
    
    if (this.readyState == 4 && this.status == 200) {
        role = this.responseText;
        console.log('role' + role);
        if ((role != "NOSESSION" && role != "USERSESSION" && role != "ADMINSESSION" && role != "SUPERADMINSESSION")) {
            //console.log('role '+role);
            window.location = "../../comun/logout.php";
        }
        if (role === "ADMINSESSION" || role === "SUPERADMINSESSION") {
            //console.log("role "+role);
            document.getElementById("crearProd").style.visibility = "visible";
        }else{
           
        }
    }
}
function limpiarTable(){
    document.getElementById("tbody").innerHTML="";
}

function loadEvents() {
    document.getElementById("crearProd").style.visibility = "hidden";
    comprobarSession();
    loadProductos();
    document.getElementById("primera").addEventListener("click", () => {
        pagina = 1;
        //console.log("pagina"+pagina);
        limpiarTable();
        loadProductos();
    });
    document.getElementById("anterior").addEventListener("click", () => {
        if (pagina === 1) {
            pagina = 1;
        } else {
            pagina--;
        }
        //console.log("pagina"+pagina);
        limpiarTable();
        loadProductos();
    });
    document.getElementById("siguiente").addEventListener("click", () => {
        if (pagina === totalPag) {
            pagina = totalPag;
        } else {
            pagina++;
        }
        //console.log("pagina"+pagina);
        limpiarTable();
        loadProductos();
    });
    document.getElementById("ultima").addEventListener("click", () => {
        pagina = totalPag;
        //console.log("pagina"+pagina);
        limpiarTable();
        loadProductos();
    });
    //document.getElementsByClassName("editButton").addEventListener("click",() => {
        //console.log("hola soy el btnEdit "+ getElementsByClassName("editButton").value);
       // window.location="../../admin/Producto/vista/editarProducto.html?idProduct="+document.getElementsByClassName("editButton").value;
     // });
}

function comprobarSession() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarSession;
    xmlhttp.open("GET", "http://localhost/php/comun/comprobarSession.php", true);
    xmlhttp.send();
}
var pagina = 1;
function loadProductos() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarProductos;
    xmlhttp.open("GET","http://localhost/php/Productos/modelo/getProductos.php?pagina="+pagina, true);
    xmlhttp.send();
}
