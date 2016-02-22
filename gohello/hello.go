package main 

import (
	"fmt"
	"os"
	"github.com/conradzimney/info344-class-code/gohello/reverse"
)

func main() {
	fmt.Println(reverse.Reverse("Hello World!"))
	fmt.Println(os.Args[0])
}