package com.maiqi.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.maiqi.po.User;
import com.maiqi.service.UserService;

@Controller
public class MyTestController {
	
	Logger logger = LogManager.getLogger(MyTestController.class);
	
	
	@Autowired
	private UserService userService;
	
	@RequestMapping("/hello")
	public String wellcome(Model model){
		model.addAttribute("greeting", "你好！");
		User user = new User();
		user.setLoginName("test");
		user.setUserName("测试帐号");
		user.setPassword("a");
		user.setCreateUserId("0");
		userService.createUser(user);
		logger.debug("这是测试日志");
		return "hello";
	}
	
	public String index(Model model){
		model.addAttribute("greeting", "index！");
		logger.debug("这是index");
		return "index";
	}
}
