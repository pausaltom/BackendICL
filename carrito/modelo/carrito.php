<?php
session_start();
if($_SERVER['REQUEST_METHOD']=='POST'){
$id=$_POST['idProducto'];
$cantidad=$_POST['cantidad'];
include("../../comun/conexionBD.php");
$result = $mysqli->query("SELECT * from producto WHERE ID_Producto='$id'");
echo ($mysqli->error);

if (mysqli_num_rows($result) != 0) {
    $row = $result->fetch_object(); /*LEE ROW Y AVANZA*/

    //echo ($row->img . "/" . $row->Nombre . "/" . $cantidad . "/" . ($row->Precio)*$cantidad);
    echo ($row->Nombre."#".$cantidad."/0");
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
    
    
    //print_r($_SESSION['Carrito']);
    
    $result->free();
    $mysqli->close();
} else {
    echo ('No existe un producto con este id/1');
}
}
?>