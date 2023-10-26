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
		concole.log(response.data)
      const link = `<a href="/Policy/${response.data[1].File_name}" target="_blank">${response.data[1].File_name}</a>`;
      const botResponse = `${response.data[0].answer} -Please Refer this document for more information ${link}`;
	 
      // Remove the loading GIF
      appendBotMessage(botResponse);

      return response.data;
    } else {
      // Handle the error and remove the loading GIF
      const errorMessage = 'An error occurred.';
      appendBotMessage(errorMessage);

      return null;
    }
  });
};

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
				} else if (result == 'Please enter your query here') {
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
			url: `/api/questions/by-subModule/${subModuleId}`,
		}).then(function(response) {
			if (response && response.data) {
				return response.data.map(item => item.questions);
			} else {
				return null;
			}
		});
	};
	$scope.fetchBotResponse = function(question) {
		return $http({
			method: 'GET',
			url: `/api/botMessages/by-userQuestion/${question}`,
		}).then(function(response) {
			if (response && response.data) {
				appendBotMessage(response.data[0].botMessages);
				//if (response.data[0].document == '1') {
					//var query = response.data[0].botMessages;
					//$scope.fetchChatAiResponse(query);
				//}
				return response.data;
			} else {
				return null;
			}
		});
	};

}]);

