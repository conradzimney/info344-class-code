'use strict';

/**
 * Bijective conversion between id numbers and short string
 * Original code from: 
 *  https://github.com/delight-im/ShortURL/blob/master/JavaScript/ShortURL.js
 */

const _alphabet = '23456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ-_';
const _base = _alphabet.length;
        
module.exports = {
    encode(id) {
        var str = '';
        while (id > 0) {
            str = _alphabet.charAt(id % _base) + str;
            id = Math.floor(id / _base);
        }
        return str;        
    },
    
    decode(str) {
        var num = 0;
        for (var i = 0; i < str.length; i++) {
            num = num * _base + _alphabet.indexOf(str.charAt(i));
        }
        return num;
    }
};
