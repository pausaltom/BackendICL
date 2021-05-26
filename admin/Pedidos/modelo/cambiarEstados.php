<?php
        session_start();
        if(!isset($_SESSION["usuario"])||($_SESSION['usuario']['ID_Role'] =='2')){
             header("location: http://localhost/php/comun/logout.php");
        }
        include("../../../comun/conexionBD.php");

        $idPedido=$_POST['idPedido'];
        $idEstado=$_POST['idEstado'];
        

        $productUpdated=$mysqli->query("UPDATE pedido SET ID_Estado = '$idEstado' WHERE ID_Pedido=$idPedido");    
        echo ($mysqli->error);
        if(!$mysqli->error){
            header("location: ../../../Productos/vista/listaProductos.html");
        }
        $productUpdated->free();
        $mysqli->close();
?>