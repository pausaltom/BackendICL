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
        var stringProducto = this.responseText;
        console.log('string' + stringProducto);

        var divErr =document.getElementById("errores");
        var span = document.createElement("span");
        
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
    reader.onload = function(){
      let preview = document.getElementById('imagenFoto'),
              image = document.createElement('img');
  
      image.src = reader.result;
      image.width=200;
      image.height=200;
  
      preview.innerHTML = '';
      preview.append(image);
    };
    reader.readAsDataURL(e.target.files[0]);
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
// function esProductoValido() {
//     var nombre = document.getElementById("nombreProducto").value;
//     console.log('nombre '+nombre);
    
    
//     return nombre;

    
// }

function loadEvents() {
    comprobarSession();
    loadCategorias();
    //getIDUltimoProducto();
    document.getElementById("imagenInput").addEventListener("change", previewImg);
    var btnEnviar = document.getElementById("btnEnviar");
    btnEnviar.addEventListener("click", comprobarProducto);

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

function comprobarProducto() {
    var nombre = document.getElementById("nombreProducto").value;
    var formData = new FormData();
    formData.append("nombreProducto",nombre);
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
