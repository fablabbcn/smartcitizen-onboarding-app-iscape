export function baseController($scope, $stateParams, scopePayload, AnimationService, $rootScope) {
    $rootScope.lang = $stateParams.lang;
    $scope.$parent.payload = scopePayload;
    AnimationService.animate(scopePayload.index);
    $scope.$parent.segueControl = 'ready';
    $scope.$parent.smartCitizenToggle = '';
}

baseController.$inject = ['$scope', '$stateParams', 'scopePayload', 'AnimationService', '$rootScope'];
