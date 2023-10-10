package com.botpulse.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.botpulse.demo.entity.ModuleMaster;


@Repository
public interface ModuleMasterRepository extends JpaRepository<ModuleMaster, Integer> {
	

}
