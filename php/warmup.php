<?php 

// Simple Warm-Up
    $random = rand(1, 100);
    echo "Your new random value is {$random}\n";
    
// Arrays and Loops

    $months = array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    foreach ($months as $m) {
        echo "$m\n";
    }
    sort($months);
    echo "Sorting months Alphabetically...\n";
    foreach ($months as $m) {
        echo "$m\n";
    }
?>