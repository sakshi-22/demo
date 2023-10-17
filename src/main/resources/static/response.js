var app = angular.module('chatbotApp', []);

app.controller('myCtrl', ['$scope', '$http', function($scope, $http) {
	// ...

	// Define the fetchSubModule function within the controller's scope
	$scope.fetchSubModule = function(moduleId) {
		return $http({
			method: 'GET',
			url: `/api/submodules/by-module/${moduleId}`,
		}).then(function(response) {
			if (response && response.data) {
				return response.data;
			} else {
				return null;
			}
		});
	};

	$scope.fetchLocation = function() {
		return $http({
			method: 'GET',
			url: `/api/location`,
		}).then(function(response) {
			if (response && response.data) {
				return response.data;
			} else {
				return null;
			}
		});
	};
	
	$scope.fetchChatAiResponse = function(query) {
		appendUserMessage(query);
		return $http({
			method: 'GET',
			url: `/api/chatAi/byQuery/${query}`,
		}).then(function(response) {
			if (response && response.data) {
				appendBotMessage(response.data[0].answer);
				return response.data;
			} else {
				return null;
			}
		});
	}

	$scope.fetchBotMessages = function(userMessages) {
		return $http({
			method: 'GET',
			url: `api/chatresponses/by-userMessage/${userMessages}`,
		}).then(function(response) {
			if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
				appendBotMessage(response.data[0].botMessages);
				var result = response.data[0].botMessages;
				var subModuleId = response.data[0].subModuleName.subModuleId;
				console.log(response.data[0].botMessages);
				if (result == 'Please enter your employee ID' && subModuleId == 3) {
					createElement();
				}else if(result == 'Please Enter Your Query Here'){
					createOthersSection();
					}
				return response.data;
			} else {
				// Handle the case when there's no valid message.
				appendBotMessage("Sorry, I couldn't fetch the response.");
				return null;
			}
		});
	
	};
	
}]);
