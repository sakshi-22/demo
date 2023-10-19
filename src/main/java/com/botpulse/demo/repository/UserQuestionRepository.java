package com.botpulse.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.botpulse.demo.entity.UserQuestions;

@Repository
public interface UserQuestionRepository extends JpaRepository<UserQuestions, Integer> {
	
	@Query(value="SELECT  * FROM user_questions  WHERE sub_module_id = ?1",nativeQuery=true)
	List<UserQuestions> findByUserQuestions_SubModuleId(Integer subModuleId);
	
	//List<UserQuestions> findBySubModule_SubModuleId(Integer subModuleId);
}
