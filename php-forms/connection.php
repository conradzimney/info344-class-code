<?php 
<<<<<<< HEAD

=======
>>>>>>> f98e48d0e9bbec76c1776e94553d9fdcc7221f3a
function getConnection() {
    require_once 'secret/db-credentials.php';
    
    try {
<<<<<<< HEAD
        $conn = new PDO("mysql:host={$dbHost};dbname={$dbDatabase}", $dbUser, $dbPassword);
            
        return $conn;
        
    } catch(PDOException $e) {
        die('Cound not connect to database ' . $e);
=======
        $conn = new PDO("mysql:host={$dbHost};dbname={$dbDatabase}", 
              $dbUser, $dbPassword);
        
        return $conn;
        
    } catch(PDOException $e) {
        die('Could not connect to database ' . $e);
>>>>>>> f98e48d0e9bbec76c1776e94553d9fdcc7221f3a
    }
}

?>