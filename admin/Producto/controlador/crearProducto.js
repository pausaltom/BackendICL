function procesarCategorias() {
    var selectorCategoria = document.getElementById("categoriaProducto");

    if (this.readyState == 4 && this.status == 200) {
        var stringAll = this.responseText;
        //console.log('string'+stringAll);

        var arrayliCat = stringAll.split("//",);
        //console.log('arrayliCat  '+arrayliCat);

        for (let i = 0; i < arrayliCat.length - 1; i++) {
            var arraycomponentesCat = arrayliCat[i].split("/");
            selectorCategoria.innerHTML += "<option value=" + arraycomponentesCat[0] + ">" + arraycomponentesCat[1] + "</option>" + "\n"
            //console.log("arrayComponents "+arraycomponentesCat[1]);

        }



    }
}
function procesarProducto() {
    if (this.readyState == 4 && this.status == 200) {
        var string = this.responseText;
        console.log('string ' + string);
        var err = string.split("/");
        console.log('err ' + err);

        var span = document.getElementById("spanErr");
        if (err[1] === "1" || err[1]==="2") {
            span.innerHTML = err[0];
            span.style = "color:red;";
            //divErr.appendChild(span1);
        } else if (err[1] === "0" ) {
            span.innerHTML = err[0];
            span.style = "color:green;";
        }



    }
}
/*function procesarIDProducto() {
    if (this.readyState == 4 && this.status == 200) {
        var string = this.responseText;
        console.log('result ' + string);
        document.getElementById("idProduct").setAttribute("value", string);


    }
}*/

function previewImg(e) {
    // Creamos el objeto de la clase FileReader
    let reader = new FileReader();

    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    reader.readAsDataURL(e.target.files[0]);

    // Le decimos que cuando este listo ejecute el código interno
    reader.onload = function () {
        let preview = document.getElementById('imagenFoto'),
            image = document.createElement('img');

        image.src = reader.result;
        image.width = 200;
        image.height = 200;

        preview.innerHTML = '';
        preview.append(image);
    };
    reader.readAsDataURL(e.target.files[0]);
}

var role;
function procesarSession() {
    if (this.readyState == 4 && this.status == 200) {
        role = this.responseText;
        console.log('role ' + role);
        if (!(role === "ADMINSESSION" || role === "SUPERADMINSESSION")) {
            window.location = "../../../comun/logout.php";
        }
    }
}
// function esProductoValido() {
//     var nombre = document.getElementById("nombreProducto").value;
//     console.log('nombre '+nombre);


//     return nombre;


// }
function getURLParams() {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const nombreIMG = urlParams.get('imgNombre')
    console.log(nombreIMG);
    return nombreIMG;
}
function loadEvents() {
    comprobarSession();
    loadCategorias();
    //getIDUltimoProducto();
    document.getElementById("imagenInput").addEventListener("change", previewImg);
    var btnValidar = document.getElementById("btnValidar");
    btnValidar.addEventListener("click", comprobarProducto);
    var btnCrear = document.getElementById("btnEnviar");
    btnCrear.addEventListener("click",()=>{
        var img = getURLParams();
        crearProducto(img);
    })
    

}
function comprobarSession() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarSession;
    xmlhttp.open("GET", "http://localhost/php/comun/comprobarSession.php", true);
    xmlhttp.send();
}
function getIDUltimoProducto() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarIDProducto;
    xmlhttp.open("GET", "http://localhost/php/admin/Producto/modelo/getIDUltimoProducto.php", true);
    xmlhttp.send();
}
function crearProducto(nombreIMG) {
    var selectorcategoria = document.getElementById("categoriaProducto");
    var catValue = selectorcategoria.options[selectorcategoria.selectedIndex].value;
    console.log('val '+catValue);
    var formData = new FormData(document.getElementById("formularioProducto"));
    formData.append("imagen",nombreIMG);
    formData.append("categoria",catValue);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/php/admin/Producto/modelo/crearProducto.php", true);
    xmlhttp.send(formData);
}
function comprobarProducto() {
    var formData = new FormData(document.getElementById("formularioProducto"));
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarProducto;
    xmlhttp.open("POST", "http://localhost/php/admin/Producto/modelo/comprobarProducto.php", true);
    xmlhttp.send(formData);
}
function loadCategorias() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarCategorias;
    xmlhttp.open("GET", "http://localhost/php/admin/Producto/modelo/getCategorias.php", true);
    xmlhttp.send();
}
