angular.module('news', [])
    .constant('apiRoot', '/api/v1')
    .controller('StoriesController', function($scope, $http, apiRoot) {       
        $scope.newStory = {};
        
        $http.get(apiRoot + '/stories')
            .then(function(response) {
                $scope.stories = response.data;
            });            
        
        $scope.saveStory = function() {
            $http.post(apiRoot + '/stories', $scope.newStory)
                .then(function(response) {
                    $scope.stories.push(response.data);
                    $scope.newStory = {};
                });
        };
        
        $scope.upVote = function(story) {
            $http.post(apiRoot + '/stories/' + (story.id || story._id) + '/votes', {vote: 1})
                .then(function(results) {
                    //results.data contains a new version of the story
                    //with the correct number of votes
                    angular.copy(results.data, story);
                });
        };
        
        $scope.getVotes = function(story) {
            return story.votes + (1 == story.votes ? ' vote' : ' votes');
        };
        
        $scope.getAge = function(story) {
            return moment(story.createdOn).fromNow();
        };
        
    });