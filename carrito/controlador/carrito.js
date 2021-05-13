function loadEvents() {
    document.getElementById("pagar").addEventListener("click",pasarApagar);
}

function pasarApagar() {
    let formData = new FormData();
    var coment = document.getElementById("comentario").value;
    var subtotal = document.getElementById("pagar").value;
    console.log(coment+"    "+subtotal);
    formData.append("comentario",coment);
    formData.append("subtotal",subtotal);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=respPago;
    xmlhttp.open("POST", "http://localhost/php/carrito/modelo/pagar.php", true);
    xmlhttp.send(formData);
}
function respPago() {
    if (this.readyState == 4 && this.status == 200) {
        let string = this.responseText;
        console.log(string)
        let respOK= string.split("/");
        if (respOK[1]==="1") {
            window.location="../vista/vistaPago.php";
        } else {
            alert("error al realizar el pago");
        }
    }
}
