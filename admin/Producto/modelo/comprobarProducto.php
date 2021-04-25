<?php
    session_start();
    if(!isset($_SESSION["usuario"])||($_SESSION['usuario']['ID_Role'] =='2')){
         header("location: http://localhost/php/comun/logout.php");
    }
    
$nombre=$_POST['nombreProducto'];
    //if (isset($nombre)) {
        echo "  ". $nombre;
    
    include("../../../comun/conexionBD.php");
    $result = $mysqli->query("SELECT * from producto WHERE Nombre LIKE'$nombre'");
    echo ($mysqli->error);
    
    if (mysqli_num_rows($result) != 0) {
       
        echo "Producto válido";
        
    } else {
        echo ('Ya existe un Producto con este Nombre');
    }
        $result->free();
        $mysqli->close();
    ?>