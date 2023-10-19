var app = angular.module('chatbotApp', []);

app.controller('myCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.fetchModule = function(moduleId) {
		return $http({
			method: 'GET',
			url: `/api/module/${moduleId}`,
		}).then(function(response) {
			if (response && response.data && response.data[0]) {
				return response.data[0].moduleName;
			} else {
				return null;
			}
		});
	};

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
				if (result == 'Please enter your employee ID' && subModuleId == 3) {
					createElement();
				} else if (result == 'Please Enter Your Query Here') {
					createOthersSection();
				}
				return {
					botMessagesData: response.data,
					subModuleId: subModuleId
				};
			} else {
				appendBotMessage("Sorry, I couldn't fetch the response.");
				return null;
			}
		});
	};
	
	$scope.fetchQuestions = function(subModuleId) {
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


}]);
