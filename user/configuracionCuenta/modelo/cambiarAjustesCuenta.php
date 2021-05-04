<?php
         session_start();
         if(!isset($_SESSION["usuario"])){
             header("location: http://localhost/php/auth/login.html");
         }
        if($_SERVER['REQUEST_METHOD']=='POST'){
        $id = $_POST['iduser'];
        $nombre=$_POST['nombre'];
        $password=$_POST['contraDefinitiva'];
        $email=$_POST['email'];
        $telefono=$_POST['telefono'];
        include("../../../comun/conexionBD.php");
        if(str_contains("$password","$")) {
            $sql="UPDATE usuario SET Nombre = '$nombre' , Telefono = '$telefono', Email = '$email' WHERE ID_Usuario LIKE $id";
        }else{
            $passwordCrypt= password_hash($password,PASSWORD_DEFAULT);
            $sql="UPDATE usuario SET Nombre = '$nombre' , Telefono = '$telefono' , Password = '$passwordCrypt' , Email = '$email' WHERE ID_Usuario LIKE $id";
        }
        $usuarioUpdated=$mysqli->query($sql);    
        echo ($mysqli->error);
        if(!$mysqli->error){
            echo("Cambios guardados/0");
        }else{
            echo("Datos no válidos/1");
        }
        $mysqli->close();
        }
?>
