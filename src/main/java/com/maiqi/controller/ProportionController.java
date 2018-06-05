package com.maiqi.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.maiqi.component.SessionManager;

@Controller
@RequestMapping(value={"/views/proportion"})
public class ProportionController {
	
	Logger logger = LogManager.getLogger(ProportionController.class);
	
	@Autowired
	private SessionManager sessionManager;
	
	@RequestMapping(value={"/proportion"})
	public String proportionPage(Model model){
		return "views/proportion/proportion";
	}
}
