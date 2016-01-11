<?php

require_once 'connection.php';
require_once 'chat-model.php';

$name = $_GET['name'];
$m = $_GET['m'];

$conn = getConnection();
$chatModel = new Chat($conn);
$messages = $chatModel->load();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta charset="UTF-8">
    <title>Chat</title>
    
    <!-- bootstrap css -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

</head>
<body class="container">
 
    <h1>Lab 2: Info 344 Class Chat</h1>
    <!-- Message input area -->  
    <form action="" method="GET">
        <div class="form-group">
            <p>Nickname:</p>
            <input type="text" 
                id="nameInput" 
                name="name"
                class="form-control" 
                value="<?= htmlentities($name) ?>"
                placeholder="Nickname (anonymous by default)"
                required
                >
        </div>
        <p>Message Content:</p>
        <div class="form-group">
            <input type="text" 
                id="mInput" 
                name="m"
                class="form-control" 
                value="<?= htmlentities($m) ?>"
                placeholder="Message you would like to send"
                required
                >
        </div>
        <div class="form-group">
            <button class="btn btn-primary" type="submit" onclick="<?php $chatModel->insert($name, $m)?>">Send Message</button>
        </div>
    </form>
    <br>
    <br>
    
    <!-- Messages -->
    <ul>
        <?php foreach($messages as $message):?>
        <li>
            <?= htmlentities($message['nickname']) ?>: 
            <?= htmlentities($message['content']) ?>
            <?= htmlentities($message['sent_timestamp']) ?>
        </li>
        <?php endforeach; ?>
    </ul>
    
   
</body>
</html>