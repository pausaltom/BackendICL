<?php
session_start();
if(!isset($_SESSION["usuario"])) {
    echo("NOSESSION");
}elseif (isset($_SESSION["usuario"]) && ($_SESSION['usuario']['ID_Role'] =='1')) {
    echo("ADMINSESSION");
}elseif (isset($_SESSION["usuario"]) && ($_SESSION['usuario']['ID_Role'] =='2')) {
    echo("USERSESSION");
}elseif (isset($_SESSION["usuario"]) && ($_SESSION['usuario']['ID_Role'] =='3')) {
    echo("SUPERADMINSESSION");
}else{
    echo("error no existe este role");
    session_destroy();
}
?>
