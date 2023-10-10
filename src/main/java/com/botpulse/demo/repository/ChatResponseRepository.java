package com.botpulse.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.botpulse.demo.entity.ChatResponses;


@Repository
public interface ChatResponseRepository extends JpaRepository<ChatResponses, Long> {

}
