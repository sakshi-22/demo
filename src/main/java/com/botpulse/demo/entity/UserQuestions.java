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
@Table(name = "UserQuestions")

public class UserQuestions {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Id")
	private int Id;
	
	@ManyToOne
	@JoinColumn(name = "subModuleId")
	private SubModule subModuleId;
	
	@Column(name = "questions")
	private String questions;
	
	@Column(name = "document")
	private String document;
	
	@Column(name = "botMessages")
	private String botMessages;

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public SubModule getSubModuleId() {
		return subModuleId;
	}

	public void setSubModuleId(SubModule subModuleId) {
		this.subModuleId = subModuleId;
	}

	public String getQuestions() {
		return questions;
	}

	public void setQuestions(String questions) {
		this.questions = questions;
	}

	public String getDocument() {
		return document;
	}

	public void setDocument(String document) {
		this.document = document;
	}

	public String getBotMessages() {
		return botMessages;
	}

	public void setBotMessages(String botMessages) {
		this.botMessages = botMessages;
	}

	public UserQuestions() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserQuestions(int id, SubModule subModuleId, String questions, String document, String botMessages) {
		super();
		Id = id;
		this.subModuleId = subModuleId;
		this.questions = questions;
		this.document = document;
		this.botMessages = botMessages;
	}
	
	
}
