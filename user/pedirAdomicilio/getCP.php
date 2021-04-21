<?php
session_start();
if (!isset($_SESSION["usuario"])) {
    header("location: http://localhost/php/auth/login.html");
}
include("../../comun/conexionBD.php");
$idMunicipio = $_GET['Municipio'];

$result = $mysqli->query("SELECT * FROM cp WHERE cp.ID_Municipio = '$idMunicipio'");
echo ($mysqli->error);


while ($row = $result->fetch_object()) {
    echo ($row->CP . " / " . $row->ID_Municipio . "//");
}

$result->free();
$mysqli->close();
?>