<?php

if(!isset($_SESSION['Carrito'])){ 
    $_SESSION['Carrito']=array(); 
} 
include("../../comun/conexionBD.php");
$id=$_GET['idProducto'];
$cantidad=$_GET['cantidad'];

$result = $mysqli->query("SELECT * from producto WHERE ID_Producto=$id");
echo ($mysqli->error);

if (mysqli_num_rows($result) != 0) {
    $row = $result->fetch_object(); /*LEE ROW Y AVANZA*/

    echo ($row->img . "/" . $row->Nombre . "/" . $row->Precio );

    /*Añadimos el producto a la sesion 'Carrito'*/ 
    $producto = array( 
                        'ID' => $id, 
                        'Nombre' => $row->Nombre, 
                        'QUANTITY' => $cantidad, 
                        'PRICE' => $row->Precio 
                    ); 
    $_SESSION['Carrito'][]=$producto; 
    $result->free();
    $mysqli->close();
} else {
    echo ('No existe un producto con este id');
}

    
?>