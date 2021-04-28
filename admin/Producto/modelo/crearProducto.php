<?php
        session_start();
        if(!isset($_SESSION["usuario"])||($_SESSION['usuario']['ID_Role'] =='2')){
             header("location: http://localhost/php/comun/logout.php");
        }

        if($_SERVER['REQUEST_METHOD']=='POST'){
        $nombreProducto=$_POST['nombreProducto'];
        $precioProducto=$_POST['precioProducto'];
        $imagen=$_POST['imagen'];
        $categoriaProducto = $_POST['IDcategoria'];
        
        include("../../../comun/conexionBD.php");

        $sql = "INSERT INTO producto (Nombre, Precio, img, ID_Categoria) VALUES ('$nombreProducto',$precioProducto,'$imagen',$categoriaProducto)";
        $result=$mysqli->query($sql);  
        echo ($mysqli->error);       
        if(!$mysqli->error){
            header("location: ../../../Productos/vista/listaProductos.html"); 
            $mysqli->close();    

        }
    }
?>