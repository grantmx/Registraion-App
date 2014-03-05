!function (angular){
	var regApp = angular.module("registrationApp",["ngRoute"]);


	regApp.config(function ($routeProvider) {
		$routeProvider.when("/", {
				templateUrl: "index.html",
				controller: "eventList"
			})
			.when("/registrations/:eventid", {
				templateUrl: "registrations.html",
				conroller: "regList"
			})
	});


	regApp.controller("regList", function ($scope, $log, $route, $routeParams){
		$scope.people = [
			{name: "Wilbert Duke", here: false},
			{name: "Tena Guidi", here: true},
			{name: "Suana Burstien", here: false}
		];

		$scope.postRegistrations = function(){
			$log.info($scope.people);
		};
	});



	regApp.controller("eventList", function ($scope, $route){
		$scope.events = [
			{name: "XYZ Conference 2014", url: "/registrations/678"},
			{name: "Kingmakers Conference 2014", url: "/registrations/12345"}
		];
	});

}(window.angular)