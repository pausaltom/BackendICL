<?php
session_start();
if (!isset($_SESSION["usuario"]) || ($_SESSION['usuario']['ID_Role'] != '3')) {
    header("location: http://localhost/php/comun/logout.php");
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $idRole = $_POST['idRole'];

    include("../../../comun/conexionBD.php");

    $sql = "INSERT INTO usuario (Nombre, Telefono, Email, ID_Role) VALUES ('$nombre','$telefono','$email',$idRole)";
    $result = $mysqli->query($sql);
    echo ($mysqli->error);
    if (!$mysqli->error) {
        header("location: ../vista/listaUsuarios.html");
        $mysqli->close();
    }
}
?>
