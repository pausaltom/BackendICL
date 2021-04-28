<?php 
session_start();
if (!isset($_SESSION["usuario"]) || ($_SESSION['usuario']['ID_Role']=='2')) {
    header("location: http://localhost/php/auth/login.html");
}

 $nombre_imagen= $_FILES['imagen']['name'];
 $tipo_imagen=$_FILES['imagen']['type'];
 $tamano_imagen=$_FILES['imagen']['size'];

//     $archivo = $_FILES["archivo"];
// $resultado = move_uploaded_file($archivo["tmp_name"], $archivo["name"]);
// if ($resultado) {
//     echo "Subido con éxito";
// } else {
//     echo "Error al subir archivo";
// }
    // $imagen = $_FILES["imagen"];
    // $nombre_imagen=$imagen["name"];
    // $tipo_imagen=$imagen["type"];
    // $tamano_imagen=$imagen["size"];
    if ($tamano_imagen<=1000000) {
        if ($tipo_imagen=="image/jpeg" || $tipo_imagen=="image/jpg"||$tipo_imagen=="image/png"||$tipo_imagen=="image/gif"
        ||$tipo_imagen=="image/tiff"||$tipo_imagen=="image/psd"||$tipo_imagen=="image/jfif") {
            
            //ruta de la carpeta donde iran las imagenes
             $carpeta_servidor=$_SERVER['DOCUMENT_ROOT']. '/php/uploads/';
             move_uploaded_file($_FILES['imagen']['tmp_name'],$carpeta_servidor.$nombre_imagen);        
            
             echo($nombre_imagen."/0");    
            
         }else{
         echo "el formato o extensión del archivo no esta permitido, solo se pueden subir imágenes/1";
         }
    }else{
        echo "el tamaño de la imagen es demasiado grande/2";
    }

?>