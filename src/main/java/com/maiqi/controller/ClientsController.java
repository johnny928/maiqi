package com.maiqi.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.maiqi.component.SessionManager;

@Controller
@RequestMapping(value={"/views/clients"})
public class ClientsController {
	
	Logger logger = LogManager.getLogger(ClientsController.class);
	
	@Autowired
	private SessionManager sessionManager;
	
	@RequestMapping(value={"/clients"})
	public String clientsPage(Model model){
		return "views/clients/clients";
	}
	
	@RequestMapping(value={"/clientEditer"})
	public String clientEditerPage(Model model){
		return "views/clients/clientEditer";
	}
}
