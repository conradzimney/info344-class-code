<?php
//appID (this is their demo app ID from their web site)
$appId = '2de143494c0b295cca9337e1e96b00e0';

//weather API URL
//http://api.openweathermap.org/data/2.5/weather?zip={zipcode},us&units=imperial&appid={$appId}

//weather icon URLs
// http://openweathermap.org/img/w/{iconName}.png

$q = '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta charset="UTF-8">
    <link rel="icon" href="img/page-icon.png">
    <title>Weather</title>
    
    <!-- bootstrap css -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

</head>
<body class="container">
    <?php 
    include 'views/search-form.php';

    ?>
   
</body>
</html>