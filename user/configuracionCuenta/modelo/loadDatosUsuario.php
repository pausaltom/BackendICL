<?php
         session_start();
         if(!isset($_SESSION["usuario"])){
             header("location: http://localhost/php/auth/login.html");
         }

        include("../../../comun/conexionBD.php");
        $userEmail=$_SESSION['usuario']['email'];

        $datosUsuario=$mysqli->query("SELECT * from usuario WHERE usuario.Email='$userEmail'");    
        echo ($mysqli->error);
        if(!$mysqli->error){
            $row = $datosUsuario->fetch_object();
            echo $row->Nombre."/%//".$row->Telefono."/%//".$row->Password."/%//".$row->ID_Usuario;
        }
        //.$row->Email."/%//"
        $mysqli->close();
?>