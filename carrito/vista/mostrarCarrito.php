<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- <script src="../controlador/carrito.js"></script> -->
  <title>Carrito de la compra</title>
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
?>
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

      if(isset($_SESSION["Carrito"])) {
        $subTotal =0;
        foreach ($_SESSION["Carrito"] as $i => $producto) {
          $subTotal +=  ($producto['Precio']*$producto['Cantidad']);
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
       if(isset($_REQUEST['item'])) {
          $producto = $_REQUEST['item'];
          unset($_SESSION["Carrito"][$producto]);
          echo "<script>alert('Se elimino correctamente el producto')</script>";
          header("location: mostrarCarrito.php");
        }
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
  <div>
    <strong>El precio total del pedido es: <?php echo $subTotal?>€</strong>
  </div>
  <a style="margin-right: 5px;" href="../../Productos/vista/listaProductos.html">Volver</a>
  <a href="../modelo/vaciarCarritoTodo.php">Vaciar Carrito</a>
  <a href="../modelo/pagar.php">Pagar</a>
        
</body>

</html>