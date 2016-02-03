<<<<<<< HEAD
Hey this is come sontent above the code 
<?php 
$name = 'Conrad';
$fullname = $name . 'Zimney';
=======
Hey this is some content above the code
<?php
$name = 'Dave';
$fullName = $name . 'Stearns';
>>>>>>> f98e48d0e9bbec76c1776e94553d9fdcc7221f3a

class Person {
    protected $name;
    
    public function __construct($n) {
        $this->name = $n;
    }
    
    public function getName() {
        return $this->name;
    }
}

function foo($bar) {
<<<<<<< HEAD
    echo "Hey is the foo fighting function\n";
=======
    echo "Hey this is the foo fighting function\n";
>>>>>>> f98e48d0e9bbec76c1776e94553d9fdcc7221f3a
}

echo "Hello {$name}s\n";
foo(NULL);
?>
<<<<<<< HEAD
And this is some content below the code 
=======
And this is some content below
>>>>>>> f98e48d0e9bbec76c1776e94553d9fdcc7221f3a
