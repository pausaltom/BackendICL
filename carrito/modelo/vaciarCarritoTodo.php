<?php
              session_start();
              if (isset($_SESSION["Carrito"])) {
                unset($_SESSION["Carrito"]);
                echo $_SESSION["Carrito"];
                header("location: http://localhost/php/Productos/vista/listaProductos.html"); 
              }
              
?>