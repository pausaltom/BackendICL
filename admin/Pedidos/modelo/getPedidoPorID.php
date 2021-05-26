<?php
    session_start();
    if(!isset($_SESSION["usuario"])||($_SESSION['usuario']['ID_Role'] !='1')){
         header("location: http://localhost/php/comun/logout.php");
    }
    include("../../../comun/conexionBD.php");

    $id=$_GET['idPedido'];

    $result = $mysqli->query("SELECT p.ID_Pedido, p.ID_Estado, e.Estado from (pedido p join estado_pedido e) WHERE p.ID_Estado=e.ID_Estado AND ID_Pedido=$id");
    echo ($mysqli->error);

    if (mysqli_num_rows($result) != 0) {
        $row = $result->fetch_object(); /*LEE ROW Y AVANZA*/

        echo ($row->ID_Pedido . "/" . $row->ID_Estado . "/" . $row->Estado );

        $result->free();
        $mysqli->close();
    } else {
        echo ('No existe un pedido con este id');
    }

    ?>