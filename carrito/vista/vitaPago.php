<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>
    <style>
        table {
          width: 80%;
          margin-top: 5%;
          margin-right: auto;
          margin-left: auto;
        }
        body{
          text-align: center;
        }
        td {
          text-align: center;
        }
      </style>
</head>
<body>
    <?php
      session_start();
      if(!isset($_SESSION["usuario"])){
          header("location: http://localhost/php/auth/login.html");
      }
      include("../../comun/conexionBD.php");
      $email =$_SESSION['usuario']['email'];
      $verPedido=$mysqli->query("SELECT p.ID_Pedido,p.Comentario,u.Nombre,p.PrecioTotal,p.Hora,e.Estado,u.Direccion,u.Telefono FROM pedido p, usuario u, estado_pedido e WHERE(p.ID_Usuario=u.ID_Usuario AND p.ID_Estado=e.ID_Estado) AND(p.ID_Pedido=1)");
      $row = $verPedido->fetch_object(); 
    ?>
    <label for="tablaProductos"><?php P0000 $row->ID_Usuario ?></label>
    <table id="tablaProductos" style="width: 90%;">
        <thead>
          <th>Imagen:</th>
          <th>Nombre Producto:</th>
          <th>Cantidad:</th>
          <th>Precio:</th>
          <th>Acciones:</th>
        </thead>
        <tbody id="tbody">
          <?php

          ?>
        </tbody>
        <div>
            <label for="Comentario"><strong>Comentario: </strong></label> 
            <div id="Comentario">
            <?php

              $row->Comentario;
            ?>
          </div>
        </div>
          
            
         
          
</body>
</html>