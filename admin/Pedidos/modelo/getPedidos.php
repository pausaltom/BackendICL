<?php

    include("../../../comun/conexionBD.php");

    
    $registrosPorPag=5;
    
    
    $pagina=$_GET["pagina"];

    $empezar_desde = ($pagina-1) * $registrosPorPag;
    
    $result = $mysqli->query("SELECT * from pedido");
    echo ($mysqli->error);

    $numRegistros = mysqli_num_rows($result);

    $total_paginas=ceil($numRegistros/$registrosPorPag);

    $resultPagianado = $mysqli->query("SELECT p.ID_Pedido AS ID_Pedido, u.Nombre AS Nombre, u.Telefono AS Telefono, u.Direccion AS Direccion, p.Comentario AS Comentario, p.PrecioTotal AS PrecioTotal, p.Hora AS Hora, e.Estado AS Estado, p.ID_Estado AS ID_Estado, p.Activo AS Activo FROM ((pedido p join usuario u) join estado_pedido e) WHERE p.ID_Usuario = u.ID_Usuario AND p.ID_Estado = e.ID_Estado ORDER BY p.Activo DESC,p.Hora ASC LIMIT $empezar_desde,$registrosPorPag");
    while ($row = $resultPagianado->fetch_object()) {
        echo ($row->ID_Pedido . "/__".$row->Nombre. "/__" . $row->Telefono ."/__" . $row->Direccion ."/__" . $row->Comentario ."/__".$row->PrecioTotal . "/__".$row->Hora. "/__".$row->Estado. "/__".$row->ID_Estado. "/__".$row->Activo . "//");
    }
    echo("#");
    echo($total_paginas);

   
    
    $result->free();
    $mysqli->close();
?>