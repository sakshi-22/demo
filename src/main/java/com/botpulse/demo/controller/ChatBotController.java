package com.botpulse.demo.controller;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.botpulse.demo.entity.ChatResponses;
import com.botpulse.demo.entity.SubModule;
import com.botpulse.demo.repository.ChatResponseRepository;
import com.botpulse.demo.repository.SubModuleRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ChatBotController {

    private final ChatResponseRepository chatResponseRepository;

    @Autowired
    public ChatBotController(ChatResponseRepository chatResponseRepository) {
        this.chatResponseRepository = chatResponseRepository;
    }
    
//
//    @GetMapping("/chatresponses")
//    public ResponseEntity<List<ChatResponses>> getAllChatResponses() {
//        List<ChatResponses> chatResponses = chatResponseRepository.findAll();
//        return ResponseEntity.ok(chatResponses);
//    }
//    @GetMapping("/chatresponses")
//    public ResponseEntity<List<ChatResponses>> updateAndFetchChatResponses() {
//        List<ChatResponses> chatResponsesList = chatResponseRepository.findAll();
//
//        chatResponsesList.forEach(chatResponse -> {
//            if("Leave Balance Requested".equals(chatResponse.getStatus())) {
//            	String clickHere="https://3i.honohr.com/login";
//                String updatedBotMessage = chatResponse.getBotMessages() + clickHere;
//                chatResponse.setBotMessages(updatedBotMessage);
//                chatResponseRepository.save(chatResponse);
//            }
//        });
//
//        return ResponseEntity.ok(chatResponsesList);
//    }
    @GetMapping("/chatresponses")
    public ResponseEntity<List<ChatResponses>> getAllChatResponses() {
        List<ChatResponses> chatResponses = chatResponseRepository.findAll();
        
        for (ChatResponses response : chatResponses) {
            if ("Leave Balance Requested".equals(response.getStatus())) {
                String botMessage = response.getBotMessages();
                
                // Extract URL from the botMessage
                String urlPattern = "https?://\\S+"; // Simple regex for URLs
                Pattern pattern = Pattern.compile(urlPattern);
                Matcher matcher = pattern.matcher(botMessage);
                
                if (matcher.find()) {
                    String extractedUrl = matcher.group(0); // This contains the extracted URL
                    System.out.println(extractedUrl);
                    // Do whatever you want with the extractedUrl here
                }
            }
        }
        
        return ResponseEntity.ok(chatResponses);
    }


   
}
