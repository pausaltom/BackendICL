function loadEvents() {
  //carga los productos por defecto
  loadPedidos();
  //btn actions
  document.getElementById("primera").addEventListener("click", () => {
    primera();
  });

  document.getElementById("anterior").addEventListener("click", () => {
    anterior();
  });

  document.getElementById("siguiente").addEventListener("click", () => {
    siguiente();
  });

  document.getElementById("ultima").addEventListener("click", () => {
    ultima();
  });

  //cargarAcciones();
}

//--------------Eventos pagina-----------------//

function primera() {
  pagina = 1;
  console.log("pagina" + pagina);
  limpiarContenidoLista();
  loadPedidos();
}

function anterior() {
  if (pagina === 1) {
    pagina = 1;
  } else {
    pagina--;
  }
  console.log("pagina" + pagina);
  limpiarContenidoLista();
  loadPedidos();
}

function siguiente() {
  if (pagina === totalPag) {
    pagina = totalPag;
  } else {
    pagina++;
  }
  console.log("pagina" + pagina);
  limpiarContenidoLista();
  loadPedidos();
}

function ultima() {
  pagina = totalPag;
  console.log("pagina" + pagina);
  limpiarContenidoLista();
  loadPedidos();
}

function cargarAcciones() {
  try {

    //Cancelar pedido
    document.getElementById("delete1").addEventListener("click", () => {
      var idProduct = document.getElementById("GetID1").innerHTML;
      //alert("Eliminar Pedido: " + idProduct);
      window.location = "../modelo/cancelar-pedido.php?idProd=" + idProduct;
    });
    document.getElementById("delete2").addEventListener("click", () => {
      var idProduct = document.getElementById("GetID2").innerHTML;
      //alert("Eliminar Pedido: " + idProduct);
      window.location = "../modelo/cancelar-pedido.php?idProd=" + idProduct;
    });
    document.getElementById("delete3").addEventListener("click", () => {
      var idProduct = document.getElementById("GetID3").innerHTML;
      //alert("Eliminar Pedido: " + idProduct);
      window.location = "../modelo/cancelar-pedido.php?idProd=" + idProduct;
    });
    document.getElementById("delete4").addEventListener("click", () => {
      var idProduct = document.getElementById("GetID4").innerHTML;
      //alert("Eliminar Pedido: " + idProduct);
      window.location = "../modelo/cancelar-pedido.php?idProd=" + idProduct;
    });
    document.getElementById("delete5").addEventListener("click", () => {
      var idProduct = document.getElementById("GetID5").innerHTML;
      //alert("Eliminar Pedido: " + idProduct);
      window.location = "../modelo/cancelar-pedido.php?idProd=" + idProduct;
    });

    //---------------Aceptar pedido
    document.getElementById("accept1").addEventListener("click", () => {
      var idProduct = document.getElementById("GetID1").innerHTML;
      //alert("Aceptar Pedido: " + idProduct);
      window.location = "../modelo/aceptar-pedido.php?idProd=" + idProduct;
    });
    document.getElementById("accept2").addEventListener("click", () => {
      var idProduct = document.getElementById("GetID2").innerHTML;
      //alert("Aceptar Pedido: " + idProduct);
      window.location = "../modelo/aceptar-pedido.php?idProd=" + idProduct;
    });
    document.getElementById("accept3").addEventListener("click", () => {
      var idProduct = document.getElementById("GetID3").innerHTML;
      //alert("Aceptar Pedido: " + idProduct);
      window.location = "../modelo/aceptar-pedido.php?idProd=" + idProduct;
    });
    document.getElementById("accept4").addEventListener("click", () => {
      var idProduct = document.getElementById("GetID4").innerHTML;
      //alert("Aceptar Pedido: " + idProduct);
      window.location = "../modelo/aceptar-pedido.php?idProd=" + idProduct;
    });
    document.getElementById("accept5").addEventListener("click", () => {
      var idProduct = document.getElementById("GetID5").innerHTML;
      //alert("Aceptar Pedido: " + idProduct);
      window.location = "../modelo/aceptar-pedido.php?idProd=" + idProduct;
    });
  } catch (error) {
    console.log("¡Alerta en generar las referencias!");
  }
}

//--------------Limpia el contenido a mostrado-----------------//

function limpiarContenidoLista() {
  document.getElementById("Pedido").innerHTML = "";
}

//------------Get ofertas--------------------//

function loadPedidos() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = processarPedidos;
  //xmlhttp.open("GET", "https://pizzeriagirona.000webhostapp.com/php/ver-ofertas/ver-ofertasV3.php?pagina=" + pagina, true);
  xmlhttp.open(
    "GET",
    "http://localhost/php/admin/pedido/modelo/ver-pedidos.php?pagina=" + pagina,
    true
  );
  xmlhttp.send();
  console.log("Pagina actual: "+pagina);
}

function processarPedidos() {
  if (this.readyState == 4 && this.status == 200) {
    //Obten el id del contenedor
    var contenedor = document.getElementById("Pedido");

    //Conten toda la respuesta
    var string = this.responseText;
    console.log("Respuesta de server string: " + string);

    var k = string.indexOf("#");
    console.log("k" + k);

    //Establece el maximo de paginas ref var pagina
    var paginacion = string.slice(k + 1, string.length);
    totalPag = parseInt(paginacion);
    console.log("paginas totales:" + paginacion);

    var stringProductos = string.slice(0, k);

    var conj = 1;

    //console.log("string" + stringProductos);
    var arrayliProductos = stringProductos.split("//").filter(Boolean);

    //Genera los elementos por cantidad
    arrayliProductos.forEach((element) => {
      var arrayCadaProducto = element.split("/");

      //Crea los elementos
      //Padre
      var tr = document.createElement("tr");
      //Hijos
      var tdSetID = document.createElement("td");
      var tdCode = document.createElement("td");
      var tdName = document.createElement("td");
      var tdComent = document.createElement("td");
      var tdTel = document.createElement("td");
      var tdHour = document.createElement("td");
      var tdStreet = document.createElement("td");
      var tdStatus = document.createElement("td");
      var tdButtons = document.createElement("td");
      var selectorEstados = document.createElement("select");
      var btnDelete = document.createElement("button");

      //Asigna estilos
      tr.classList = "border-bottom border-dark";
      tdSetID.classList = "hide";      
      btnDelete.classList = "btn btn-danger my-1";

      //Asigna ids
      tdSetID.id = "GetID" + conj;
      btnDelete.id = "delete" + conj;
      selectorEstados.id = "selectorEstados";
      conj++;
      

      //Asinga valores
      tdSetID.innerHTML = arrayCadaProducto[0];
      tdCode.innerHTML = "000"+arrayCadaProducto[0] ;
      tdName.innerHTML = arrayCadaProducto[1];
      tdComent.innerHTML = arrayCadaProducto[2];
      tdTel.innerHTML = arrayCadaProducto[3];
      tdHour.innerHTML = arrayCadaProducto[4];
      tdStreet.innerHTML = arrayCadaProducto[5];
      tdStatus.innerHTML = arrayCadaProducto[6];      
      btnDelete.innerHTML = "Cancelar";

      //Llama a selector
      loadEstado();

      //Contruye el btn
      tdButtons.appendChild(selectorEstados);
      tdButtons.appendChild(btnDelete);

      //Contruye el padre
      tr.appendChild(tdSetID);
      tr.appendChild(tdCode);
      tr.appendChild(tdName);
      tr.appendChild(tdComent);
      tr.appendChild(tdTel);
      tr.appendChild(tdHour);
      tr.appendChild(tdStreet);
      tr.appendChild(tdStatus);
      tr.appendChild(tdButtons);
      //tr.appendChild(selectorEstados);

      //Muuestra el resultado
      contenedor.appendChild(tr);

      //Muestra la pagina actual y el total de paginas
      document.getElementById("contador").innerText = totalPag;
      document.getElementById("contadorActual").innerText = pagina;
    });
  }

  cargarAcciones();
}

function loadEstado() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = procesarEstado;
  xmlhttp.open("GET", "http://localhost/php/admin/pedido/modelo/getEstados.php", true);
  xmlhttp.send();
}

function procesarEstado() {
  var selectorEstado = document.getElementById("selectorEstados");
  if (this.readyState == 4 && this.status == 200) {
      var stringAll = this.responseText;
      //console.log('stringRoles '+stringAll);

      var arrayliEstado = stringAll.split("//",);
      // console.log('arrayliRole  '+arrayliRole);

      for (let i = 0; i < arrayliEstado.length - 1; i++) {
          var arraycomponentesEstados = arrayliEstado[i].split("/");
          selectorEstado.innerHTML += "<option value="+arraycomponentesEstados[0]+">" + arraycomponentesEstados[1] + "</option>" + "\n"
          //console.log("arrayComponents "+arraycomponentesEstados[1]);

      }



  }
}

//-------------var------------------//
var pagina = 1;
var totalPag;
var containerGeneral = document.getElementById("Pedido");

//http://localhost/ICL-Frontend
//https://pizzeriagirona.000webhostapp.com
