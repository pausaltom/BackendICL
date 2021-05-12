<?php
         session_start();
         if(!isset($_SESSION["usuario"])){
             header("location: http://localhost/php/auth/login.html");
         }
         include("../../comun/conexionBD.php");

        $userDireccion=addslashes($_GET['userDireccion']);
        
        $userEmail=$_SESSION['usuario']['email'];
        $usuarioUpdated=$mysqli->query("UPDATE usuario SET Direccion='$userDireccion' WHERE usuario.Email='$userEmail'");    
        echo ($mysqli->error);
        if(!$mysqli->error){
            header("location: ../../paginaHome.php");
        }
        
        $mysqli->close();
    ?>