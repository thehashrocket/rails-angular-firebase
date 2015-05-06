angular.module('AngularRails')
    .controller('AcctCtrl', ["currentAuth", "Auth", "$scope","$location","$timeout","UserData","$q",
        function(currentAuth, Auth, $scope, $location, $timeout, UserData, $q)  {

    $scope.auth = Auth;
    $scope.email = '';

    var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");

    var callback = function(){
      $scope.$apply()
    }

    // any time auth status updates, add the user data to scope
      $scope.auth.$onAuth(function(authData) {
        $scope.authData = authData;
        if (authData) {
        	$scope.displayName = UserData.getName(authData);

          UserData.getAddress(authData).then(function(response){
            if (response != null) {
              $scope.address = response;
            } else {
              $scope.address = '';
            }
          }); // getAddress

          UserData.getPhone(authData).then(function(response){
            if (response != null) {
              $scope.phone = response;
            } else {
              $scope.phone = '';
            }
          }); // getAddress


        }

      });

      $scope.step1 = function() {

        if ($scope.email) {

          var onComplete = function(error) {
            if (error) {
              console.log('Synchronization failed');
              $location.path('/account/step1');
            } else {
              console.log('Synchronization succeeded');
              $timeout(function(){
                   $location.path('/');
              },1); // timeout
            }
          };

          ref.child('users').child(currentAuth.uid).update({ email: this.email }, onComplete);

          $scope.email = '';
        }
      } // $scope.step1

      $scope.addressUpdate = function() {

        address = $scope.profile;

        if ($scope.profile) {

          var onComplete = function(error) {
            if (error) {
              console.log('Synchronization failed');
              // $location.path('/account/step1');
            } else {
              console.log('Synchronization succeeded');
              // $location.path('/');
            }
          };

          ref.child('address').child(currentAuth.uid).set({

            "streetaddress": address.streetaddress,
            "city": address.city,
            "state": address.state,
            "zip": address.zip,

           }, onComplete);

          $scope.email = '';

          $scope.address = address;
        }
      } // $scope.addressUpdate

      $scope.phoneUpdate = function() {

        phone = $scope.phone;

        if ($scope.phone) {

          var onComplete = function(error) {
            if (error) {
              console.log('Synchronization failed');
              // $location.path('/account/step1');
            } else {
              console.log('Synchronization succeeded');
              // $location.path('/');
            }
          };

          ref.child('phone').child(currentAuth.uid).set({

            "personal": phone.personal,
            "work": phone.work

           }, onComplete);

          $scope.phone = phone;
        }
      } // $scope.addressUpdate


}]);
