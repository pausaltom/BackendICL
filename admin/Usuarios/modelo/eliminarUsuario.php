<?php
        session_start();
        if(!isset($_SESSION["usuario"])||($_SESSION['usuario']['ID_Role'] !='3')){
             header("location: http://localhost/php/comun/logout.php");
        }
        include("../../../comun/conexionBD.php");
        $id=$_GET['idUser'];
        $userEmail=$_SESSION['usuario'];
        $usuarioUpdated=$mysqli->query("DELETE FROM usuario WHERE usuario.ID_Usuario=$id");    
        echo ($mysqli->error);
        if(!$mysqli->error){
            header("location: ../vista/listaUsuarios.html");
        }
        $mysqli->close();
?>