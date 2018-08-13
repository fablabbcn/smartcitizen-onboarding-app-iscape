export function smartcitizenController($scope, scopePayload, AnimationService){
    $scope.$parent.payload = scopePayload;
    AnimationService.animate(scopePayload.index);
    $scope.$parent.segueControl ='ready';
}

smartcitizenController.$inject = ['$scope', 'scopePayload', 'AnimationService'];
