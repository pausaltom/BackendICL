<?php
session_start();
if (!isset($_SESSION["usuario"])) {
    header("location: http://localhost/php/auth/login.html");
} else {
    include("../../comun/conexionBD.php");
    $result = $mysqli->query("SELECT * from provincia");
    echo ($mysqli->error);

    while ($row = $result->fetch_object()) {
        echo ($row->ID_Provincia . " / " . $row->Provincia . "//");
    }

    $result->free();
    $mysqli->close();
}

?>