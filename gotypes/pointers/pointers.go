package main 

import (
    "fmt" 
)

func doubleIt(val *int) {
    *val *= 2
}

func main() {
    val := 5
    doubleIt(&val)
    fmt.Println(val)
}