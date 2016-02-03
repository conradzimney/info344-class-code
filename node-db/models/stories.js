'use strict';

//MariaDB connection pool
//initialized below
var connPool;

//stories model
//a collection of functions that get, insert, and update stories
//in the databases
var stories = {
    //ES6 syntax that is equivallent to getAll: function() {}
    //returns the first page of stories
    //TODO: support offset and limit as optional parameters
    getAll() {
        var sql = `select * from stories 
            order by votes desc, createdOn desc limit 50`;
        return connPool.queryAsync(sql);
    },

    //gets a single story by id    
    get(id) {
        var sql = 'select * from stories where id=?';
        return connPool.queryAsync(sql, [id])
            .then(function(rows) {
                return rows.length > 0 ? rows[0] : null;
            });
    },
    
    //inserts a new story
    insert(story) {
        //TODO: validate new story
        // - url must be a valid URL
        
        var sql = 'insert into stories (url,title) values (?,?)';
        var params = [story.url, (story.title || story.url)];
        return connPool.queryAsync(sql, params)
            .then(function(results) {
                //since we have default values applied by the database
                //select the row so we can get those default values
                //the newly-generated auto_number value is returned 
                //in results.insertId
                return stories.get(results.insertId);
            });
    },
    
    //upvote an existing story
    upVote(id) {
        //increment the votes column so that we count
        //everyone's vote, even if there are multiple
        //simultaneous upvotes occcurring
        var sql = 'update stories set votes=votes+1 where id=?';
        var params = [id];
        return connPool.queryAsync(sql, params)
            .then(function(results) {
                //get the story again so that we return
                //the current vote count
                return stories.get(id);
            });
    }
};

//public API--callers must supply the connection pool to initialize
module.exports.Model = function(connectionPool) {
    connPool = connectionPool;
    return stories;
}