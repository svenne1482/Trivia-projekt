<?php
session_start();
if (!isset($_SESSION['logged_user'])) {
    header('location:login.php');
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="./css/index.css">
    <script src="./js/index.js"></script>
</head>
<div id="page">
    <body onload=rippleTitle()>
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
    <div class="profile-body">
        <p class="profile-name">
            <?php
            include_once('db.php');
            echo getUsername($_SESSION['logged_user']);
            ?>
        </p>
        <div class="profile-stats">
            <?php
            include('player-stats.php');
            ?>
        </div>
    </div>
    </body>
</div>

</html>