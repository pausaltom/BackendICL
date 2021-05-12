<?php

    session_start();
    if(!isset($_SESSION["usuario"])){
        header("location: http://localhost/php/auth/login.html");
    }
    include("../../comun/conexionBD.php");
    $resultado = $mysqli->query("SELECT * from usuario where Email='$email'");



?>