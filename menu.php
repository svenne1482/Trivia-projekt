<!DOCTYPE html>
<html>
    <head>

    </head>

    <body>
        <p>
            Hello <?php session_start(); echo $_SESSION['logged_user']?>
        </p>
    </body>
</html>