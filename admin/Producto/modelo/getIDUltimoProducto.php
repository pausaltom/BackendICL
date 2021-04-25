<?php
    session_start();
    if(!isset($_SESSION["usuario"])||($_SESSION['usuario']['ID_Role'] =='2')){
         header("location: http://localhost/php/comun/logout.php");
    }
    include("../../../comun/conexionBD.php");

    $result = $mysqli->query("SELECT MAX(ID_Producto) AS ID_Producto from producto");
    echo ($mysqli->error);

    if (mysqli_num_rows($result) != 0) {
        
        $row = $result->fetch_object(); /*LEE ROW Y AVANZA*/
        
        echo ($row->ID_Producto);
        
        $result->free();
        $mysqli->close();
    } else {
        echo ('No existe un producto con este id');
    }

    ?>