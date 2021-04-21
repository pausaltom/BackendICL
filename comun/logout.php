
    <?php
        session_start();
        session_destroy();
        header("location: http://localhost/php/auth/login.html");
    ?>
