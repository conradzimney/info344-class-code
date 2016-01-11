<?php

require_once 'connection.php';
require_once 'chat-model.php';

$conn = getConnection();
$chatModel = new Chat($conn);
$messages = $chatModel->search();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta charset="UTF-8">
    <link rel="icon" href="img/page-icon.png">
    <title>Chat</title>
    
    <!-- bootstrap css -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

</head>
<body class="container">
 
    <h1>Messages</h1>
        <ul>
            <?php foreach($messages as $message):?>
            <li>
                <?= htmlentities($message['content']) ?>
            </li>
            <?php endforeach; ?>
        </ul>
    
   
</body>
</html>