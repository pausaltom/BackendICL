<?php
    session_start();
    if(!isset($_SESSION["usuario"])||($_SESSION['usuario']['ID_Role'] =='2')){
         header("location: http://localhost/php/comun/logout.php");
    }
    include("../../../comun/conexionBD.php");

    $id=$_GET['idProducto'];

    $result = $mysqli->query("SELECT * from producto WHERE ID_Producto=$id");
    echo ($mysqli->error);

    if (mysqli_num_rows($result) != 0) {
        $row = $result->fetch_object(); /*LEE ROW Y AVANZA*/

        echo ($row->img . "/" . $row->Nombre . "/" . $row->Precio );

        $result->free();
        $mysqli->close();
    } else {
        echo ('No existe un producto con este id');
    }

    ?>