function respPago() {
    if (this.readyState == 4 && this.status == 200) {
        let string = this.responseText;
        console.log('strc  ' + string);
        let datosPedido = string.slice(0, string.indexOf("#"));
        console.log('datosPedido: ' + datosPedido);
        let datosProductos = string.slice(string.indexOf("#") + 1, string.indexOf("%%"));
        console.log('datos Poductos: ' + datosProductos);
        let carritoLength = string.slice(string.indexOf("%%") + 2, string.length);
        console.log('carrito Length: ' + carritoLength);
        for (let index = 0; index < carritoLength; index++) {


        }

    }
}
function loadEvents() {
    document.getElementById("pagar").addEventListener("click",pasarApagar)
}