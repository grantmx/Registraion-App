var grantmx = grantmx || {};


!function ($, grantmx){
	grantmx.scrollTo = function(){
		return /mobile/i.test(navigator.userAgent) && !location.hash && setTimeout(function () { window.scrollTo(0, 1); }, 1000);
	}();
}(window.jQuery, window.grantmx);


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
			.otherwise({
				redirectTo:'/'
			});
	});


	regApp.controller("RegList", function ($scope, $log, $route, $routeParams, $q){
		var defer = $q.defer();

		$scope.people = [];

		defer.promise
			.then(function (eventid){
				if(eventid === "678"){
					$scope.people = [
						{name: "Wilbert Duke", here: false},
						{name: "Tena Guidi", here: true},
						{name: "Suana Burstien", here: false}
					];
				}

				if(eventid === "12345"){
					$scope.people = [
						{name: "Leona Kamierczak", here: true, added: false},
						{name: "Randolph Overfield", here: true, added: false},
						{name: "Landon Greely", here: false, added: false},
						{name: "Bob Barker", here: false, added: false},
						{name: "Daniel Day", here: false, added: false},
						{name: "Herbert Wolf", here: false, added: false},
						{name: "Jon Bonjovi", here: false, added: false},
						{name: "Grant Marshall", here: false, added: false},
						{name: "Marshall Grant", here: false, added: false}
					];
				}
			})

		defer.resolve($routeParams.eventid);


		//send list to the server
		$scope.postRegistrations = function(){
			$log.info($scope.people);
		};


		//add new people to the list
		$scope.addToList = function(){
			$scope.people.push({name: $scope.newName, here: false, added: true});
			$scope.newName = "";
		};

		//remove recently added people from the list
		$scope.removePerson = function(){
			var i, person, yesDelete, thisPerson = this.folk.name;

			for (i = $scope.people.length - 1; i >= 0; i -= 1) {
				if($scope.people[i].name === thisPerson){
					person = $scope.people.indexOf($scope.people[i]);
				}
			}
			
			yesDelete = confirm("Are you sure you want to delete "+ thisPerson +"?")

			return (yesDelete) ? $scope.people.splice(person, 1) : false;
		};


		$(document).on("click", "#add", function(e){
			$('#addPeople').modal({
				show: true,
				backdrop: 'static',
				keyboard: false
			}); 
		})


	});



	regApp.controller("EventList", function ($scope, $route){
		$scope.events = [
			{name: "XYZ Conference 2014", url: "registrations/678"},
			{name: "Conference 2014", url: "registrations/12345"}
		];
	});
}(window.angular);