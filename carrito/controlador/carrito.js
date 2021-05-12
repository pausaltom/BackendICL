function loadEvents() {
    document.getElementById("pagar").addEventListener("click",pasarApagar)
}

function pasarApagar() {
    let formData = new FormData();
    var coment = document.getElementById("comentario").value;
    var subtotal = document.getElementById("pagar").value;
    console.log(coment);
    formData.append("comentario",coment);
    formData.append("subtotal",subtotal);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/php/carrito/modelo/pagar.php", true);
    xmlhttp.send(formData);
}
