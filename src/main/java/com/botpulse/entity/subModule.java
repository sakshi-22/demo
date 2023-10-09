package com.botpulse.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity

@Table
public class subModule {
	
	@Column(name="subModuleId")
	private int subModuleId;
	
	@Column(name="subModuleName")
	private String subModuleName;
	
	@Column(name="moduleId")
	private moduleMaster moduleId;
	
	@Column(name="response")
	private String response;

	public int getSubModuleId() {
		return subModuleId;
	}

	public void setSubModuleId(int subModuleId) {
		this.subModuleId = subModuleId;
	}

	public String getSubModuleName() {
		return subModuleName;
	}

	public void setSubModuleName(String subModuleName) {
		this.subModuleName = subModuleName;
	}

	public moduleMaster getModuleId() {
		return moduleId;
	}

	public void setModuleId(moduleMaster moduleId) {
		this.moduleId = moduleId;
	}

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}

	public subModule(int subModuleId, String subModuleName, moduleMaster moduleId, String response) {
		super();
		this.subModuleId = subModuleId;
		this.subModuleName = subModuleName;
		this.moduleId = moduleId;
		this.response = response;
	}

	public subModule() {
		super();
		// TODO Auto-generated constructor stub
	}
}
