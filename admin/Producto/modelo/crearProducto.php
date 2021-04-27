<?php
        session_start();
        if(!isset($_SESSION["usuario"])||($_SESSION['usuario']['ID_Role'] =='2')){
             header("location: http://localhost/php/comun/logout.php");
        }
        include("../../../comun/conexionBD.php");

        $imagen=$_POST['imagen'];
        $nombreProducto=$_POST['nombreProducto'];
        $precioProducto=$_POST['precioProducto'];
        $categoriaProducto = $_POST['categoria'];

        
        $result=$mysqli->query("INSERT INTO producto (Nombre,Precio,img,ID_Categoria) VALUES ('$nombreProducto','$precioProducto','$imagen','$categoriaProducto')");    
        echo ($mysqli->error);
        if(!$mysqli->error){
            header("location: ../../../Productos/vista/listaProductos.html");
        }
        $mysqli->close();
?>