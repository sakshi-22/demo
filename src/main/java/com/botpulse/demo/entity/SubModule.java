package com.botpulse.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table
public class SubModule {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="subModuleId")
    private int subModuleId;
	
    @Column(name="subModuleName")
    private String subModuleName;
	
    @ManyToOne
    @JoinColumn(name="moduleId")
    private ModuleMaster moduleMaster;
	
    @Column(name="response")
    private String response;

    
    public ModuleMaster getModuleMaster() {
        return moduleMaster;
    }

    public void setModuleMaster(ModuleMaster moduleMaster) {
        this.moduleMaster = moduleMaster;
    }

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

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}

	public SubModule(int subModuleId, String subModuleName, ModuleMaster moduleMaster, String response) {
		super();
		this.subModuleId = subModuleId;
		this.subModuleName = subModuleName;
		this.moduleMaster = moduleMaster;
		this.response = response;
	}

	public SubModule() {
		super();
		// TODO Auto-generated constructor stub
	}

  
}
