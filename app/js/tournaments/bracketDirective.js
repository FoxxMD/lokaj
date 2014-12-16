/**
 * Created by Matthew on 12/10/2014.
 */
angular.module('gtfest')
    .directive('bracket', bracketDirective);

// @ngInject
function bracketDirective(Tournaments, $stateParams, $q, Brackets){
    return {
        restrict: 'E',
        templateUrl:'/views/tournaments/bracket.html',
        controllerAs: 'bracketCtrl',
        controller: /*@ngInject*/ ["$scope", function ($scope) {
            var that = this;
            this.tour = Tournaments.getCurrent();
            Brackets.setCurrent($stateParams.tournamentId);

        }],
        link: function (scope, elem, attrs) {

            function renderTeam(container, data, score) {
                container.append(data.name);
            }
            function editNill(container, data, doneCB){

            }
            function save(data, userData, returnData){
                console.log(returnData);
                Brackets.setMatchScore(returnData.matchId, returnData.team.name.id, returnData.score)
            }
            Brackets.getCurrent().then(function(response){
                scope.bracketCtrl.bracketData = response;
                $(elem).find('#bracketArea').bracket({
                    init: scope.bracketCtrl.bracketData,
                    save: save,
                    decorator:{
                        edit: editNill,
                        render: renderTeam
                    }
                });
            });
        }
    }
}

bracketDirective.$inject = ["Tournaments", "$stateParams", "$q", "Brackets"];