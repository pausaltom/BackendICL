<?php 
session_start();
if (!isset($_SESSION["usuario"]) || ($_SESSION['usuario']['ID_Role']=='2')) {
    header("location: http://localhost/php/auth/login.html");
}

    $idProduct = $_POST['idProducto'];
    $nombre_imagen= $_FILES['imagen']['name'];

    $tipo_imagen=$_FILES['imagen']['type'];

    $tamano_imagen=$_FILES['imagen']['size'];

    if ($tamano_imagen<=1000000) {
        if ($tipo_imagen=="image/jpeg" || $tipo_imagen=="image/jpg"||$tipo_imagen=="image/png"||$tipo_imagen=="image/gif"
        ||$tipo_imagen=="image/tiff"||$tipo_imagen=="image/psd"||$tipo_imagen=="image/jfif") {
            
            //ruta de la carpeta donde iran las imagenes
             $carpeta_servidor=$_SERVER['DOCUMENT_ROOT']. '/php/uploads/';

            move_uploaded_file($_FILES['imagen']['tmp_name'],$carpeta_servidor.$nombre_imagen);
            include("conexionBD.php");

            $result = $mysqli->query("UPDATE producto SET img='$nombre_imagen' WHERE ID_Producto=$idProduct");
            echo ($mysqli->error);
            $mysqli->close();
            header('Location:' . getenv('HTTP_REFERER'));
         }else{
         echo "el formato o extensión del archivo no esta permitido, solo se pueden subir imágenes";
         }
    }else{
        echo "el tamaño de la imagen es demasiado grande";
    }
    
    

    

    
    


?>