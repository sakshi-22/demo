package com.botpulse.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.botpulse.demo.entity.EmpJobLocationMaster;

@Repository
public interface EmpJobLocationMasterRepository  extends JpaRepository<EmpJobLocationMaster, Integer> {

}
