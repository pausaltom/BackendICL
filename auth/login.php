<?php
//if ($_SERVER['REQUEST_METHOD'] == 'POST') {

// $email = mysqli_real_escape_string($mysqli, $_POST['email']);
//$password = mysqli_real_escape_string($mysqli, $_POST['contra']);

//$passwordS = htmlspecialchars($password, $flags = ENT_COMPAT | ENT_HTML401, $encoding = ini_get("default_charset"), $double_encode = true);

if(isset($_POST['contra']) && isset($_POST['email'])){
    $password = $_POST['contra'];
    $email = $_POST['email'];
}
include("../comun/conexionBD.php");
$comprobacion = $mysqli->query("SELECT * from usuario WHERE usuario.Email='$email'");
echo ($mysqli->error);
$row = $comprobacion->fetch_object();
$passwordHash=$row->Password;
if (mysqli_num_rows($comprobacion) <= 0) {
    echo ("Login no existe o Contraseña incorrecta");
    header("location:login.html");
}else{
    
    echo "password: ".$password."Row: ".$passwordHash;
    if(password_verify($password,$passwordHash)) {
        echo "password: ".$password."Row: ".$passwordHash;
        echo ("Usuario: " . $row->Nombre . " conectado");
        $RoleUsuActive = $row->ID_Role;
        session_start();
        $_SESSION['usuario'] = array();
        $_SESSION['usuario']['email'] = $email;
        $_SESSION['usuario']['ID_Role'] = $RoleUsuActive;
        $mysqli->query("UPDATE usuario SET Validado=1 WHERE usuario.Email ='$email'");
        echo ($mysqli->error);
        header("location:../paginaHome.php");
    }else{
    echo ("contraseña incorrecta"/* . $email ." ". $password ." hh " . $password . " fdfd " . $row->Password*/);
        //header("location:login.html");
    }

}
//$comprobacion->free();
$mysqli->close();
//}
?>
