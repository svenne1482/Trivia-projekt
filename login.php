<?php
    session_start();
    if(isset($_SESSION['logged_user']))
    {
        header('location:menu.php');
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <link rel="stylesheet" href="./css/index.css">
        <script src="./js/index.js"></script>
    </head>
<div id="page">
    <header >
        <div id="title">
            <h1>T</h1>
            <h1>R</h1>
            <h1>I</h1>
            <h1>V</h1>
            <h1>I</h1>
            <h1>A</h1>
            <h1>L</h1>
            <h1>I</h1>
            <h1>T</h1>
            <h1>Y</h1>
        </div>
        <?php include('navbar.php')?>
    </header>
    <body>
        <form method="POST" action="db.php">
            <label for="name">Username:</label>
            <input type="text" name="name">
            <label for="password">Password:</label>
            <input type="password" name="password">
            <input type="hidden" name="func" value="loginUser">
            <input type="submit" value="LOG IN">
        </form>
    </body>
</div>
</html>