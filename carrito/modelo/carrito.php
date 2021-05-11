<?php

if(!isset($_SESSION['Carrito'])){ 
    $_SESSION['Carrito']=array(); 
} 
include("../../comun/conexionBD.php");
$id=$_POST['idProducto'];
$cantidad=$_POST['cantidad'];

$result = $mysqli->query("SELECT * from producto WHERE ID_Producto=$id");
echo ($mysqli->error);

if (mysqli_num_rows($result) != 0) {
    $row = $result->fetch_object(); /*LEE ROW Y AVANZA*/

    //echo ($row->img . "/" . $row->Nombre . "/" . $cantidad . "/" . ($row->Precio)*$cantidad);

    /*Añadimos el producto a la sesion 'Carrito'*/ 
    $producto = array( 
                        'ID' => $id, 
                        'Nombre' => $row->Nombre, 
                        'Cantidad' => $cantidad, 
                        'PrecioTotal' => ($row->Precio)*$cantidad 
                    ); 
    $_SESSION['Carrito']['producto']=$producto; 
    
    print_r($_SESSION['Carrito']);
    $result->free();
    $mysqli->close();
} else {
    echo ('No existe un producto con este id');
}

    
?>