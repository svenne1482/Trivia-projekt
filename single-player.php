<?php
session_start();
if (!isset($_SESSION['logged_user']))
    header('location:login.php');
?>
<!DOCTYPE html>
<html lang="en">
<div id="page">

    <head>
        <link rel="stylesheet" href="./css/index.css">
        <link rel="stylesheet" href="./css/game.css">
        <script src="./js/single-player.js"></script>
    </head>
    <header>
        <header>
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
            <?php include('navbar.php') ?>
        </header>
    </header>

    <body onload=init()>
        <div id="single-player-board">
        </div>
    </body>

</html>