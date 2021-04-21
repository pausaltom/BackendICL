<?php

    include("../../comun/conexionBD.php");

    $result = $mysqli->query("SELECT * from producto");
    echo ($mysqli->error);
    while ($row = $result->fetch_object()) {
        echo ($row->ID_Producto . " / " . $row->img ." / ".$row->Nombre . " / ".$row->Precio . "//");
    }
    

   
    
    $result->free();
    $mysqli->close();
?>