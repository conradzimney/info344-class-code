package main 

import (
    "github.com/conradzimney/info344-class-code/gotypes/structs/person"
)

func main() {
    pers := person.NewPerson("Conrad", "Zimney")
    pers.FirstName = "Rainman"
    
    // fmt.Printf("%+v\n", person)
    
    pers.SayHello()
}