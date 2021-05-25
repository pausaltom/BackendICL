<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pizzeria Girona</title>
    
</head>

<body>
    <?php
        session_start();
        if(!isset($_SESSION["usuario"])){
            header("location: http://localhost/php/auth/logout.php");
        }
    ?>
    <h1>Bienvenidos a la mejor Pizzeria</h1>

    <p>Si estas aqui es porqué ya estas registrado</p>
    <p><a href="user/pedirAdomicilio/direccion.php">Introducir Dirección</a></p>
    <p><a href="Productos/vista/listaProductos.html">Productos</a></p>
    <p><a href="user/configuracionCuenta/vista/ajustesCuenta.html">Cambiar Ajustes</a></p>
    <?php
         if($_SESSION['usuario']['ID_Role'] =='3'||$_SESSION['usuario']['ID_Role'] =='1'){
             ?>
             <p><a href="admin/Usuarios/vista/listaUsuarios.html">Lista Usuarios</a></p>
             <?php
         }
    ?>
    <?php
         if($_SESSION['usuario']['ID_Role'] =='1'){
             ?>
             <p><a href="admin/Pedidos/vista/listaPedidos.html">Lista Pedidos</a></p>
             <?php
         }
    ?>
    <p><a href="comun/logout.php">Cerrar Sessión</a></p>
</body>

</html>