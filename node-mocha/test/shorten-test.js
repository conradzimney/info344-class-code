'use strict';

var should = require('should');

var shorten = require('../lib/shorten');

describe('shorten module', function() {
    it('should encode an id to a path', function() {
        var enc = shorten.encode(99999);
        should.exist(enc);
        enc.length.should.be.above(0);
    });
    
    it('should decode a path back to the same id', function() {
        var id = 99999;
        shorten.decode(shorten.encode(id)).should.equal(id);
    });
});

