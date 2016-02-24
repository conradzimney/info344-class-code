package person

import (
    "fmt"
)

type Person struct {
    FirstName string
    LastName string
}

func NewPerson(first string, last string) *Person {
    return &Person{FirstName: first, LastName: last}
}

func (person *Person) SayHello() {
    fmt.Println("Hello,", person.FirstName, person.LastName)
}
