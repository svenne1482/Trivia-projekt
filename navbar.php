<?php
    include('db.php');
    session_start();
    if(isset($_SESSION['logged_user']))
    {   
        $id = $_SESSION['logged_user'];
        $html = '<div class="navbar">
            <a href="./index.php">INDEX</a>
            <a href="./menu.php">PLAY</a>
            <a href="./logout.php">LOGOUT</a>
            <a href="./profile.php">PROFILE</a>';
        if(isAdmin($id))
        {
            $html .= '<a href="./admin.php">ADMIN</a>';
        }
        echo $html . '</div>';
    }
    else
    {
        echo '<div class="navbar">
            <a href="./index.php">INDEX</a>
            <a href="./menu.php">PLAY</a>
            <a href="./login.php">LOG IN</a>
            <a href="./register.php">REGISTER</a>
        </div>';
    }
?>