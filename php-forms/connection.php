<?php 

function getConnection() {
    require_once 'secret/db-credentials.php';
    
    try {
        $conn = new PDO("mysql:host={$dbHost};dbname={$dbDatabase}", $dbUser, $dbPassword);
            
        return $conn;
        
    } catch(PDOException $e) {
        die('Cound not connect to database ' . $e);
    }
}

?>