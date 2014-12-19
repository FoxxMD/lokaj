/**
 * Created by Matthew on 12/18/2014.
 */
angular.module('gtfest')
    .directive('bracketTypesCreator', bracketTC);
// @ngInject
function bracketTC(){
    return {
       restrict: 'E',
       templateUrl: 'views/tournaments/bracketTypeCreator.html',
        controllerAs:'btCtrl',
        scope:{
            game: '=',
            bracketdata: '='
        },
        controller: /*@ngInject*/ ["$scope", "Tournaments", function ($scope, Tournaments) {
            var that = this;
            $scope.bracketData = [];
            this.brackets = $scope.game.bracketTypes;

            this.addBracket = function(id) {
                $scope.bracketData.push(createBracket(id));
            };

            $scope.remove = function (scope) {
                scope.remove();
            };

            function createBracket(bt) {
                return {
                    bracketTypeId: bt.id,
                    order: $scope.bracketData.length+1,
                    seedSize: 0,
                    tournamentId: Tournaments.getCurrent().id,
                    bracketType: bt, //used for rendering only
                    inProgress: false //for rendering only
                }
            }

            this.seedSizes = [2,4,8,16];


        }],
        link: function (scope, elem, attrs) {

        }
    }
}