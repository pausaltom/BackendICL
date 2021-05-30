<?php

session_start();
if (!isset($_SESSION["usuario"])) {
    header("location: http://localhost/php/auth/logout.php");
}
include("../../comun/conexionBD.php");

$email = $_SESSION["usuario"]["email"];
$result = $mysqli->query("SELECT * from usuario where Email='$email'");
echo ($mysqli->error);
$row = $result->fetch_object();

if($row->Direccion != null){
    echo("Pasar a pagar/1");
}else{
    echo("Usted debe introducir una Dirección antes de poder realizar un pedido/0");
}
$result->free();
$mysqli->close();
?>
