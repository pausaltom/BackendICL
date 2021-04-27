<?php

session_start();
if (!isset($_SESSION["usuario"]) || ($_SESSION['usuario']['ID_Role'] == '2')) {
    header("location: http://localhost/php/comun/logout.php");
}

    if (isset($_POST['nombreProducto']) || isset($_POST['precioProducto'])) {
       $nombre = $_POST['nombreProducto'];
       $precio = $_POST['precioProducto'];
       $categoria = $_POST['categoriaProducto'];
    }
   
    include("../../../comun/conexionBD.php");
    
    
    $result = $mysqli->query("SELECT * from producto WHERE Nombre LIKE '$nombre'");
    echo ($mysqli->error);

    if (mysqli_num_rows($result) != 0) {
            echo ('Ya existe un Producto con este Nombre/1');
    } else {
            if ($nombre == ""||$precio=="") {
               echo "Faltan campos por rellenar/2";
            }else{
               echo "Producto válido/0"; 
            }
            
    }
        $result->free();
        $mysqli->close();
    
?>
