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
      position:relative;
    }
    table{
      width: 50%;
      top: 5;
      left: 0;
      margin-right: 5;
      position:absolute;
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
    header("location: http://localhost/php/auth/login.html");
  }
  include("../../comun/conexionBD.php");
  $email = $_SESSION['usuario']['email'];
  $result = $mysqli->query("SELECT * FROM usuario WHERE email='$email'");
  $r=$result->fetch_object();
  $id_usuario=$r->ID_Usuario;
  $verPedido = $mysqli->query("SELECT p.ID_Pedido as ID_Pedido,p.Comentario,p.Activo,u.Nombre,p.PrecioTotal,p.Hora,e.Estado,u.Direccion,u.Telefono FROM pedido p, usuario u, estado_pedido e WHERE(p.ID_Usuario=$id_usuario AND p.ID_Estado=e.ID_Estado) AND(p.Activo=1)");
  $row = $verPedido->fetch_object();
  ?>
  <div id="card">
  <label for="tablaProductos"><h2>Pedido <?php echo "P0000" . $row->ID_Pedido ?></h2></label>
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
    </tbody>
    <div id="aside" >
      <div>
        <label for="EstadoPedido"><strong>EstadoPedido: </strong></label>
        <div id="EstadoPedido">
          <p><?php echo $row->Estado; ?></p>
        </div>
      </div>
      <div>
        <label for="DatosPersonales"><strong>Datos Personales: </strong></label>
        <div id="DatosPersonales">
          <div><?php echo $row->Nombre; ?></div>
          <div><?php echo $row->Telefono; ?></div>
          <div style="display:none;" id="Dirección"><?php echo $row->Direccion; ?></div>
          <ul id="direccionDescompuesta" style="list-style: none;">
            <label for="provincia">Provincia: <li id="provincia"></li></label>
            <label for="municipio">Municipio:<li id="municipio"></li></label>
            <label for="cp">Cp: <li id="cp"></li></label>
            <label for="Direccion">Dirección: <li id="Direccion"></li></label>
            <label for="Numero">Número: <li id="Numero"></li></label>
            <label for="Piso">Piso:<li id="Piso"></li></label>
            <label for="Bloque">Bloque: <li id="Bloque"></li></label>
            <label for="Puerta">Puerta: <li id="Puerta"></li></label>
            <label for="Escalera">Escalera: <li id="Escalera"></li></label>
          </ul>
        </div>
      </div>
      <div>
        <label for="Comentario"><strong>Comentario: </strong></label>
        <div id="Comentario">
          <p><?php echo $row->Comentario; ?></p>
        </div>
      </div>
    </div>
  </div>
</body>

</html>