<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<div id="page">

    <head>
        <link rel="stylesheet" href="./css/index.css">
        <link rel="stylesheet" href="./css/game.css">
        <script src="./js/multi-player.js"></script>
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
        <div id="multi-player-board">
            <form id="multi-setup" name="multi-setup" action="javascript:start()"onsubmit="return validateMulti()">
                <label for="player1">Player 1:</label>
                <input type="text" name="player1">
                <label for="player2">Player 2:</label>
                <input type="text" name="player2">
                <input type="text" name="rounds">
                <select name="category">
                    <option>Sports</option>
                    <option>Science: Computers</option>
                </select>
                <input type="submit" value="START">
                
            </form>
        </div>
    </body>

</html>