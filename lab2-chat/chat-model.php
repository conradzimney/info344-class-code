<?php 
class Chat {
    protected $conn; 
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    public function search() { 
        $sql = 'select * from message';
        $stmt = $this->conn->prepare($sql);
        $success = $stmt->execute(array());
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