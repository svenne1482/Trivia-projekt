<?php
$getFunc = $_GET["func"];
$postFunc = $_POST["func"];
if(function_exists($getFunc))
{
    $getFunc();
}
if(function_exists($postFunc))
{
    $postFunc();
}

function fetchTriviaId()
{
    $question = $_GET['question'];
    $category = getCategoryId($_GET['category']);
    print getTriviaId($question,$category);
}
function getTriviaId($question,$category)
{
    $db = new SQLite3('./db/trivia.db');
    $sql = 'SELECT trivia_id FROM Api_Trivia WHERE question = :question';
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':question',$question, SQLITE3_TEXT);
    $result = $stmt->execute();
    $row = $result->fetchArray();
    if($row['trivia_id'] != '')
    {
        return $row['trivia_id'];
    }
    else
    {
        $db->close();
        return insertTrivia($question,$category);
    }
}
function insertTrivia($question,$category)
{
    $db = new SQLite3('./db/trivia.db');
    $sql = 'INSERT INTO Api_Trivia (question,category) VALUES (:question,:category)';
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':category',$category, SQLITE3_NUM);
    $stmt->bindParam(':question',$question, SQLITE3_TEXT);
    if($stmt->execute())
    {
        return getTriviaId($question,$category);
    }
    else
    {
        print -1;
    }
}

function getCategoryId($category)
{
    $db = new SQLite3('./db/trivia.db');
    $sql = 'SELECT category_id FROM Category WHERE category_name = :category';
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':category',$category, SQLITE3_TEXT);
    $result = $stmt->execute();
    $row = $result->fetchArray();
    if($row['category_id'] != '')
    {
        return $row['category_id'];
    }
    else
    {
        $db->close();
        return insertCategory($category);
    }
    
}

function insertCategory($category)
{
    $db = new SQLite3('./db/trivia.db');
    $sql = 'INSERT INTO Category (category_name) VALUES (:category)';
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':category',$category, SQLITE3_TEXT);
    if($stmt->execute())
    {
        $db->close();
        return getCategoryId($category);
    }
    else
    {
        return false;
    }
}

function insertStat()
{
    $db = new SQLite3('./db/trivia.db');
    $tid = $_POST['tid'];
    $uid = $_POST['uid'];
    $uc = $_POST['uc'];
    $correct = $_POST['correct'];
    $sql = 'INSERT INTO Answer (trivia_id,user_created,correct,user_id) VALUES (:tid,:uc,:correct,:uid)';
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':tid',$tid, SQLITE3_NUM);
    $stmt->bindParam(':uid',$uid, SQLITE3_NUM);
    $stmt->bindParam(':uc',$uc, SQLITE3_NUM);
    $stmt->bindParam(':correct',$correct, SQLITE3_NUM);
    if($stmt->execute())
    {
        $db->close();
        return true;
    }
    else
    {
        return false;
    }
}

function registerUser(){
    session_start();
    $isadmin = 0;
    $name = $_POST["name"];
    $password = $_POST["password"];
    $db = new SQLite3("./db/trivia.db");
    $sql = 'INSERT INTO User (username,password,is_admin) VALUES (:name,:password,:isadmin)';
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':name',$name,SQLITE3_TEXT);
    $stmt->bindParam(':password',hash('md5',$password),SQLITE3_TEXT);
    $stmt->bindParam(':isadmin',$isadmin,SQLITE3_NUM);
    if($stmt ->execute ()){
        $db ->close ();
        loginUser();
        }
        else{
        $db ->close ();
        echo -1;
       }
}

function loginUser(){
    session_start();
    $name = $_POST["name"];
    $password = $_POST["password"];
    $db = new SQLite3("./db/trivia.db");
    $sql = 'SELECT user_id FROM User where username=:name and password=:password';
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':name',$name,SQLITE3_TEXT);
    $stmt->bindParam(':password',hash('md5',$password),SQLITE3_TEXT);

    $result = $stmt->execute();
    $row = $result->fetchArray();
    if($row['user_id'] == '')
    {
    }
    else
    {
        $_SESSION['logged_user'] = $row['user_id'];
        header('location:menu.php');
    }
}

?>