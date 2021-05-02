<?php
         session_start();
         if(!isset($_SESSION["usuario"])){
             header("location: http://localhost/php/auth/login.html");
         }
        
        $idString = $_POST['iduser'];
        echo $idString."\n";
        $id = intval($idString);
        echo $id;
        $nombre=$_POST['nombre'];
        $password=$_POST['contraDefinitiva'];
        $email=$_POST['email'];
        $telefono=$_POST['telefono'];
        include("../../../comun/conexionBD.php");
        $usuarioUpdated=$mysqli->query("UPDATE usuario SET Nombre = '$nombre' , Telefono = '$telefono' , Password = '$password' , Email = '$email' WHERE ID_Usuario=$id");    
        echo ($mysqli->error);
        if(mysqli_num_rows($usuarioUpdated)!==0){
            echo("Cambios guardados/0");
        }else{
            echo("Datos no válidos/1");
        }
        $usuarioUpdated->free();
        $mysqli->close();
    
?>
