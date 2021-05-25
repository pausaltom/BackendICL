<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="30"><!-- al poner este metadata la pagina se recarga automáticamente cada x segundos en este caso  30 segundos  -->
  <title>Resumen Pago</title>
  <script type="text/javascript" src="../controlador/mostrarresumenPago.js"></script>
  <style>
    #card {
      position: relative;

    }

    table {
      position: absolute;
      width: 50%;
      top: 5;
      left: 0;
      margin-right: 5;

    }

    #aside {
      width: 50%;
      position: absolute;
      right: 0;
      margin-left: 5;
      float: right;
    }

    li {
      display: inline-block;
    }

    td {
      text-align: center;
    }
  </style>
</head>

<body>
  <script type="text/javascript">
    window.addEventListener("load", loadEvents);
  </script>
  <?php
  session_start();
  if (!isset($_SESSION["usuario"])) {
    header("location: http://localhost/php/auth/logout.php");
  }
  include("../../comun/conexionBD.php");
  $email = $_SESSION['usuario']['email'];
  $result = $mysqli->query("SELECT * FROM usuario WHERE Email='$email'");
  $r = $result->fetch_object();
  //echo $r->Email." direccion".$r->Direccion."fdffd " .$r->ID_Usuario;

  $verPedido = $mysqli->query("SELECT p.ID_Pedido as ID_Pedido,p.Comentario,p.Activo,u.Nombre,p.PrecioTotal,p.Hora,e.Estado,u.Direccion ,u.Telefono FROM pedido p, usuario u, estado_pedido e WHERE (u.ID_Usuario=$r->ID_Usuario)AND(p.ID_Usuario=u.ID_Usuario AND p.ID_Estado=e.ID_Estado) AND(p.Activo=1)");
  echo ($mysqli->error);
  $row = $verPedido->fetch_object();
  //echo $row->ID_Pedido." --- ".$row->Comentario." --- ".$row->Activo." --- ".$row->Nombre." --- ".$row->PrecioTotal." --- ".$row->Estado." --- ".$row->Direccion." --- ".$row->Telefono;
  ?>
  <div id="card">
    <label for="tablaProductos">
      <h2>Pedido <?php echo "P0000" . $row->ID_Pedido ?></h2>
    </label>
    <table id="tablaProductos">
      <thead>
        <th>Imagen:</th>
        <th>Nombre Producto:</th>
        <th>Cantidad:</th>
        <th>Precio:</th>
      </thead>
      <tbody id="tbody">
        <?php
        $lineasPedido = $mysqli->query("SELECT l.ID_Pedido, l.Cantidad, p.Nombre,p.Precio,p.img from linea_pedido l, producto p where l.ID_Producto=p.ID_Producto AND l.ID_Pedido=$row->ID_Pedido");
        while ($productos = $lineasPedido->fetch_object()) {
        ?>
          <tr>
            <td><img src="<?php echo "/php/uploads/" . $productos->img; ?>" width="70px" alt="Imagen Producto"></td>
            <td><?php echo $productos->Nombre; ?></td>
            <td><?php echo $productos->Cantidad; ?></td>
            <td><?php echo $productos->Precio; ?>€</td>
          </tr>
        <?php
        }
        ?>
        <tr>
          <td></td>
          <td></td>
          <td id="precioTotalText"><strong>Precio Total:</strong></td>
          <td id="precioTotalNumero"><strong><?php echo $row->PrecioTotal?>€</strong></td>
        </tr>
        <?php
        ?>
      </tbody>
      <div id="aside">
        <div>
          <label for="EstadoPedido"><strong>EstadoPedido: </strong></label>
          <div id="EstadoPedido">
            <p><?php echo $row->Estado; ?></p>
          </div>
        </div>
        <label for="DatosPersonales"><strong>Datos Personales: </strong></label>
        <div id="DatosPersonales">

          <div style="display:none;" id="direccion"><?php echo $row->Direccion; ?></div>
          <ul id="direccionDescompuesta" style="list-style: none;">
            <label for="nombre"><strong>
                Nombre: </strong>
                  <li id="nombre"><?php echo $row->Nombre; ?></li></label>
            <br>
            <label for="telefono"><strong>
                Teléfono: </strong>
                  <li id="telefono"><?php echo $row->Telefono; ?></li></label>
            <br>
            <label for="provincia"><strong>
                Provincia: </strong>
                  <li id="provincia"></li></label>
            <br>
            <label for="municipio"><strong>
                Municipio: </strong>
                  <li id="municipio"></li></label>
            <br>
            <label for="cp"><strong>
                Cp: </strong>
                  <li id="cp"></li></label>
            <br>
            <label for="Direccion"><strong>
                Dirección: </strong>
                  <li id="Direccion"></li></label>
            <br>
            <label for="Numero"><strong>
                Número: </strong>
                  <li id="Numero"></li></label>
            <br>
            <label for="Piso"><strong>
                Piso: </strong>
                  <li id="Piso"></li></label>
            <br>
            <label for="Bloque"><strong>
                Bloque: </strong>
                  <li id="Bloque"></li></label>
            <br>
            <label for="Puerta"><strong>
                Puerta: </strong>
                  <li id="Puerta"></li></label>
            <br>
            <label for="Escalera"><strong>
                Escalera: </strong>
                  <li id="Escalera"></li></label>
          </ul>
        </div>
        <div>
          <label for="Comentario"><strong>Comentario: </strong></label>
          <div id="Comentario">
            <p><?php echo $row->Comentario; ?></p>
          </div>
        </div>
        <div>
          <label for="Hora"><strong>Hora de entrega: </strong></label>
          <div id="Hora">
            <p><?php echo $row->Hora; ?></p>
          </div>
        </div>
      </div>
  </div>
</body>

</html>