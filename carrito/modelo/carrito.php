<?php
session_start();

$id=$_POST['idProducto'];
$cantidad=$_POST['cantidad'];
include("../../comun/conexionBD.php");
$result = $mysqli->query("SELECT * from producto WHERE ID_Producto='$id'");
echo ($mysqli->error);

if (mysqli_num_rows($result) != 0) {
    $row = $result->fetch_object(); /*LEE ROW Y AVANZA*/

    //echo ($row->img . "/" . $row->Nombre . "/" . $cantidad . "/" . ($row->Precio)*$cantidad);

    if(!isset($_SESSION['Carrito'])){ 
      /*Añadimos el producto a la sesion 'Carrito'*/ 
    $producto = array(  'ID' => $id,
                        'Imagen'=>$row->img, 
                        'Nombre' => $row->Nombre, 
                        'Cantidad' => $cantidad, 
                        'Precio' => $row->Precio
                    ); 
    $_SESSION['Carrito'][0]=$producto;  
    }else{
        $carritolength =count($_SESSION['Carrito']);
        /*Añadimos el producto a la sesion 'Carrito'*/ 
    $producto = array(  'ID' => $id,
    'Imagen'=>$row->img, 
    'Nombre' => $row->Nombre, 
    'Cantidad' => $cantidad, 
    'Precio' => $row->Precio
    ); 
    $_SESSION['Carrito'][]=$producto; 
    }
    
    echo $row->Nombre."#";
    print_r($_SESSION['Carrito']);
    
    $result->free();
    $mysqli->close();
} else {
    echo ('No existe un producto con este id');
}

?>