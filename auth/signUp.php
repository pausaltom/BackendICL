<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sing up page</title>
    <style>
        input:invalid+span:after {
            position: absolute;
            content: '✖';
            padding-left: 5px;
            color: #8b0000;
        }

        input:valid+span:after {
            position: absolute;
            content: '✓';
            padding-left: 5px;
            color: #009000;
        }

        #erroresForm {
            color: #8b0000;
        }
    </style>

</head>

<body>
    <?php
    if (isset($_POST["enviar"])) {

        $email = $_POST['email'];
        $nombre = $_POST["nombre"];
        $telefono = $_POST["telefono"];
        $password = $_POST["password"];

        include("../comun/conexionBD.php");
        $comprobacion = $mysqli->query("SELECT * from usuario WHERE usuario.Email='$email'");
        if (mysqli_num_rows($comprobacion) <= 0) {
            if ($_POST['password'] == $_POST['ConfirmarPassword']) {
                require_once("../comun/encryptcontra.php");
                $result = $mysqli->query("INSERT INTO usuario (Nombre,Telefono,Password,Email) VALUES ('$nombre','$telefono','$passwordCrypt','$email')");
                echo ($mysqli->error);
                session_start();
                $_SESSION['usuario'] = array();
                $_SESSION['usuario']['email'] = $email;
                $_SESSION['usuario']['ID_Role'] = '2';               
                $mysqli->query("UPDATE usuario SET validado=1 WHERE usuario.Email ='$email'");
                echo ($mysqli->error);
                echo ("<div id='Div1'>
                
            <span style='color: green;' >Usuario creado con exito!!</span>
        
            </div> ");
                header("location:../paginaHome.php");
            } else {
                echo ("<div id='Div1'>
                
                    <span style='color: red;' > Las Contraseñas deben ser iguales</span>
                
                </div> ");
            }
        } else {
            echo ("<div id='Div1'>
                
            <span style='color: red;' >Este email ya esta registrado</span>
        
            </div> ");
        }

        echo ($mysqli->error);
        $mysqli->close();
    }
    ?>


    <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST" name="formularioSignUp">
        Nombre de usuario: <input type="text" name="nombre" required></input>
        </br>
        </br>
        Email: <input type="email" name="email" required></input>
        </br>
        </br>
        Contraseña: <input type="password"  id="password" name="password" required></input>
        </br>
        </br>
        Confirmar contraseña: <input type="password"  id="ConfirmarPassword" name="ConfirmarPassword" required></input>
        </br>
        </br>
        Teléfono: <input type="text" name="telefono" required placeholder="xxx-xxx-xxx" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"></input>
        <span class="validity"></span>
        </br>
        </br>
        <input type="checkbox" id="politicas" style="margin-right: 1em;" name="politicas" required></input> He leído y
        acepto la <a href="../politicasdeprivacidad.html">Políticas de Privacidad</a>
        </br>
        <span id="erroresForm" style="color: red;"></span>
        </br>
        <input type="submit" name="enviar"></input>

    </form>




</body>

</html>