<?php
session_start();
if (!isset($_SESSION["usuario"]) || ($_SESSION['usuario']['ID_Role'] != '3')) {
    header("location: http://localhost/php/comun/logout.php");
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $password = $_POST['contrasena'];
    $idRole = $_POST['idRole'];
    include("../../../comun/conexionBD.php");
    $comprobacion = $mysqli->query("SELECT * from usuario WHERE usuario.Email='$email'");
    echo ($mysqli->error);
    if(!empty($comprobacion) && mysqli_num_rows($comprobacion)>0) {
        echo("Este usuario ya existe");
    }else{
        require("../../../comun/encryptcontra.php");
        $sql ="INSERT INTO usuario (Nombre, Telefono, Password, Email, ID_Role) VALUES ('$nombre','$telefono','$passwordCrypt','$email',$idRole)";
        $result = $mysqli->query($sql);
        echo ($mysqli->error);
        if (!$mysqli->error) {
            header("location: ../vista/listaUsuarios.html");   
        }
    $result->free();  
    $mysqli->close();
    }
}
?>
