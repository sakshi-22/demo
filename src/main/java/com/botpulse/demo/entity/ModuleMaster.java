package com.botpulse.demo.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table
public class ModuleMaster {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "moduleId")
	private int moduleId;

	@Column(name = "moduleName")
	private String moduleName;

	@OneToMany(mappedBy = "moduleMaster", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<SubModule> subModules;
	
	@OneToMany(mappedBy = "moduleName")
	private List<ChatResponses> chatResponses;
	
	public int getModuleId() {
		return moduleId;
	}

	public void setModuleId(int moduleId) {
		this.moduleId = moduleId;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public ModuleMaster() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ModuleMaster(int moduleId, String moduleName) {
		super();
		this.moduleId = moduleId;
		this.moduleName = moduleName;
	}

}
