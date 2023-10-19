package com.botpulse.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.botpulse.demo.entity.ChatResponses;
import com.botpulse.demo.entity.ModuleMaster;
import com.botpulse.demo.entity.SubModule;
import com.botpulse.demo.entity.UserQuestions;
import com.botpulse.demo.repository.ChatResponseRepository;
import com.botpulse.demo.repository.ModuleMasterRepository;
import com.botpulse.demo.repository.SubModuleRepository;
import com.botpulse.demo.repository.UserQuestionRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ChatBotController {
	
	private final String LOC_URL ="https://3i.honohr.com/sapi/Empdetails/getAllEmployeeInformation";
	
	@Autowired
	private SubModuleRepository subModuleRepository;

	@Autowired
    private ChatResponseRepository chatResponseRepository;
	
	@Autowired
	private ModuleMasterRepository moduleMasterRepository;
	
//	@Autowired
//	private EmpJobLocationMasterRepository empJobLocationMasterRepository;
	
	@Autowired
	private UserQuestionRepository userQuestionRepository;

   
     public ChatBotController(ChatResponseRepository chatResponseRepository) {
 		this.chatResponseRepository = chatResponseRepository;
     }

    @GetMapping("/submodules/by-module/{moduleId}")
    public ResponseEntity<List<SubModule>> getSubModulesByModuleId(@PathVariable Integer moduleId) {
        List<SubModule> subModules = subModuleRepository.findByModuleMaster_ModuleId(moduleId);
        if (subModules.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(subModules);
        }

    }
    
    @GetMapping("/module/{moduleId}")
    public ResponseEntity<List<ModuleMaster>> getModulesByModuleId(@PathVariable Integer moduleId) {
        List<ModuleMaster> moduleMaster = moduleMasterRepository.findBModuleMasterByModuleId(moduleId);
        if (moduleMaster.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(moduleMaster);
        }
    }
    
    @GetMapping("/chatresponses/by-userMessage/{userMessages}")
    public ResponseEntity<List<ChatResponses>> getAllChatResponsesByUserMessages(@PathVariable String userMessages) {
        List<ChatResponses> chatResponses = chatResponseRepository.findChatResponseByUserMessages(userMessages);
        if (chatResponses.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(chatResponses);
        }
    }
   
    @GetMapping("/location/by-employeeId/{employeeId}")
    public String fetchLocationIdByEmployeeId(@PathVariable Integer employeeId) {
        RestTemplate restTemplate = new RestTemplate();
        String urlWithParam = LOC_URL + "?employee_id=" + employeeId;
        HttpHeaders headers = new HttpHeaders();
        headers.add("token", "9hjkptdrensokLPT52RdpLZERsqa");
        headers.add("compcode", "3i");
        HttpEntity<String> entity = new HttpEntity<>(headers);
        String response = restTemplate.exchange(urlWithParam, HttpMethod.GET, entity, String.class).getBody();
        return response;
    }
   
//    @GetMapping("/location")
//    public ResponseEntity<List<EmpJobLocationMaster>> getEmpJobLocationMaster() {
//      List<EmpJobLocationMaster> empJobLocationMaster = empJobLocationMasterRepository.findAll();
//     // EmpJobLocationMaster empJobLocationMaster = new Array
//      return ResponseEntity.ok(empJobLocationMaster);
//  }
   
   
    @GetMapping("/chatAi/byQuery/{query}")
    public String fetchAiAnswer(@PathVariable String query) {
        RestTemplate restTemplate = new RestTemplate();
        String CHAT_AI = "http://127.0.0.1:8000/query"; // Update with your actual API URL
        String urlWithParam = CHAT_AI + "?q=" + query;
        ResponseEntity<String> response = restTemplate.exchange(urlWithParam, HttpMethod.GET, null, String.class);
        System.out.println(response);
        return response.getBody();
    }
    
    @GetMapping("/questions/by-subModule/{subModuleId}")
    public ResponseEntity<List<UserQuestions>> getQuestionsBysubModuleId(@PathVariable Integer subModuleId) {
        List<UserQuestions> userQuestions = userQuestionRepository.findByUserQuestions_SubModuleId(subModuleId);
        if (userQuestions.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(userQuestions);
        }

    }

    
    @GetMapping("/botMessages/by-userQuestion/{question}")
    public ResponseEntity<List<UserQuestions>> getBotMessagesByUserQuestions(@PathVariable String question) {
    	   System.out.println(question);
        List<UserQuestions> userQuestions = userQuestionRepository.findByBotMessages_UserQuestions(question);
        System.out.println(userQuestions);
        if (userQuestions.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(userQuestions);
        }
    }
    


}
