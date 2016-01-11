<?php 
class Chat {
    protected $conn; 
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    public function load() { 
        $sql = 'select * from message order by sent_timestamp desc limit 10';
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
    
    public function insert($name, $m) {
        $name = $_GET['name'];
        $m = $_GET['m'];
        if ($name == NULL) {
            $m = 'This message has no content';
        }
        if ($m == NULL) {
            $name = 'anonymous';   
        }
            
        $sql = 'INSERT INTO message (nickname, content) VALUES (?, ?)';
        $stmt = $this->conn->prepare($sql);
        $success = $stmt->execute(array($name,$m));
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