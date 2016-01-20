'use strict';

var x = 1;

function doubleIt(x) {
    x = x * 2; 
}

doubleIt(x);
console.log(x);

var name = 'Conrad';

function getHello(name) {
    return function() {
        console.log(name);
    }
}

var sayHello = getHello(name);
name = 'Fred';
sayHello();

