package com.botpulse.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "ChatResponses")

public class ChatResponses {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "chatResponsesId")
	private int chatResponsesId;

	@ManyToOne
	@JoinColumn(name = "moduleId")
	private ModuleMaster moduleName;

	@ManyToOne
	@JoinColumn(name = "subModuleId")
	private SubModule subModuleName;

	@Column(name = "botMessages")
	private String botMessages;

	@Column(name = "UserMessages")
	private String UserMessages;

	@Column(name = "status")
	private String status;

	@Column(name = "responseType")
	private String responseType;

	public int getChatResponsesId() {
		return chatResponsesId;

	}

	public void setChatResponsesId(int chatResponsesId) {
		this.chatResponsesId = chatResponsesId;
	}

	public ModuleMaster getModuleName() {
		return moduleName;
	}

	public void setModuleName(ModuleMaster moduleName) {
		this.moduleName = moduleName;
	}

	public SubModule getSubModuleName() {
		return subModuleName;
	}

	public void setSubModuleName(SubModule subModuleName) {
		this.subModuleName = subModuleName;
	}

	public String getBotMessages() {
		return botMessages;
	}

	public void setBotMessages(String botMessages) {
		this.botMessages = botMessages;
	}

	public String getUserMessages() {
		return UserMessages;
	}

	public void setUserMessages(String userMessages) {
		UserMessages = userMessages;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getResponseType() {
		return responseType;
	}

	public void setResponseType(String responseType) {
		this.responseType = responseType;

	}

	public ChatResponses(int chatResponsesId, ModuleMaster moduleName, SubModule subModuleName, String botMessages,
			String userMessages, String status, String responseType) {
		super();
		this.chatResponsesId = chatResponsesId;
		this.moduleName = moduleName;
		this.subModuleName = subModuleName;
		this.botMessages = botMessages;
		UserMessages = userMessages;
		this.status = status;
		this.responseType = responseType;
	}

	public ChatResponses() {
		super();
	}

}