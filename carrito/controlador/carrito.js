function loadEvents() {
    document.getElementById("pagar").addEventListener("click",comprobarTieneDireccion);
}
function comprobarTieneDireccion() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange= puedePagar;
    xmlhttp.open("GET", "http://localhost/php/carrito/modelo/comprobarTieneDireccion.php", true);
    xmlhttp.send();
}
function puedePagar() {
    if (this.readyState == 4 && this.status == 200) {
        let string = this.responseText;
        console.log('hola : '+string);
        let respPuede = string.split("/");
        if (respPuede[1]==="1") {
            pasarApagar();
        } else {
            alert(respPuede[0])
            window.location="../../user/pedirAdomicilio/direccion.php";
        }
    
    
    }

}
function pasarApagar() {
    let formData = new FormData();
    var coment = document.getElementById("comentario").value;
    var subtotal = document.getElementById("pagar").value;
    console.log(coment+"    "+subtotal);
    formData.append("comentario",coment);
    formData.append("subtotal",subtotal);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange= respPago;
    xmlhttp.open("POST", "http://localhost/php/carrito/modelo/pagar.php", true);
    xmlhttp.send(formData);
}
function respPago() {
    if (this.readyState == 4 && this.status == 200) {
        let string = this.responseText;
        console.log(string)
        let respOK= string.split("/");
        if (respOK[1]==="1") {
            alert(respOK[0]);
            window.location="../vista/vistaPago.php";
        } else if (respOK[1]==="2") {
            alert(respOK[0]);
            window.location="../../Productos/vista/listaProductos.html";
        }else{
            alert(respOK[0]);
        }
    }
}
