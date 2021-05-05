<?php
        session_start();
        if(!isset($_SESSION["usuario"])||($_SESSION['usuario']['ID_Role'] !='3')){
             header("location: http://localhost/php/comun/logout.php");
        }
        include("../../../comun/conexionBD.php");

        $id=$_POST['idUsuario'];
        $nombre=$_POST['nombre'];
        $telefono=$_POST['telefono'];
        $idRole=$_POST['idRole'];

        $productUpdated=$mysqli->query("UPDATE usuario SET Nombre = '$nombre' , Telefono='$telefono', ID_Role=$idRole WHERE ID_Usuario=$id");    
        echo ($mysqli->error);
        if(!$mysqli->error){
            header("location: ../vista/listaUsuarios.html");
        }
        $productUpdated->free();
        $mysqli->close();
?>