<?php
    session_start();
    if(!isset($_SESSION["usuario"])){
        header("location: http://localhost/php/auth/login.html");
    }
    include("../../comun/conexionBD.php");
    
    $comentario=$_POST['comentario'];
    $subtotal=$_POST['subtotal'];
    $email=$_SESSION['usuario']['email'];
        $resultado = $mysqli->query("SELECT * from usuario where Email='$email'");
        $row = $resultado->fetch_object();
        $id_usuario=$row->ID_Usuario;
        //echo $id_usuario;
        date_default_timezone_set("Europe/Madrid");
        $hora =date("H:i:s");
    
        $horaAsignada = date('H:i:s', strtotime('+30 minutes', strtotime($hora)));
        //echo $horaAsignada."". $subtotal;
        
        $sql = "INSERT INTO pedido (Comentario, Hora, PrecioTotal, ID_Usuario) VALUES ('$comentario','$horaAsignada',$subtotal,$id_usuario)";
        $result=$mysqli->query($sql);
        $verPedido=$mysqli->query("SELECT * from pedido WHERE ID_Usuario=$id_usuario AND Hora='$horaAsignada'");
        $row2 = $verPedido->fetch_object();  
        echo ($mysqli->error);       
        if(!$mysqli->error){ 
            foreach ($_SESSION["Carrito"] as $i => $producto) {
                $cantidad= $producto['Cantidad'];
                $id_producto= $producto['ID'];
                $sqlLinea = "INSERT INTO linea_pedido (Cantidad,ID_Pedido,ID_Producto) VALUES ($cantidad,$row2->ID_Pedido,$id_producto)";
                $insertarLinea=$mysqli->query($sqlLinea);  
            }
            unset($_SESSION["Carrito"][$producto]);
            $mysqli->close();    
            
        }
        
?>
