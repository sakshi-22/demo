const chatContent = document.getElementById('chatContent');
const chatInputs = document.getElementById('chatInputs');
const hrPulseDiv = document.querySelector('.chatcustomchange[data-type="hrPulse"]');
const itDiv = document.querySelector('.chatcustomchange[data-type="itService"]');
const travelDiv = document.querySelector('.chatcustomchange[data-type="travel"]');
const mediclaimDiv = document.querySelector('.chatcustomchange[data-type="mediclaim"]');
const payrollDiv = document.querySelector('.chatcustomchange[data-type="payroll"]');
const faqDiv = document.querySelector('.chatcustomchange[data-type="faq"]');
const optionsLocation = ['Noida', 'Mumbai', 'Bangalore', 'Hyderabad'];
let isMuted = false;
let timer;
let activeSection = null;
var moduleId = 0;

hrPulseDiv.addEventListener('click', function() {
	clearTimeout(timer);
	clearChatInputs();
	appendUserMessage('HR Pulse');
	askForHrPulse();
	if (activeSection !== null) {
		removeOptions();
		//removeOtherSection();
	}
	activeSection = 'hrPulse';
});

itDiv.addEventListener('click', function() {
	clearTimeout(timer);
	clearChatInputs();
	clearTimeout(timer);
	appendUserMessage('IT SERVICE');
	if (activeSection !== null) {
		removeOptions();
		//removeOtherSection();
	}
	askForItService();
	activeSection = 'itService';
});

travelDiv.addEventListener('click', function() {
	clearChatInputs();
	clearTimeout(timer);
	appendUserMessage('TRAVEL');
	if (activeSection !== null) {
		removeOptions();
		//removeOtherSection();
	}
	askForTravel();
	activeSection = 'travel';
});

mediclaimDiv.addEventListener('click', function() {
	clearChatInputs();
	clearTimeout(timer);
	appendUserMessage('MEDICLAIM');
	if (activeSection !== null) {
		removeOptions();
	//	removeOtherSection();
	}
	askFormediclaim();
	activeSection = 'mediclaim';
});

faqDiv.addEventListener('click', function() {
	clearChatInputs();
	clearTimeout(timer);
	appendUserMessage('FAQ');
	if (activeSection !== null) {
		removeOptions();
		//removeOtherSection();
	}
	askforfaq();
	activeSection = 'faq';
});

payrollDiv.addEventListener('click', function() {
	clearChatInputs();
	clearTimeout(timer);
	appendUserMessage('PAYROLL');
	if (activeSection !== null) {
		removeOptions();
		//removeOtherSection();
	}
	askForPayroll();
	activeSection = 'payroll';
});
function removeOptions() {
	const botOptions = document.querySelector('.chat-messageOptions.bot-messageOptions');
	if (botOptions) {
		botOptions.remove();
	}
}

//timer = setTimeout(function() {
	//appendBotMessage("Is there any concern you are facing,Would you like to raise a ticket? ");
	//if (activeSection !== null) {
		//removeOptions();
	//}
	//askForYesOrNo();
	//activeSection = 'hrPulse';
//}, 180000);

function appendUserMessage(message) {
	const userMsg = document.createElement('div');
	userMsg.className = 'chat-message user-message';
	userMsg.textContent = message;
	chatContent.appendChild(userMsg);
	scrollToBottom();
}

function appendBotMessage(message) {
	const botMsg = document.createElement('div');
	botMsg.className = 'chat-message bot-message';
	botMsg.innerHTML = message;
	chatContent.appendChild(botMsg);
	textToSpeech(message);
	scrollToBottom();
}

function scrollToBottom() {
	chatContent.scrollTop = chatContent.scrollHeight;
}

function askForYesOrNo() {
	chatInputs.innerHTML = `
        <button onclick="collectYes()">Yes</button>
		<button onclick="collectNO()">No</button>
    `;
}

function collectYes() {
	chatInputs.innerHTML = ` `;
	appendUserMessage('yes');
	appendBotMessage("Which section are you facing the concern?");
	appendBotOptions(options1);
	scrollToBottom();
}

function askForHrPulse() {
	var scope = angular.element(document.querySelector('[ng-controller=myCtrl]')).scope();
	scope.fetchBotMessages('HR Pulse').then(function(data) {
	});
	moduleId = 1;
	scope.fetchSubModule(moduleId).then(function(data) {
		if (data && Array.isArray(data)) {
			appendBotOptions(data, moduleId);
		}

	});
}

function askForItService() {
	var scope = angular.element(document.querySelector('[ng-controller=myCtrl]')).scope();
	appendBotMessage('Which option do you like to choose? ');
	moduleId = 2;
	scope.fetchSubModule(2).then(function(data) {
		if (data && Array.isArray(data)) {
			appendBotOptions(data, moduleId);
		}
	});
}
function askForTravel() {
	var scope = angular.element(document.querySelector('[ng-controller=myCtrl]')).scope();
	appendBotMessage('Which option do you like to choose? ');
	moduleId = 3;
	scope.fetchSubModule(moduleId).then(function(data) {
		if (data && Array.isArray(data)) {
			appendBotOptions(data, moduleId);
		}
	});
}

function askFormediclaim() {
	var scope = angular.element(document.querySelector('[ng-controller=myCtrl]')).scope();
	appendBotMessage('Which option do you like to choose? ');
	moduleId = 4;
	scope.fetchSubModule(moduleId).then(function(data) {
		if (data && Array.isArray(data)) {
			appendBotOptions(data, moduleId);
		}
	});
}
function askForPayroll() {
	var scope = angular.element(document.querySelector('[ng-controller=myCtrl]')).scope();
	appendBotMessage('Which option do you like to choose? ');
	moduleId = 6;
	scope.fetchSubModule(moduleId).then(function(data) {
		if (data && Array.isArray(data)) {
			appendBotOptions(data, moduleId);
		}
	});
}
function askforfaq() {
	var scope = angular.element(document.querySelector('[ng-controller=myCtrl]')).scope();
	moduleId = 5;
	scope.fetchBotMessages('FAQ').then(function(data) {
	});
}

function askForLocation() {
	return new Promise((resolve) => {
		clearChatInputs();
		appendBotMessage('Select your Location');
		createDropdownWithOptions(optionsLocation, 8);
		setTimeout(() => {
			console.log("askForLocation completed");
			resolve();
		}, 4000);
	});
}

function askForHr() {
	clearChatInputs();
	appendBotMessage('Please select your HR to whom you want to sent mail');
	createDropdownWithOptions(hrOptions, 10);
}



function appendBotOptions(data, moduleId) {
	const chatMessage = document.createElement('div');
	chatMessage.className = 'chat-messageOptions bot-messageOptions';
	const homeIconDiv = document.createElement('div');
    homeIconDiv.className = 'homeIcon';
    //const button = document.createElement('button');
  	const image = document.createElement('img');
    image.src = 'assests/Home.svg';
    image.alt = 'Home';
    image.className = 'homeIcon-img'; 
    //button.appendChild(image);
    homeIconDiv.appendChild(image);
	const select = document.createElement('select');
	select.className = 'first-dropdown';
	const defaultOption = document.createElement('option');
	defaultOption.value = '';
	defaultOption.style.fontWeight = 'bold';
	//defaultOption.disabled = true;
	defaultOption.style.color = 'green';       
	defaultOption.style.backgroundColor = '#f2f2f2';
	defaultOption.style.padding = '5px';
	select.appendChild(defaultOption);
	var scope = angular.element(document.querySelector('[ng-controller=myCtrl]')).scope();
	scope.fetchModule(moduleId).then(function(moduleName) {
		defaultOption.text = `__${moduleName}__` || 'Unknown Module'; // Set the moduleName or a default text
	});
	if (data && data.length > 0) {
		data.forEach(subModule => {
			const optionElement = document.createElement('option');
			optionElement.value = subModule.subModuleName;
			optionElement.text = subModule.subModuleName;
			select.appendChild(optionElement);
			optionElement.setAttribute('data-submodule-id', subModule.subModuleId);
		});
		select.addEventListener('change', function() {
			if (select.value === 'default') {
				return;
			}
			const selectedOption = select.options[select.selectedIndex].text;
			const selectedSubModuleId = select.options[select.selectedIndex].getAttribute('data-submodule-id');
			console.log('Selected SubModule ID:', selectedSubModuleId);
			scope.fetchQuestions(selectedSubModuleId).then(function(questionsData) {
				createDropdownQuestions(questionsData,selectedOption);
			});

			scope.fetchBotMessages(selectedOption).then(function(data) {
			});

			appendUserMessage(selectedOption);
		});
		
		chatMessage.appendChild(select);
	} else {
		chatMessage.textContent = 'No sub-modules available for this module.';
	}
	chatMessage.appendChild(homeIconDiv);
	chatInputs.appendChild(chatMessage);
	scrollToBottom();
}

function createDropdownQuestions(questionsData,defaultText) {
	var scope = angular.element(document.querySelector('[ng-controller=myCtrl]')).scope();
	const firstDropdowns = document.querySelectorAll('.first-dropdown');
    firstDropdowns.forEach(function(dropdown) {
        dropdown.parentElement.style.display = 'none';
    });
    const chatMessage = document.createElement('div');
    chatMessage.className = 'chat-messageOptions bot-messageOptions';
    const select = document.createElement('select');
    select.className = 'second-dropdown';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = `__${defaultText}__` || 'Unknown Module';
    defaultOption.style.fontWeight = 'bold';
	defaultOption.disabled = true;
	defaultOption.style.color = 'green';       
	defaultOption.style.backgroundColor = '#f2f2f2';
	defaultOption.style.padding = '5px';
    
    select.appendChild(defaultOption);

    questionsData.forEach(question => {
        const optionElement = document.createElement('option');
        optionElement.value = question;  // Assuming questionsData is an array of strings.
        optionElement.text = question;
        select.appendChild(optionElement);
    });

    select.addEventListener('change', function() {
        const selectedOption = select.options[select.selectedIndex].text;
           appendUserMessage(selectedOption);
        scope.fetchBotResponse(selectedOption).then(function(questionsData) {
				
			});
        // You can add more logic here if needed when a question is selected
    });

    chatMessage.appendChild(select);
    chatInputs.appendChild(chatMessage);
    scrollToBottom();
}
function promptForLoginName() {
	appendBotMessage('Please enter the Employee login name:');
	chatInputs.innerHTML = `
        <input type="text" id="loginNameInput" placeholder="Login Name">
        <button onclick="collectLoginName()">Submit</button>
    `;
}

function collectLoginName() {
	const loginName = document.getElementById('loginNameInput').value;
	appendUserMessage(loginName);
	promptForNewPassword();
}

function promptForNewPassword() {
	appendBotMessage('Please enter the new password:');
	chatInputs.innerHTML = `
        <input type="password" id="passwordInput" placeholder="New Password">
        <button onclick="collectPassword()">Submit</button>
    `;
}

function collectPassword() {
	const newPassword = document.getElementById('passwordInput').value;
	appendUserMessage("*******"); // Mask the password in chat for security
	appendBotMessage("Password reset request received. Processing...");
}
function displayMessage() {
	const chatBarBottom = document.getElementById("ThankYouContainer");
	let sucessMsg = document.getElementById("sucessMsg");
	chatBarBottom.innerHTML = "Email sent successfully";
	sucessMsg.style.display = "block";
	chatBarBottom.style.opacity = '1';
	chatBarBottom.style.animation = 'thankYouAnimation 1s ease-out';
}

function finish() {
	let HideMydiv = document.getElementById("chatInputs");
	let myDiv = document.getElementById("chat-bar-bottom");
	let btn = document.createElement("button");
	HideMydiv.style.display = "none";
	myDiv.style.display = "block";
	btn.innerHTML = "Submit";
	btn.type = "submit";
	btn.name = "formBtn";
	myDiv.appendChild(btn);
	btn.addEventListener("click", displayMessage);
	chatInputs.innerHTML = '';
}

function textToSpeech(text) {
	if (isMuted) {
		return;
	}
	let synth = window.speechSynthesis;
	let utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = 'en-US';
	synth.speak(utterance);
}

// Start the chatbot
document.addEventListener("DOMContentLoaded", function() {
});

function toggleMute() {
	isMuted = !isMuted;
	const soundImage = document.getElementById('soundImage');
	const muteImage = document.getElementById('muteImage');
	const speakImage = document.getElementById('speakImage');
	if (isMuted) {
		soundImage.style.display = 'none';
		muteImage.style.display = 'block';
		speakImage.style.display = 'none';
	} else {
		soundImage.style.display = 'none';
		muteImage.style.display = 'none';
		speakImage.style.display = 'block';
	}
}

document.getElementById("allincall-popup").addEventListener("click", function() {
	var chatbotDiv = document.querySelector(".chatbot");
	var chatboatImg = document.querySelector("#allincall-popup");
	if (chatbotDiv.style.display === "none" || chatbotDiv.style.display === "") {
		chatbotDiv.style.display = "block";
		chatboatImg.style.display = "none";
		textToSpeech("Hello I am Astor, how may I help you? Check out quick links below ");
	} else {
		initializeChatbot();
		chatbotDiv.style.display = "none";
		$(this).style.display = "block";
	}
});

document.getElementById("closeButton").addEventListener("click", function() {
	var chatbotDiv = document.querySelector(".chatbot");
	var chatboatImg = document.querySelector("#allincall-popup");
	if (chatbotDiv.style.display === "block" || chatbotDiv.style.display === "") {
		chatbotDiv.style.display = "none";
		chatboatImg.style.display = "block";
	} else {
		initializeChatbot();
		chatbotDiv.style.display = "block";
		$(this).style.display = "none";
	}
});

function initializeChatbot() {
	chatContent.innerHTML = '';
	//askForName();
}

document.getElementById('refreshbutton').addEventListener('click', function() {
	refreshLanguageChat('chatContent', 'chatInputs', 'chat-bar-bottom');
});

function refreshLanguageChat(chatContentId, chatInputsId, chatBarBottomId) {

	const chatContainer = document.getElementById(chatContentId);
	while (chatContainer.children.length > 2) {
		chatContainer.removeChild(chatContainer.lastChild);
	}
	document.getElementById(chatBarBottomId).style.display = 'none';
	const chatInputs = document.getElementById(chatInputsId);
	while (chatInputs.children.length > 0) {
		chatInputs.removeChild(chatInputs.lastChild);
	}
}
function clearChatInputs() {
	chatInputs.innerHTML = '';
}

function otherSection() {
	chatInputs.innerHTML = `
        <input type="text" id="others" placeholder='enter here.....' >
        <button id="nextButton" onclick="">Send</button>
    `;
}
function removeOtherSection() {
	chatInputs.innerHTML = '';
}
function createElement() {
	chatInputs.innerHTML = `
        <input type="text" id="inputValue">
        <button id="nextButton" onclick="sendInputToAngular()">Send</button>
    `;
}

function createOthersSection() {
	chatInputs.innerHTML = `
        <input type="text" id="query">
        <button id="nextButton" onclick="sendQuery()">Send</button>
    `;
}

function sendQuery() {
	debugger
	var scope = angular.element(document.querySelector('[ng-controller=myCtrl]')).scope();
	const query = document.getElementById('query').value;
	scope.fetchChatAiResponse(query).then(function(query) {
	});
}

async function sendInputToAngular() {
	const inputValue = document.getElementById('inputValue').value;
	appendUserMessage(inputValue);
	try {
		await askForLocation();
		console.log("askForLocation has completed, now calling askForHr");
		askForHr();
	} catch (error) {
		console.error("Error in askForLocation:", error);
	}

}
