<?php
    session_start();
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
        <?php include_once('db.php');
            if(isset($_SESSION['logged_user']))
            {
                $html = getUsername($_SESSION['logged_user']);
                echo '<div class="welcome">
                <p>Welcome back,'.$html.'</p></div>';
            }
        ?>
        <div class="menu">
            <a href="single-player.php">SINGLE PLAYER</a>
            <a href="multi-player.php">MULTIPLAYER</a>
        </div>
    </body>
</div>
</html>