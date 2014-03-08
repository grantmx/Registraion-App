!function (angular){
	var regApp = angular.module("registrationApp",["ngRoute"]);


	regApp.config(function ($routeProvider) {
		$routeProvider.when("/", {
				templateUrl: "eventlist.html",
				controller: "EventList"
			})
			.when("/registrations/:eventid", {
				templateUrl: "registrations.html",
				conroller: "RegList"
			})
			.when("/add/", {
				templateUrl: "add-people.html",
				conroller: "RegList"
			})
			.otherwise({
				redirectTo:'/'
			});
	});


	regApp.controller("RegList", function ($scope, $log, $route, $routeParams, $q){
		var defer = $q.defer();

		$scope.people = [];

		defer.promise
			.then(function (eventid){
				console.log(eventid);

				if(eventid === "678"){
					$scope.people = [
						{name: "Wilbert Duke", here: false},
						{name: "Tena Guidi", here: true},
						{name: "Suana Burstien", here: false}
					];
				}

				if(eventid === "12345"){
					$scope.people = [
						{name: "Leona Kamierczak", here: true},
						{name: "Randolph Overfield", here: true},
						{name: "Landon Greely", here: false},
						{name: "Bob Barker", here: false},
						{name: "Daniel Day", here: false},
						{name: "Herbert Wolf", here: false},
						{name: "Jon Bonjovi", here: false},
						{name: "Grant Marshall", here: false},
						{name: "Marshall Grant", here: false}
					];
				}
			})

		defer.resolve($routeParams.eventid);

		//sends list to the server
		$scope.postRegistrations = function(){
			$log.info($scope.people);
		};

		//adds new people to the list
		$scope.addToList = function(){
			$scope.people.push({name: $scope.newName, here: false, added: true});

			$scope.newFirstName = "";
			$scope.newLastName = "";
		};

	});



	regApp.controller("EventList", function ($scope, $route){
		$scope.events = [
			{name: "XYZ Conference 2014", url: "registrations/678"},
			{name: "Conference 2014", url: "registrations/12345"}
		];
	});




}(window.angular)