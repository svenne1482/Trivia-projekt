<!DOCTYPE html>
<html lang="en">
    <head>
        <link rel="stylesheet" href="./css/index.css">
        <script src="./js/index.js"></script>
    </head>

    <body>
        <form method="post" action="db.php">
            <input type="hidden" name="func" value="registerUser">
            <input type="text" name="name">
            <input type="password" name="password">
            <input type="submit" value="Register">
        </form>
    </body>
</html>