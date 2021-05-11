<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="../controlador/carrito.js"></script>
  <title>Carrito de la compra</title>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    table {
      width: 80%;
    }

    td {
      text-align: center;
    }
  </style>
</head>
<body>
  <?php
    session_start();
  
  ?>
  <table id="tablaProductos" style="width: 90%;">
    <thead>
      <th>Imagen:</th>
      <th>Nombre Producto:</th>
      <th>Cantidad:</th>
      <th>Precio Total:</th>
      <th>Acciones:</th>
    </thead>
    <tbody id="tbody">
      <?php
      
      if(isset($_SESSION['Carrito'])) {
        foreach ($_SESSION['Carrito'] as $i => $producto) {
      ?>
          <tr>
            <td><img src="<?php echo "/php/uploads/" . $producto['Imagen']; ?>" width="70px" alt="Imagen Producto"></td>
            <td><?php echo $producto['Nombre']; ?></td>
            <td><?php echo $producto['Cantidad']; ?></td>
            <td><?php echo $producto['PrecioTotal']; ?></td>
            <td><?php echo "<a href='mostrarCarrito.php?item=$i'>Eliminar</a>"?></td>
          </tr>
        <?php

        }
        if(isset($_GET['item'])) {
          $producto = $_GET['item'];
          echo "<script>alert('$producto')</script>";
        }
        ?>
        <button onclick="seguro()">Vaciar Carrito</button>
        <script>
          function seguro() {
            var sino = confirm('estas seguro que quieres vaciar el carrito');
            if (sino == true) {
              <?php  ?>
              window.location = "../../Productos/vista/listaProductos.html";
            } else {
            }

          }
        </script>
      <?php
      } else {
        
      ?>
        <script>
          alert("el carrito esta vacío");
          window.location = "../../Productos/vista/listaProductos.html";
        </script>
      <?php

      }
      ?>
    </tbody>
  </table>
</body>

</html>