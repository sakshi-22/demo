package com.botpulse.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.botpulse.demo.entity.SubModule;


@Repository
public interface SubModuleRepository extends JpaRepository<SubModule, Long> {

}
