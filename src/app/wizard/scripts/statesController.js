'use strict';

angular.module('app').controller('stateCtlr', function($scope, $rootScope, scopePayload, AnimationService){
    $scope.$parent.payload = scopePayload;
    AnimationService.animate(scopePayload.index);

    function setUpSelection(){
        blockSegue();
        $scope.morphControl =['closed'];

        if ($scope.$parent.payload.template == 'selectparts2') {
            $scope.selectionButtons = ['','','',''];
            $scope.partButtons = [false,false,false,false];
        } else {
            $scope.selectionButtons = ['', '', '', ''];
            $scope.partButtons = [false,false,false,false];
        }

        $scope.infoImages = ['app/images/info1.png', 'app/images/info1.png', 'app/images/info1.png', 'app/images/info1.png', 'app/images/question.png','app/images/question.png','app/images/question.png','app/images/question.png' ];
    }
    function prepSegue(){
        $scope.$parent.segueControl ='ready';
    }
    function blockSegue(){
        $scope.$parent.segueControl ='blocked';
    }

    $scope.selectDevice = function(val){
        setUpSelection();
        $scope.selectionButtons[val] = 'active';
        prepSegue();
    };
    $scope.selectLocation = function(val){
        setUpSelection();
        $scope.selectionButtons[val] = 'active';
        prepSegue();
    };


    $scope.selectPart = function(val){
        console.log($scope.selectionButtons);
        if ($scope.tempBlock == true){
            $scope.tempBlock = false;
            return;
        }
        resetter();
        if ($scope.partButtons[val] == true) {
            $scope.partButtons[val] = false;
            $scope.selectionButtons[val] = '';
        } else {
            $scope.partButtons[val] = true;
            $scope.selectionButtons[val] = 'active';
        }
        if ( $scope.partButtons.every( function check(val){
                return val === true; })) {
            prepSegue();
        } else {
            blockSegue();
        }
    };

    function resetter(){
        $scope.payload.segueButton = 'CONTINUE';
        if ($scope.errorState == true){
            $rootScope.$broadcast('removeError');
        }
    }


    $scope.morph = function(val){
        setUpSelection();
        $scope.morphControl[val] = 'open';
    };

    $scope.segueCondition = function(){
        setUpSelection();
        prepSegue();
    };

    setUpSelection();

    /** -- DELEGATE METHODS -- **/
    $scope.$on('blockedSegue', function(){
        for (var i = 0; i < 4; i++){
            if ($scope.selectionButtons[i] == '')
                $scope.selectionButtons[i] = 'error';
        }
        $scope.errorState = true;
    });

    $scope.$on('no', function(){
        resetter();
        blockSegue();
    });


    /** -- INFO METHODS -- **/
    $scope.infoImageOn = function(val){
        if ( $scope.infoImages[val] == 'app/images/info1.png' ){
            $scope.infoImages[val] = 'app/images/info2.png'
        }
        if ( $scope.infoImages[val] == 'app/images/question.png' ){
            $scope.infoImages[val] = 'app/images/question2.png'
        }
    };
    $scope.infoImageOff = function(val){
        if ( $scope.infoImages[val] == 'app/images/info2.png' && !($scope.selectionButtons[val] == 'active') ){
            $scope.infoImages[val] = 'app/images/info1.png'
        }
        if ( $scope.infoImages[val] == 'app/images/question2.png' && !($scope.selectionButtons[val] == 'active') ){
            $scope.infoImages[val] = 'app/images/question.png'
        }
    };

    $scope.infoClick = function(val){
        $scope.$parent.modalBox = 'green';
        var data = [{
                "title": "Placa de Sensores",
                "body": "Aquí es donde están todos los sensores. Se conecta a la placa grande, la placa de datos, así los sensores pueden transmitir lo que miden.",
                "image": "app/images/BOARDS-CUTOUT_0003_SENSOR-BOARD-BLUE.png"
            }, {
               "title": "Placa de Datos",
               "body": "Aquí es donde toda la computación ocurre. Siempre que quieras conectar algo al Smart Citizen, debe estar en esta placa",
               "image": "app/images/BOARDS-CUTOUT_0002_HARDWARE-BOARD-WHITE.png"
            }, {
               "title": "Batería",
               "body": "Esto le da alimentación al dispositivo. Cada cierto tiempo debe ser recargada, especialmente después de largos periodos de uso continuo.",
               "image": "app/images/BOARDS-CUTOUT_0006_BATTERY2.png"
            }, {
               "title": "Cable USB",
               "body": "Cuando el Kit necesite ser cargado, puedes conectar este cable a tu ordenador o enchufe, y de vuelta al Kit.",
               "image": "app/images/BOARDS-CUTOUT_0005_USBgreen.png"
            }, {
               "title": "Carcasa hecha a medida",
               "body": "La carcasa protege el dispositivo de la lluvia y permite fijarlo por ejemplo en tu balcón.",
               "image": "app/images/BOARDS-CUTOUT_0008_ANGLED.png"
            }, {
                "title": "Espaciadores",
                "body": "Fijan la placa de sensores con la placa de datos para que todo quede más robusto.",
                "image": "app/images/spacers.png"
            }, {
                "title": "Tapa",
                "body": "Cierra la carcasa y protege el dispositivo de la llúvia. Fijate que la parte con agujeros queda sobre el sensor de sonido.",
                "image": "app/images/screen.png"
            }, {
                "title": "Sujetadores",
                "body": "Fijan la tapa con la carcasa.",
                "image": "app/images/plugs.png"
        }];
        data[val].button = 'OK, got it';
        $scope.$parent.modalContent = data[val];
        $scope.tempBlock = true;
        $rootScope.$broadcast('modal');
    };

});