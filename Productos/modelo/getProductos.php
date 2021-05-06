<?php

    include("../../comun/conexionBD.php");

    
    $registrosPorPag=4;
    
    
    $pagina=$_GET["pagina"];
        
    

    $empezar_desde = ($pagina-1) * $registrosPorPag;
    
    $result = $mysqli->query("SELECT * from producto");
    echo ($mysqli->error);

    $numRegistros = mysqli_num_rows($result);

    $total_paginas=ceil($numRegistros/$registrosPorPag);

    $resultPagianado = $mysqli->query("SELECT * from producto LIMIT $empezar_desde,$registrosPorPag");
    while ($row = $resultPagianado->fetch_object()) {
        echo ($row->ID_Producto . " / " . $row->img ." / ".$row->Nombre . " / ".$row->Precio . "//");
    }
    echo("#");
    echo($total_paginas);

   
    
    $result->free();
    $mysqli->close();
?>