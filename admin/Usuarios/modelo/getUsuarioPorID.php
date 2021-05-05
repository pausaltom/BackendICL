<?php
    session_start();
    if(!isset($_SESSION["usuario"])||($_SESSION['usuario']['ID_Role'] !='3')){
         header("location: http://localhost/php/comun/logout.php");
    }
    include("../../../comun/conexionBD.php");

    $id=$_GET['id'];

    $result = $mysqli->query("SELECT * from usuario WHERE ID_Usuario=$id");
    echo ($mysqli->error);

    if (mysqli_num_rows($result) != 0) {
        $row = $result->fetch_object(); /*LEE ROW Y AVANZA*/

        echo ($row->Nombre . "/" . $row->Email . "/" . $row->Telefono."/".$row->ID_Role);

        $result->free();
        $mysqli->close();
    } else {
        echo ('No existe un producto con este id');
    }

    ?>