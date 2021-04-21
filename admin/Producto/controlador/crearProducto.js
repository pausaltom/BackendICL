function procesarProducto() {
    if (this.readyState == 4 && this.status == 200) {
        var stringProducto = this.responseText;
        console.log('string' + stringProducto);

        var arrayAtributosProduct = stringProducto.split("/");
        console.log('arrayAtributosProduct  ' + arrayAtributosProduct);
        var foto = document.getElementById("imagenFoto");
        var img = document.createElement("img");
        img.src = rutaImagen(arrayAtributosProduct[0]);
        img.width =200;
        img.alt = "Imagen Producto";
        foto.appendChild(img);
        var nombreProducto = document.getElementById("nombreProducto");
        nombreProducto.setAttribute("value",arrayAtributosProduct[1]);
        var precioProducto = document.getElementById("precioProducto");
        precioProducto.setAttribute("value",arrayAtributosProduct[2]);
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
        if (!(role === "ADMINSESSION" || role === "SUPERADMINSESSION")) {
            window.location = "../../../comun/logout.php";
        }
    }
}
function loadEvents() {
    comprobarSession();
    loadProducto();
    var idProduct =getURLParams();
    document.getElementById("idProduct").setAttribute("value",idProduct);
    document.getElementById("idProduct1").setAttribute("value",idProduct);
    document.getElementById("botonEnviar").addEventListener("click",()=>{
        location.reload();
    });
}
function comprobarSession() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarSession;
    xmlhttp.open("GET", "http://localhost/php/comun/comprobarSession.php", true);
    xmlhttp.send();
}
function loadCategorias() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarCategorias;
    xmlhttp.open("GET", "http://localhost/php/admin/Producto/modelo/loadCategorias.php", true);
    xmlhttp.send();
}
