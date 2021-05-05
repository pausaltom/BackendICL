<?php
$email = $_POST['email'];
$password = $_POST['password'];


// $email = mysqli_real_escape_string($mysqli, $_POST['email']);
// $passwordS = mysqli_real_escape_string($mysqli, $_POST['password']);

//$passwordS = htmlspecialchars($password, $flags = ENT_COMPAT | ENT_HTML401, $encoding = ini_get("default_charset"), $double_encode = true);
include("../comun/conexionBD.php");
$comprobacion = $mysqli->query("SELECT * from usuario WHERE usuario.Email='$email'");
echo ($mysqli->error);
if (mysqli_num_rows($comprobacion) <= 0) {
    echo ("Login no existe o Contraseña incorrecta");
    header("location:login.html");
} else {
    $row = $comprobacion->fetch_object();
    if (password_verify($password, $row->Password)) {
        echo ("Usuario: " . $row->Nombre . " conectado");
        $RoleUsuActive = $row->ID_Role;
        session_start();
        $_SESSION['usuario'] = array();
        $_SESSION['usuario']['email'] = $email;
        $_SESSION['usuario']['ID_Role'] = $RoleUsuActive;
        $mysqli->query("UPDATE usuario SET Validado=1 WHERE usuario.Email ='$email'");
        echo ($mysqli->error);
        header("location:../paginaHome.php");
    } else {
    echo ("contraseña incorrecta"/* . $email ." ". $password ." hh " . $password . " fdfd " . $row->Password*/);
        header("location:login.html");
    }
}
$mysqli->close();
?>
