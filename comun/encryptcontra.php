<?php
         session_start();
         if(!isset($_SESSION["usuario"])){
             header("location: http://localhost/php/auth/login.html");
         }
        
        $password=$_POST['contra'];
        $passwordCrypt= password_hash($password,PASSWORD_DEFAULT);
        echo $passwordCrypt;
?>
