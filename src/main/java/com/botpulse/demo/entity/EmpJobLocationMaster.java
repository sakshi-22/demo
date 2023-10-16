package com.botpulse.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "Emp_job_location_master")
public class EmpJobLocationMaster {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private int ID;
	
	@Column(name = "Work_loc_ID")
	private int workLocId;
	
	@Column(name = "Work_loc_Name")
	private String workLocName;

	public int getID() {
		return ID;
	}

	public void setID(int iD) {
		ID = iD;
	}

	public int getWorkLocId() {
		return workLocId;
	}

	public void setWorkLocId(int workLocId) {
		this.workLocId = workLocId;
	}

	public String getWorkLocName() {
		return workLocName;
	}

	public void setWorkLocName(String workLocName) {
		this.workLocName = workLocName;
	}

	public EmpJobLocationMaster() {
		super();
		// TODO Auto-generated constructor stub
	}

	public EmpJobLocationMaster(int iD, int workLocId, String workLocName) {
		super();
		ID = iD;
		this.workLocId = workLocId;
		this.workLocName = workLocName;
	}
	
	
	
	
}
