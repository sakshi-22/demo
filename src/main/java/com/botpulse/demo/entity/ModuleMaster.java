package com.botpulse.demo.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

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
