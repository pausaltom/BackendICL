<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedir a domicilio</title>
    <script type="text/javascript" src="javascriptDireccion.js"></script>
</head>

<body>
    <script type="text/javascript">
        window.addEventListener("load", loadEvents);
    </script>
    <?php
    session_start();
    if (!isset($_SESSION["usuario"])) {
        header("location: http://localhost/php/auth/login.html");
    }
    
    ?>
    <!-- Selects prov muni cp-->

    <div>
        <label for="provincia">Provincia*: </label>
        <select id="provincia" required>
            <option id="optProv">Selecione una provincia</option>
        </select>

    </div>
    <div>
        <label for="municipio">Municipio*: </label>
        <select id="municipio" required>
            <option id="optMun" value="">Selecione un municipio</option>
        </select>

    </div>
    <div>
        <label for="cp">Cp*: </label>
        <select id="cp" required>
            <option id="optCp" value="">Selecione un código postal</option>
        </select>

    </div>
    <!-- Inputs -->
    <div>
        <label for="Direccion">Dirección*: </label>
        <input id="Direccion" type="text" placeholder="Ej:c/Ramón turró"></input>
    </div>
    <div>
        <label for="Numero">Número*: </label>
        <input id="Numero" type="number" placeholder="Ej:5"></input>
    </div>
    <div>
        <label for="Piso">Piso: </label>
        <input id="Piso" type="text" placeholder=""></input>
    </div>
    <div>
        <label for="Bloque">Bloque: </label>
        <input id="Bloque"  type="text" placeholder=""></input>
    </div>
    <div>
        <label for="Puerta">Puerta: </label>
        <input id="Puerta" type="text" placeholder=""></input>
    </div>
    <div>
        <label for="Escalera">Escalera: </label>
        <input id="Escalera" type="text" placeholder=""></input>
    </div>

    <p style="color: rgb(112, 112, 112);">*Los campos marcados con un * son necesarios</p>

    <div style="width: 300px; height: auto; text-align: left;">
        <p id="errormsg"></p>
    </div>
    <input type="button" value="Enviar" id="botonEnviar"></input>

</body>

</html>