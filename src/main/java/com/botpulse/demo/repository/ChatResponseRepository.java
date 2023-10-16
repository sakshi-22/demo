package com.botpulse.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.botpulse.demo.entity.ChatResponses;
import com.botpulse.demo.entity.SubModule;


@Repository
public interface ChatResponseRepository extends JpaRepository<ChatResponses, Integer> {

	@Query(value="SELECT  * FROM chat_responses  WHERE user_messages = ?1",nativeQuery=true)
	List<ChatResponses> findChatResponseByUserMessages(String userMessages);

}
