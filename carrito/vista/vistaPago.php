<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resumen Pago</title>
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
      $verPedido=$mysqli->query("SELECT p.ID_Pedido as ID_Pedido,p.Comentario,p.Activo,u.Nombre,p.PrecioTotal,p.Hora,e.Estado,u.Direccion,u.Telefono FROM pedido p, usuario u, estado_pedido e WHERE(p.ID_Usuario=u.ID_Usuario AND p.ID_Estado=e.ID_Estado) AND(p.Activo=1)");
      $row = $verPedido->fetch_object(); 
    ?>
    <label for="tablaProductos"><?php echo "P0000".$row->ID_Pedido ?></label>
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
              $lineasPedido= $mysqli->query("SELECT * from linea_pedido WHERE ID_Pedido=$row->ID_Pedido");
              
              while($productos=$lineasPedido->fetch_object()) {
            ?>
                <tr>
                  <td><img src="<?php echo "/php/uploads/" . $producto['Imagen']; ?>" width="70px" alt="Imagen Producto"></td>
                  <td><?php echo $producto['Nombre']; ?></td>
                  <td><?php echo $producto['Cantidad']; ?></td>
                  <td><?php echo $producto['Precio']; ?>€</td>
                  <td><?php echo "<a href='mostrarCarrito.php?item=$i'>Eliminar</a>"?></td>
                </tr>
            <?php
              }  
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