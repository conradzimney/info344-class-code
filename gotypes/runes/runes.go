package main 

import (
    "fmt"
)

func main() {
    s := "Hello, 世界"
    
    for idx, r := range s {
        fmt.Println(idx, string(r))
    }    
}