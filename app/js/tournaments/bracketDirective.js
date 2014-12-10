/**
 * Created by Matthew on 12/10/2014.
 */
angular.module('gtfest')
    .directive('bracket', bracketDirective);

// @ngInject
function bracketDirective(Tournaments, $stateParams, $q){
    return {
        restrict: 'E',
        templateUrl:'/views/tournaments/bracket.html',
        controllerAs: 'bracketCtrl',
        controller: /*@ngInject*/ ["$scope", function ($scope) {
            var that = this;
            this.tour = Tournaments.getCurrent();

        }],
        link: function (scope, elem, attrs) {

            function renderTeam(container, data, score) {
                container.append(data.name);
            }
            function editNill(container, data, doneCB){

            }
            function save(data, userData){
                console.log(data);
            }

            Tournaments.getBracket().then(function(response){
                scope.bracketData = response.plain();
                $(elem).find('#bracketArea').bracket({
                    init: scope.bracketData,
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

bracketDirective.$inject = ["Tournaments", "$stateParams", "$q"];