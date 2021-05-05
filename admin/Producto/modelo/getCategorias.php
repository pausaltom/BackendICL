<?php
    session_start();
    if(!isset($_SESSION["usuario"])||($_SESSION['usuario']['ID_Role'] =='2')){
         header("location: http://localhost/php/comun/logout.php");
    }
    include("../../../comun/conexionBD.php");
    $result = $mysqli->query("SELECT * from categoria");
    echo ($mysqli->error);
    while ($row = $result->fetch_object()) {
        echo ($row->ID_Categoria . "/" . $row->Categoria . "//");
    }
    $result->free();
    $mysqli->close();
?>