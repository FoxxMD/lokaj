angular.module('gtfest')
    .controller('CNCController', CNCController);

// @ngInject
function CNCController($scope, Restangular, UAccount, $rootScope, $state){
    this.account = UAccount;
    this.isEvent = function() { return $state.includes("eventSkeleton"); };
    $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
            console.log('state change error: ' + error);
        })
}
CNCController.$inject = ["$scope", "Restangular", "Account", "$rootScope", "$state"];


