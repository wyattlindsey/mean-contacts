'use strict';

angular.module('contactsApp')
  .controller('ProgressBarCtrl', function ($scope) {

    $scope.startProgressBar = function(max) {



      var progressBarModalInstance = $modal.open({
        templateUrl: './components/modal/progressBar.html',
        controller: 'CreationModalInstanceCtrl',
        scope: $scope,
        resolve: {}
      });

      progressBarModalInstance.result.then(function (data) {
        // result of clicking "Create"
      }, function () {
        // cancel
      });


    };
  });

angular.module('contactsApp').controller('ConfirmDeleteInstanceCtrl', function($scope, $modalInstance) {


});