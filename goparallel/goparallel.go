package main

import (
    "bufio"
    "fmt"
    "golang.org/x/crypto/bcrypt"
    "io/ioutil"
    "log"
    "os"
    "sync"
    "time"
)

//hashFile will hash each entry in infilePath through bcrypt
//and write the output to the file outfilePath
//calls wg.Done() when finished
func hashFile(infilePath string, outfilePath string, wg *sync.WaitGroup) {
    //defer calling done on the waitgroup so that it
    //happens regardless of how we exit this function
    defer wg.Done()
    fmt.Printf("Processing file %s...\n", infilePath)
    
    //open the infile
    infile, err := os.Open(infilePath)
    if nil != err {
        log.Fatal(err)
    }
    defer infile.Close()

    //open the outfile
    outfile, err := os.Create(outfilePath)
    if nil != err {
        log.Fatal(err)
    }
    defer outfile.Close()

    //scan over the file processing each entry
    scanner := bufio.NewScanner(infile)
    entries := 0
    for scanner.Scan() {
        entry := scanner.Bytes()
        hash, err := bcrypt.GenerateFromPassword(entry, 4)
        if nil != err {
            log.Printf("Error hashing: %s", err.Error())
        }

        //write the entry and resulting hash to the
        //outfile, as CSV
        outfile.Write(entry)
        outfile.WriteString(",")
        outfile.Write(hash)
        outfile.WriteString("\n")

        entries++
        //every 100 entries, print a dot
        //to indicate progress
        if 0 == entries%100 {
            fmt.Printf(".")
        }
    }
}

func main() {
    //user may specify data directory via command
    //line argument; defaults to ./data/chunks
    dir := "./data/chunks/"
    if len(os.Args) > 1 {
        if _, err := os.Stat(os.Args[1]); err == nil {
            dir = os.Args[1]
            if dir[len(dir)-1:] != "/" {
                dir += "/"
            }
        }
    }
    //put hashes in a sub-directory named hashes
    hashesDir := dir + "hashes/"
    os.Mkdir(hashesDir, os.ModePerm)

    //get all files in the data directory
    files, err := ioutil.ReadDir(dir)
    if nil != err {
        log.Fatal(err)
    }

    //get current time
    startTime := time.Now()

    //TODO: for each file in the directory
    //call hashFile() as a goroutine, passing
    //the file name
    //use a sync.WaitGroup to block the main 
    //thread until all the goroutines have finished


    //get the ending time and report duration
    dur := time.Since(startTime)
    fmt.Printf("\n\n")
    fmt.Printf("hashing took %s\n", dur.String())
}
