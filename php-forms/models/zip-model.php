<?php 
class Zips {
<<<<<<< HEAD
    protected $conn; 
=======
    protected $conn;
>>>>>>> f98e48d0e9bbec76c1776e94553d9fdcc7221f3a
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
<<<<<<< HEAD
    public function search($q) { //takes query as parameter $q
        $sql = 'select * from zips where zip=? or primary_city=?';
        $stmt = $this->conn->prepare($sql);
        $success = $stmt->execute(array($q,$q));
        if (!$success) {
            var_dump($stmt->errorInfo());
            // trigger_error($stmt->errorInfo());
=======
    public function search($q) {
        $sql = 'select * from zips where zip=? or primary_city=?';
        $stmt = $this->conn->prepare($sql);
        $success = $stmt->execute(array($q,$q));
        if (!$success) {            
            var_dump($stmt->errorInfo());
>>>>>>> f98e48d0e9bbec76c1776e94553d9fdcc7221f3a
            return false;
        } else {
            return $stmt->fetchAll();
        }
    }
}
?>