<?php
require_once 'connection.php'; // данные для подключения

//нужные функции
function mysql_entities_fix_string($conn, $string){
    return htmlentities(mysql_fix_string($conn, $string));
}
function mysql_fix_string($conn, $string){
    if(get_magic_quotes_gpc()) $string = stripslashes($string);
    return $conn->real_escape_string($string);
}


//соединяемся
$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_errno) {
    echo $conn->connect_errno . " : " . $conn->connect_error;
}
else{
    
    //список дел - получить все
    if($_GET['type'] == 'get_todos'){
        $osq = $conn->query("SELECT DISTINCT * FROM todoApp order by id desc"); //запрашиваем список ОС
        
        $res = [];
        if($osq->num_rows > 0){
            for ($i = 1 ; $i <= $osq->num_rows; ++$i){
                $osr = $osq->fetch_assoc();
                $res[] = ["id"=>$osr['id'], "title"=>$osr['title'], "date"=>$osr['date'], "completed"=>$osr['completed']];
            }
            echo json_encode($res);
        }  
        else echo 0; 
    }

    //добавление дела
    if($_POST['type'] == 'add_todo'){

        $title = mysql_entities_fix_string($conn, $_POST['title']);
        $date = mysql_entities_fix_string($conn, $_POST['date']);

        $data = $conn->query("INSERT INTO todoApp (id, title, completed, date) 
        VALUES (NULL, '".$title."', 0, '', '".$date."'");
        //после вставки вернем id элемента
        if(!$data) echo $conn->error;
        else echo $conn->insert_id;
    }

    $conn->close();
}

?>
