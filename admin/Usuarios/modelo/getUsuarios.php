<?php

    session_start();
    if(!isset($_SESSION["usuario"])||($_SESSION['usuario']['ID_Role'] =='2')){
        header("location: http://localhost/php/comun/logout.php");
    }

    include("../../../comun/conexionBD.php");

    
    $registrosPorPag=5;
    
    
    $pagina=$_GET["pagina"];
        
    

    $empezar_desde = ($pagina-1) * $registrosPorPag;
    
    $result = $mysqli->query("SELECT * from usuario");
    echo ($mysqli->error);

    $numRegistros = mysqli_num_rows($result);

    $total_paginas=ceil($numRegistros/$registrosPorPag);

    $resultPagianado = $mysqli->query("SELECT u.ID_Usuario, u.Nombre, u.Telefono, u.Email, u.Direccion , r.Roles from usuario u,roles r WHERE u.ID_Role = r.ID_Roles LIMIT $empezar_desde,$registrosPorPag");
    while ($row = $resultPagianado->fetch_object()) {
        echo ($row->ID_Usuario . " /--/ " . $row->Nombre ." /--/ ".$row->Telefono . " /--/ ".$row->Email . " /--/ ".$row->Direccion . " /--/ ".$row->Roles . "__//");
    }
    echo("#");
    echo($total_paginas);

   
    
    $result->free();
    $mysqli->close();
?>