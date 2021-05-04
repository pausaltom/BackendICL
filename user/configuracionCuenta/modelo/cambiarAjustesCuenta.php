<?php
         session_start();
         if(!isset($_SESSION["usuario"])){
             header("location: http://localhost/php/auth/login.html");
         }
         if($_SERVER['REQUEST_METHOD']=='POST'){
        $id = $_POST['iduser'];
        $nombre=$_POST['nombre'];
        $password=$_POST['contraDefinitiva'];
        $passwordCrypt= password_hash($password, PASSWORD_DEFAULT);
        $email=$_POST['email'];
        $telefono=$_POST['telefono'];
        include("../../../comun/conexionBD.php");
        $usuarioUpdated=$mysqli->query("UPDATE usuario SET Nombre = '$nombre' , Telefono = '$telefono' , Password = '$passwordCrypt' , Email = '$email' WHERE ID_Usuario=$id");    
        echo ($mysqli->error);
        if(!$mysqli->error){
            echo("Cambios guardados/0");
        }else{
            echo("Datos no válidos/1");
        }
        
        
        $mysqli->close();
        }
?>
