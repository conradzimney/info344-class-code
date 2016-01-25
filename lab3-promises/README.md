# Lab 3: Promises

Today's lab will take you to the Promise Land! *chuckles*
Seriously though, JavaScript promises are super useful when writing
asynchronous JS code that requires synchronous steps. We will practice promises
with a few discrete exerecises to help get your brains adjusted to these odd
new programming constructs!

If you get stuck at any point in this lab (and even if you don't), check out
the link that Dave posted on our class website:
http://www.html5rocks.com/en/tutorials/es6/promises/

## Exercise 1: Brain-dead Promises

Let's start with a really brain-dead exercise to get a quick intro to promises.
Create a new script called `promises.js` and add `"use strict"` at the top. In
the script, write a function called `add2()` that accepts an integer as a
parameter and logs the integer plus 2 to the console. You can accomplish this
by constructing a new promise and chaining two `.then()` statements to add 1 to
the integer, and then chaining another `.then()` statement to log the results
to the console. In total, you should chain three `.then()` statements in this
exercise.

## Exercise 2: Promisify XMLHttpRequest

Now that we have a better understanding for the promise API, we can move on to
something a little more interesting. Let's promisify the 'http.get' function!
This is a fairly complicated task, so let's I'll give it to you for free:

```javascript
var http = require('http');

function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual request stuff
    http.get(url, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            resolve(body);
        });
    }).on('error', function(err) {
        reject(err);
    });
  });
}
```

Make sure as you copy this code to carefully look at what's happnening in the
promise constructor. Take note of the fact that function that's passed to the
constructor accepts two values: a resolve function which is called when
the promise is successful, and a reject function for when it fails.

Now that we have this method, let's use it for something really simple. Let's
query the OMDb API (yip, this again :D). Write a function called
`getMovie(movieId)` which calls the OMDb api for the movie with the given id.
Print out the **parsed** JSON results to the console. Make sure to catch any
errors with a `.catch()` statement.

Example API call: `get("http://www.omdbapi.com/?i=tt0120737&plot=short&r=json")`

## Exercise 3: Chain 'Get' Calls

Write a function `getThreeMovies(id1, id2, id3)` that takes the three movie ids
and calls the OMDb api for the three movies, then logs to the console the movies'
titles. You will be chaining together 3 get calls, and catching errors using the
`.catch` statement.

## Exercise 4: Promise.all??

Why not make the previous exercise a little nicer? We don't have to wait for one
movie to load to fetch another one, so let's use `Promise.all()` to fetch all
of our movies concurrently and print out the titles. Call this method
`getThreeMoviesConcurrently(id1, id2, id3)`.

## Exercise 5: Movie Posters!!!

Finally, write a function `getMoviePoster(movieId)` that accepts a movie id,
calls the OMDb api for the movie JSON, then gets the movie poster using the
link in the JSON. Print out the image contents to the console. Note that this
will probably not look to pretty, but it's a common use case for promises!
