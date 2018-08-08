export function smartcitizenController($scope, scopePayload, AnimationService){
    $scope.$parent.payload = scopePayload;
    AnimationService.animate(scopePayload.index);
    $scope.$parent.segueControl ='ready';
    $scope.$parent.smartCitizenToggle = 'smartCitizen';
}

smartcitizenController.$inject = ['$scope', 'scopePayload', 'AnimationService'];
