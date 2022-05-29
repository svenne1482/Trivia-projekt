<?php
    session_start();

    $user = $_SESSION['logged_user'];
    $db = new SQLite3('./db/trivia.db');
    $sql = 'SELECT user_created, answer_id, user_id as uid , correct, trivia_id as tid FROM Answer where user_id = :user ORDER BY answer_id DESC';
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':user',$user,SQLITE3_NUM);
    $result = $stmt->execute();
    while($row = $result->fetchArray())
    {
        if($row['user_created'] == 0)
        {
            $trivia = joinAnswerApi($row['tid'],$row['uid']);
            $cat = $trivia['category'];
            $q =  $trivia['question'];
            $cor = $row['correct'];
            $html = '<div class="stat">';
            $html .= '<div class="stat-category">' . $cat . '</div>';
            $html .= '<div class="stat-question">' . $q . '</div>';
            if($cor == 1)
                $html .= '<div class="stat-correct">CORRECT</div>';
            else
                $html .= '<div class="stat-incorrect">INCORRECT</div>';
            $html .= '</div>';
            echo $html;
        }
        else
        {
            $trivia = joinAnswerUser($row['tid'],$row['uid']);
            $cat = $trivia['category'];
            $q =  $trivia['question'];
            $cor = $row['correct'];
            $html = '<div class="stat">';
            $html .= '<div class="stat-category">' . $cat . '</div>';
            $html .= '<div class="stat-question">' . $q . '</div>';
            if($cor == 1)
                $html .= '<div class="stat-correct">CORRECT</div>';
            else
                $html .= '<div class="stat-incorrect">INCORRECT</div>';
            $html .= '</div>';
            echo $html;
        }
        
    }

    function joinAnswerApi($tid,$uid)
    {
        $db = new SQLite3('./db/trivia.db');
        $sql = 'SELECT username, category, question FROM
        User
        JOIN(
            SELECT category_name as category, question FROM
            Category
            JOIN(
                SELECT question, category as cid FROM
                Api_Trivia where trivia_id = :tid
                ) ON category_id = cid
            ) ON user_id = :uid
        GROUP by question';
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':tid',$tid,SQLITE3_NUM);
        $stmt->bindParam(':uid',$uid,SQLITE3_NUM);
        return $stmt->execute()->fetchArray();
    }
    function joinAnswerUser($tid,$uid)
    {
        $db = new SQLite3('./db/trivia.db');
        $sql = 'SELECT username, category, question FROM
        User
        JOIN(
            SELECT category_name as category, question FROM
            Category
            JOIN(
                SELECT question, category as cid FROM
                User_Trivia where trivia_id = :tid
                ) ON category_id = cid
            ) ON user_id = :uid
        GROUP by question';
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':tid',$tid,SQLITE3_NUM);
        $stmt->bindParam(':uid',$uid,SQLITE3_NUM);
        return $stmt->execute()->fetchArray();
    }

?>