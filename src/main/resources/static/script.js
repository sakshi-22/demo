const chatContent = document.getElementById('chatContent');
const chatInputs = document.getElementById('chatInputs');
const hrPulseDiv = document.querySelector('.chatcustomchange[data-type="hrPulse"]');
const itDiv = document.querySelector('.chatcustomchange[data-type="itService"]');
const travelDiv = document.querySelector('.chatcustomchange[data-type="travel"]');
const mediclaimDiv = document.querySelector('.chatcustomchange[data-type="mediclaim"]');
const faqDiv = document.querySelector('.chatcustomchange[data-type="faq"]');
const options1 = ['--SELECT--', 'Leaves', 'medical', 'payroll', 'comp & ben', 'claims', 'ESIC', 'careers'];
const optionsHR = ['--SELECT--', 'Leave balance', 'Holiday calendar', 'RM Change Request', 'My Current Location', 'Location Change Request', 'Others'];
const optionsForIt = ['--SELECT--', 'PC Slowness', 'Blue Screen', 'Account Unlock', 'Password Reset', 'Software Installation', 'Software Uninstallation', 'Network Slowness Issue', 'Others'];
const optiontravel = ['--SELECT--', 'Domestic Travel Policy', 'International Travel Policy', 'Others'];
const optionsmediclaim = ['--SELECT--', 'My Group Policy Number', 'Download Group Policy', 'Intimation for Treatment', 'Others'];
const optionsfaq = ['--SELECT--', 'List of FAQ', 'Others'];
const optionsLocation = ['Noida', 'Mumbai', 'Bangalore', 'Hyderabad'];
const hrOptions = ['Suchitra Mitra', 'Sakshi Patanker', 'Apoorva Shukla'];
let fdetails = {};
let isMuted = false;
let timer;
let activeSection = null;
var moduleId = 0;

hrPulseDiv.addEventListener('click', function() {
	clearTimeout(timer);
	clearChatInputs();
	//moduleId = 1;
	//fetchSubModule(moduleId);
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
		removeOtherSection();
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
		removeOtherSection();
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
		removeOtherSection();
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
		removeOtherSection();
	}
	askforfaq();
	activeSection = 'faq';
});

function removeOptions() {
	const botOptions = document.querySelector('.chat-messageOptions.bot-messageOptions');
	if (botOptions) {
		botOptions.remove();
	}
}

timer = setTimeout(function() {
	appendBotMessage("Is there any concern you are facing,Would you like to raise a ticket? ");
	if (activeSection !== null) {
		removeOptions();
	}
	askForYesOrNo();
	activeSection = 'hrPulse';
}, 180000);

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
	appendBotMessage('Which option do you like to choose? ');
	moduleId = 1;
	scope.fetchSubModule(1).then(function(data) {
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
	clearChatInputs();
	appendBotMessage('Which Travel policy do you want to know about?');
	appendBotOptions(optiontravel);
}

function askFormediclaim() {
	clearChatInputs();
	appendBotMessage('Which Mediclaim policy do you want to know about?');
	appendBotOptions(optionsmediclaim);
}

function askForLocation() {
	return new Promise((resolve) => {
		clearChatInputs();
		appendBotMessage('Select your Location');
		createDropdownWithOptions(optionsLocation,8);
		setTimeout(() => {
			console.log("askForLocation completed");
			resolve();
		}, 4000);
	});
}

function askForHr() {
	clearChatInputs();
	appendBotMessage('Please select your HR to whom you want to sent mail');
	createDropdownWithOptions(hrOptions,10);
	
	
}

function askforfaq() {
	clearChatInputs();
	appendBotMessage('Please select your question...');
	appendBotOptions(optionsfaq);
}


function appendBotOptions(data, moduleId) {
	const chatMessage = document.createElement('div');
	chatMessage.className = 'chat-messageOptions bot-messageOptions';
		if (data && data.length > 0) {
			const select = document.createElement('select');
			const defaultOption = document.createElement('option');
			defaultOption.value = '';
			defaultOption.text = '--Select--';
			select.appendChild(defaultOption);
			data.forEach(subModule => {
				const optionElement = document.createElement('option');
				optionElement.value = subModule.subModuleName;
				optionElement.text = subModule.subModuleName;
				select.appendChild(optionElement);
			});
			select.addEventListener('change', function() {
				const selectedOption = select.options[select.selectedIndex].text;
				var scope = angular.element(document.querySelector('[ng-controller=myCtrl]')).scope();
				scope.fetchBotMessages(selectedOption).then(function(data) {
				});
				appendUserMessage(selectedOption);
			});
			chatMessage.appendChild(select);
		} else {
			chatMessage.textContent = 'No sub-modules available for this module.';
		}
	chatInputs.appendChild(chatMessage);
	scrollToBottom();
}
function createDropdownWithOptions(options,chatresponses) {
	const chatMessage = document.createElement('div');
	chatMessage.className = 'chat-messageOptions bot-messageOptions';
	const select = document.createElement('select');
	const defaultOption = document.createElement('option');
	defaultOption.value = '';
	defaultOption.text = '--Select--';
	select.appendChild(defaultOption);

	options.forEach(optionText => {
		const optionElement = document.createElement('option');
		optionElement.value = optionText;
		optionElement.text = optionText;
		select.appendChild(optionElement);
	});
	
	select.addEventListener('change', function() {
		const selectedOption = select.options[select.selectedIndex].text;
		appendUserMessage(selectedOption);
		if(chatresponses==10){
			appendBotMessage('Email Sent Successfully...');
		}

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
function displayMessage(){
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

function createOthersSection(){
	chatInputs.innerHTML = `
        <input type="text" id="query">
        <button id="nextButton" onclick="sendQuery()">Send</button>
    `;
}

function sendQuery (){
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

