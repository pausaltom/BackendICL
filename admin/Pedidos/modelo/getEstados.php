<?php
    session_start();
    if(!isset($_SESSION["usuario"])||($_SESSION['usuario']['ID_Role'] !='1')){
        header("location: http://localhost/php/comun/logout.php");
    }
    include("../../../comun/conexionBD.php");
    $result = $mysqli->query("SELECT * from estado_pedido");
    echo ($mysqli->error);
    while ($row = $result->fetch_object()) {
        echo ($row->ID_Estado . "/" . $row->Estado . "//");
    }
    $result->free();
    $mysqli->close();
?>