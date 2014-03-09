var grantmx = grantmx || {};


!function ($, grantmx){
	grantmx.scrollTo = function(){
		return /mobile/i.test(navigator.userAgent) && !location.hash && setTimeout(function () { window.scrollTo(0, 1); }, 1000);
	}();
}(window.jQuery, window.grantmx);



!function (angular){
	var regApp = angular.module("registrationApp",["ngRoute", "ngAnimate"]);


	/* Route Configs
	--------------------------------------------------*/
	regApp.config(function ($routeProvider) {
		$routeProvider.when("/", {
				templateUrl: "eventlist.html",
				controller: "EventList",
				depth: 1
			})
			.when("/registrations/:eventid", {
				templateUrl: "registrations.html",
				conroller: "RegList",
				depth: 2
			})
			.otherwise({
				redirectTo:'/',
				depth: 1
			});
	});

	/* Animation on route change
	--------------------------------------------------*/
	regApp.run(function ($rootScope, $window) {
		// publish current transition direction on rootScope
		$rootScope.direction = 'ltr';
		// listen change start events
		$rootScope.$on('$routeChangeStart', function (event, next, current) {
			$rootScope.direction = 'rtl';
		//console.log(arguments);
			if (current && next && (current.depth > next.depth)) {
				$rootScope.direction = 'ltr';
			}
			// back
			$rootScope.back = function () {
				$window.history.back();
			}
		});
	});


	/* Registration list controller - updates the list 
	--------------------------------------------------*/
	regApp.controller("RegList", function ($scope, $log, $route, $routeParams, $q, $http){
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
			if(validateAddition()){
				$scope.people.push({name: $scope.newName, here: false, added: true});
				$scope.newName = "";
			}
		};


		//remove recently added people from the list
		$scope.removePerson = function(){
			var i, person, yesDelete, 
				people = $scope.people,
				thisPerson = this.folk.name;

			for (i = people.length - 1; i >= 0; i -= 1) {
				if(people[i].name === thisPerson){
					person = people.indexOf(people[i]);
				}
			}
			
			yesDelete = confirm("Are you sure you want to delete "+ thisPerson +"?")

			return (yesDelete) ? $scope.people.splice(person, 1) : false;
		};


		//validates the form for new additions
		function validateAddition(){
			var el = $("#newName");
			return (el.val() !== "") ? true : alert("Please Enter A Name!");
		}

		//open the modal to add new people
		$(document).on("click", "#add", function(e){
			$('#addPeople').modal({
				show: true,
				backdrop: 'static',
				keyboard: false
			}); 
		})


	});


	/* Event listings controller 
	--------------------------------------------------*/
	regApp.controller("EventList", function ($scope, $route, $http){
		$scope.events = [
			{name: "XYZ Conference 2014", url: "#/registrations/678"},
			{name: "Conference 2014", url: "#/registrations/12345"}
		];
	});
	
}(window.angular);