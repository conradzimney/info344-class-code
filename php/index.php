<<<<<<< HEAD
<?php 
$url = parse_url($_SERVER['REQUEST_URI']); // $_SERVER is an associative array (dictionary)
$name = substr($url['path'],1 );
=======
<?php
$url = parse_url($_SERVER['REQUEST_URI']);
$name = substr($url['path'], 1);
>>>>>>> f98e48d0e9bbec76c1776e94553d9fdcc7221f3a
if (strlen($name) == 0) {
    $name = 'World';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta charset="UTF-8">
<<<<<<< HEAD
    <title>Hello <?= htmlentities($name)?></title>
</head>
<body>
    
    <h1>Hello <?= htmlentities($name) ?>!</h1>

=======
    <title>Hello <?= htmlentities($name) ?></title>
</head>
<body>
    <h1>Hello <?= htmlentities($name) ?>!</h1>
    
>>>>>>> f98e48d0e9bbec76c1776e94553d9fdcc7221f3a
</body>
</html>