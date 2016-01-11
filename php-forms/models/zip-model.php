<?php 
class Zips {
    protected $conn; 
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    public function search($q) { //takes query as parameter $q
        $sql = 'select * from zips where zip=? or primary_city=?';
        $stmt = $this->conn->prepare($sql);
        $success = $stmt->execute(array($q,$q));
        if (!$success) {
            var_dump($stmt->errorInfo());
            // trigger_error($stmt->errorInfo());
            return false;
        } else {
            return $stmt->fetchAll();
        }
    }
}
?>