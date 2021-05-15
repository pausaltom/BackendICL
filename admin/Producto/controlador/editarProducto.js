//Procesamos el string que nos devuelve 
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
        img.height=200;
        img.alt = "Imagen Producto";
        foto.appendChild(img);
        var nombreProducto = document.getElementById("nombreProducto");
        nombreProducto.setAttribute("value",arrayAtributosProduct[1]);
        var precioProducto = document.getElementById("precioProducto");
        precioProducto.setAttribute("value",arrayAtributosProduct[2]);
    }
}
//retorna la ruta de la imagen asegurándose que no hay ningún espacio entre media
function rutaImagen(imgName) {
    var rutaImgTemp = "/php/uploads/" + imgName;
    var rutaImg = rutaImgTemp.split(" ").join("");
    return rutaImg;
}
//función sacada de internet que devuelve los parámetros de la query que tu quieras
function getURLParams() {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const IDproduct = urlParams.get('idProduct')
    console.log(IDproduct);
    return IDproduct;
}
//iniciaríamos role como una variable global, ya que en alguna parte del código se necesita para comprobaciones 
var role;
function procesarSession() {
    if (this.readyState == 4 && this.status == 200) {
        role = this.responseText;
        console.log('role' + role);
        //En caso de que la sessión no tenga los roles permitidos los envia de vuelta al login
        if (!(role === "ADMINSESSION" || role === "SUPERADMINSESSION")) {
            window.location = "../../../comun/logout.php";
        }
    }
}

function existeProducto() {
    //En este método se procesa la respuesta de la petición comprobarProducto para mirar si ya existe algún producto con este nombre
    if (this.readyState == 4 && this.status == 200) {
        var string = this.responseText;
        console.log('string ' + string);
        var err = string.split("/");
        console.log('err ' + err);
        var span = document.getElementById("spanErr");
        if (err[1] === "1" || err[1] === "2") {
            span.textContent = err[0];
            span.style = "color:red;";
            
            //divErr.appendChild(span1);
        } else if (err[1] === "0") {
            span.textContent = err[0];
            span.style = "color:green;";
            setTimeout(() =>{document.getElementById("formularioEditarProducto").submit(); },2500);
           
            
            
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
    //enviamos el ID por query al archivo eliminarProducto
    document.getElementById("eliminar").addEventListener("click",()=>{
        let sino =confirm("Estas seguro que deseas eliminar este Producto");
        if (sino == true) {
            window.location="../modelo/eliminarProducto.php?idProd=" + idProduct;
        }else {
            return false;
        }
    });
    document.getElementById("dataProducto").addEventListener("click",comprobarProducto);
}
//petición para comprobar la sessión
function comprobarSession() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarSession;
    xmlhttp.open("GET", "http://localhost/php/comun/comprobarSession.php", true);
    xmlhttp.send();
}
//petición para comprobar la Producto válido
function comprobarProducto() {
    var formData = new FormData(document.getElementById("formularioEditarProducto"));
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = existeProducto;
    xmlhttp.open("POST", "http://localhost/php/admin/Producto/modelo/comprobarProducto.php", true);
    xmlhttp.send(formData);
}
// petición para obtener los datos de un producto concreto por id
function loadProducto() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarProducto;
    xmlhttp.open("GET", "http://localhost/php/admin/Producto/modelo/getProductoPorID.php?idProducto=" + getURLParams(), true);
    xmlhttp.send();
}
