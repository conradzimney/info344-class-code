package main 

import (
    "os"
    "log"
    "encoding/csv"
    "io"
    "fmt"
    "strconv"
)

type Records struct {
    TotalNum int
    NumPerType [3]int
    HighestPop int
}

func (r *Records) print() {
    fmt.Println("Total Number of records:", r.TotalNum)
    fmt.Println("Highest population:", r.HighestPop)
    fmt.Println("STANDARD count:", r.NumPerType[0])
    fmt.Println("UNIQUE count:", r.NumPerType[1])
    fmt.Println("PO BOX count:", r.NumPerType[2])   
}

func main() {
    file, err := os.Open("zip_code_database.csv")
    var records Records
    maxPop := 0
    if nil != err {
        log.Fatal(err)
    } else {
        r := csv.NewReader(file)
        first := true
        for {
            record, err := r.Read()
            if err == io.EOF {
                break
            }
            if err != nil {
                log.Fatal(err)
            }
            if first {
                first = false
                continue
            }
            // fmt.Println(record[0])
            records.TotalNum++
            if record[1] == "STANDARD" {
                records.NumPerType[0]++
            } else if record[1] == "UNIQUE" {
                records.NumPerType[1]++
            } else if record[1] == "PO BOX" {
                records.NumPerType[2]++
            }
            i, err := strconv.ParseInt(record[14], 10, 64)
            if int(i) > maxPop {
                records.HighestPop = int(i)
                maxPop = int(i)
            }
        }
        records.print()
    }
    file.Close()
}