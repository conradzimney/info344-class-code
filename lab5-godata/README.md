# Lab 5: Working with Data Files in Go

For the [suggestion service challenge](https://info344.ischool.uw.edu/course/challenges/go), you will need to load your trie from a large data file that contains a series of entires. This lab will help you learn how to open files and process them as a stream of lines. Instead of reading the entire file contents into memory, you will read only one line at a time. That will allow you to process enormous data files while using only a small amount of memory at a time.

The challenge also requires you to work with structs, maps, and slices. This lab will also make you practice using those so that you get comfortable with the syntax.

## Download Using the Command Line

For reasons mentioned in the [challenge description](https://info344.ischool.uw.edu/course/challenges/go), you should never add a large data file to your git repository. Instead, you should download it directly to your production server by starting an `ssh` session, and then using a command-line tool like `wget`. If you already have the data file on your development machine, you can also use `scp` to copy the file to your production server over the `ssh` protocol.

Practice downloading our data file for today using `wget`. Open a new terminal window, change into this `lab5-godata` directory, and then execute this command:

```bash
$ wget http://www.unitedstateszipcodes.org/zip_code_database.csv
```

> **Windows Users:** if you don't have `wget` installed, you can [download it](http://gnuwin32.sourceforge.net/packages/wget.htm), or you can try `curl` instead, or you can use the [Invoke-WebRequest](https://technet.microsoft.com/en-us/library/hh849901) in PowerShell.

Then **edit your `.gitignore` file** in the root directory of this repository so that git ignores this file. That way git won't prompt you to add it, and will also ignore it even if you do `git add .`.

## Parse the File as a Stream

In the same folder, create a new Go executable program named `zips.go` that does the following:

1. At the start of your `main()` function, [open the CSV file](https://golang.org/pkg/os/#Open) for reading. If you receive an error, [log it as a fatal error](https://golang.org/pkg/log/#Logger.Fatal) and exit.
2. To parse this file as a stream of CSV, create a new [CSV Reader](https://golang.org/pkg/encoding/csv/#NewReader), passing the opened file pointer.
3. Write a loop to [read records from the stream](https://golang.org/pkg/encoding/csv/#example_Reader), one at a time, until you reach the end of the stream.
4. Each time you read a record, you will get back a slice of strings. For now, just print the first element in that slice. **Note that the first line of the file contains the column headings, so ignore that first line**.
5. After the loop ends, [close the file](https://golang.org/pkg/os/#File.Close).

Run your program using the command:

```bash
$ go run zips.go
```

If you did everything correctly, you should see a long list of zip codes printed to the terminal.

## Do Some Tabulation

Now that you can parse and process the CSV file as a stream, do some tabulation as you process the records. Define a [struct](https://gobyexample.com/structs) that you can use to keep track of the following as you process the records:

- Total number of records.
- Number of records per each distinct `type` value (slice index `1`). This is like a `GROUP BY` query in SQL, where you are calculating how many records there are per distinct `type` value.
- The zip code with the highest estimated population (slice index `14`).

Add logic inside your loop to adjust these values as you process each record. 

After your loop ends, print a summary of these values. For the counts per type, you should output those types in [sorted order](http://stackoverflow.com/questions/2038508/easy-way-to-get-the-keys-in-a-map-in-alphabetical-order).

Remember that the slice you get back when you read a record is a slice of strings. To do mathematical comparisons on values like the population, you will need to [convert those strings into integers](https://golang.org/pkg/strconv/).

## Humanize Your Output

Go doesn't do any formatting of numbers when you print them, but there are packages that can format numbers and other data types in ways that humans can better understand. Use the [go-humanize](https://github.com/dustin/go-humanize) package to format your numbers with commas as thousands separators.

To install this package, use the command:

```bash
$ go get github.com/dustin/go-humanize
```

And then import it using the same path:

```go
import (
    //...
    "github.com/dustin/go-humanize"
)
```

And use the `humanize.Comma()` function to format numbers with commas as the thousands separator. Note that this function takes an `int64` so if you use a different integer type in your struct, you will need to convert it while passing it to this function.
