/**
 * Created by Matthew on 12/16/2014.
 */
// @ngInject
angular.module('gtfest')
    .service('Brackets', ["Restangular", "$q", "$stateParams", "$rootScope","Account","Tournaments", function (Restangular, $q, $stateParams, $rootScope, Account, Tournaments) {
        var currentBracket = undefined;
        var rBracket = undefined;
        var _tourId = undefined;
        var that = this;

        this.getCurrent = function() {
            var deferred = $q.defer();
            rBracket.get().then(function(response){
               deferred.resolve(response.plain());
            });
            return deferred.promise;
        };
        this.setCurrent = function(tournamentId){
            _tourId = tournamentId;
            rBracket = Restangular.all('tournaments').one(tournamentId.toString()).one("bracket");
        };
        this.setMatchScore = function(matchId, participantId, score) {
            return rBracket.one('match', matchId.toString()).patch({participantId: participantId, score: score});
        }

    }]);