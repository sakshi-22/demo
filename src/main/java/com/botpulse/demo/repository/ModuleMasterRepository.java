package com.botpulse.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.botpulse.demo.entity.ModuleMaster;
import com.botpulse.demo.entity.SubModule;


@Repository
public interface ModuleMasterRepository extends JpaRepository<ModuleMaster, Integer> {
	
	List<ModuleMaster> findBModuleMasterByModuleId(Integer moduleId);
	

}
