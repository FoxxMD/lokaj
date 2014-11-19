/**
 * Created by Matthew on 8/13/2014.
 */
angular.module('gtfest')
.directive('header', header);

// @ngInject
function header(Events, $rootScope, Games, $state, Account){
    return {
        templateUrl:'views/shared/header.html',
        //restrict:'E',
       controllerAs:'headerCtrl',
        controller: /*@ngInject*/ ["$scope", function($scope){
            this.games = Games;
            this.goToTournaments = function(name) {
                $state.go('eventSkeleton.tournaments',{gameFilter: name});
            };
            this.event = function(){ return Events.getCurrentEvent()};
            this.isAdmin = Account.isLoggedIn() && Events.isAdmin(Account.user());
        }],
        link: function(scope,elem,attrs)
        {

        }
    }
}
header.$inject = ["Events","$rootScope", "Games", "$state", "Account"];
