<?php
session_start();
if (!isset($_SESSION["usuario"])) {
    header("location: http://localhost/php/auth/login.html");
}
include("../../comun/conexionBD.php");
$idProvincia = $_GET['idProvincia'];

$result = $mysqli->query("SELECT * from municipio WHERE municipio.ID_Provincia=$idProvincia");
echo ($mysqli->error);

while ($row = $result->fetch_object()) {
    echo ($row->ID_Municipio . " / " . $row->Municipio . " / " . $row->ID_Provincia . "//");
}

$result->free();
$mysqli->close();
?>