'use strict';

module.exports.Model = function(cnPool, shorten) {
    return {
        
        insert(url) {
            var sql = 'insert into urls(url) values (?)';
            return cnPool.queryAsync(sql, [url])
                .then(function(results) {
                    return shorten.encode(results.insertId);
                });
        },
        
        get(shortPath) {
            var id = shorten.decode(shortPath);
            return cnPool.queryAsync('select id, url from urls where id=?', [id])
                .then(function(rows) {
                    return rows.length > 0 ? rows[0] : null;
                });
        },
        
        resolve(shortPath) {
            return this.get(shortPath)
                .then(function(row) {
                    return row ? row.url : null;
                });
        },
        
        remove(shortPath) {
            return this.get(shortPath)
                .then(function(row) {
                    if (row) {
                        return cnPool.queryAsync('delete from urls where id=?', [row.id])
                    }
                });
        }
    };
}