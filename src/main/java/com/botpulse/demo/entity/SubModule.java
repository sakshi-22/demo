package com.botpulse.demo.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
	
    @ManyToOne( optional = false)
    @JoinColumn(name="moduleId", nullable = false)
    private ModuleMaster moduleMaster;
    
    @OneToMany(mappedBy = "subModuleName")
    private List<ChatResponses> chatResponses;

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


	public SubModule(int subModuleId, String subModuleName, ModuleMaster moduleMaster) {
		super();
		this.subModuleId = subModuleId;
		this.subModuleName = subModuleName;
		this.moduleMaster = moduleMaster;
	}

	public SubModule() {
		super();
		// TODO Auto-generated constructor stub
	}

  
}
