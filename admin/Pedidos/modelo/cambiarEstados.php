<?php
        session_start();
        if(!isset($_SESSION["usuario"])||($_SESSION['usuario']['ID_Role'] !='1')){
             header("location: http://localhost/php/comun/logout.php");
        }
        include("../../../comun/conexionBD.php");

        $idPedido=$_POST['idPedido'];
        $idEstado=$_POST['idEstado'];
        
        if($idEstado==6||$idEstado==5||$idEstado==4){
            $query="UPDATE pedido SET ID_Estado=$idEstado,Activo=0 WHERE ID_Pedido=$idPedido";
        }else{
            $query="UPDATE pedido SET ID_Estado=$idEstado,Activo=1 WHERE ID_Pedido=$idPedido";
        }
        $pedidoUpdated=$mysqli->query($query);    
        echo ($mysqli->error);
        if(!$mysqli->error){
            header("location: ../vista/listaPedidos.html");
        }
        $pedidoUpdated->free();
        $mysqli->close();
?>