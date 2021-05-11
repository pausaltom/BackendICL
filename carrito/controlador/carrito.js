function procesarProducto() {
    if (this.readyState == 4 && this.status == 200) {
        var stringProducto = this.responseText;
        console.log('string' + stringProducto);

        var arrayAtributosProduct = stringProducto.split("/");
        console.log('arrayAtributosProduct  ' + arrayAtributosProduct);
        let tbody = document.getElementById("tbody");
        let tr = document.createElement("tr");
        var foto = document.createElement("td");
        var img = document.createElement("img");
        img.src = rutaImagen(arrayAtributosProduct[0]);
        img.width =200;
        img.height=200;
        img.alt = "Imagen Producto";
        foto.appendChild(img);
        var nombreProducto = document.createElement("td");
        nombreProducto.innerHTML= arrayAtributosProduct[1];
        var cantidad = document.createElement("td");
        cantidad.innerHTML= arrayAtributosProduct[2];
        var precioTotal = document.createElement("td");
        precioTotal.innerHTML=arrayAtributosProduct[3];
        tbody.appendChild(tr);
        tr.appendChild(foto);
        tr.appendChild(nombreProducto);
        tr.appendChild(cantidad);
        tr.appendChild(precioTotal);
    }
}
function rutaImagen(imgName) {
    var rutaImgTemp = "/php/uploads/" + imgName;
    var rutaImg = rutaImgTemp.split(" ").join("");
    return rutaImg;
}

function getURLParams() {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const IDproduct = urlParams.get('idProduct');
    const cantidad = urlParams.get('cantidad');
    const producto=[IDproduct,cantidad];
    console.log(producto);
    return producto;
}
var role;
function procesarSession() {
    if (this.readyState == 4 && this.status == 200) {
        role = this.responseText;
        console.log('role' + role);
        if (!(role === "ADMINSESSION" || role === "SUPERADMINSESSION")) {
            window.location = "../../../comun/logout.php";
        }
    }
}
function loadEvents() {
    var producto =getURLParams();
    console.log(producto)
    loadProductoPedido(producto);
}
function comprobarSession() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarSession;
    xmlhttp.open("GET", "http://localhost/php/comun/comprobarSession.php", true);
    xmlhttp.send();
}
function loadProductoPedido(producto) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarProducto;
    xmlhttp.open("GET", "http://localhost/php/carrito/modelo/carrito.php?idProducto="+producto[0]+"&cantidad="+producto[1], true);
    xmlhttp.send();
}
