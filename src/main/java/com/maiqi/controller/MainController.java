package com.maiqi.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.maiqi.component.JsonResult;
import com.maiqi.component.SessionManager;
import com.maiqi.service.UserService;

@Controller
public class MainController {

	Logger logger = LogManager.getLogger(MainController.class);
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private SessionManager sessionManager;
	
	@Autowired
	private HttpServletRequest request;
	
	@RequestMapping(value={"/login"})
	@ResponseBody
	public JsonResult login(@RequestParam(value="loginName",required=true) String loginName,
			@RequestParam(value="password",required=true) String password,
			Model model){
		logger.debug("登录验证");
		boolean isIdentified = userService.verifyUser(loginName, password);
		JsonResult jresult = new JsonResult();
		if(isIdentified){
			jresult.setIsSuccess(1);
		}else{
			jresult.setIsSuccess(0);
			jresult.setMessage("用户名或密码错误！");
		}
		return jresult;
	}
	
	@RequestMapping("/logout")
	public String logOut(){
		sessionManager.sessionUnBound();
		return "login";
	}
	
	@RequestMapping(value={"/","/index"})
	public String homePage(Model model){
		logger.debug("homePage");
		return "index";
	}
	
	@RequestMapping(value={"/tpl/*"})
	public String publicPage(Model model){
		logger.debug("servletPath:"+request.getServletPath());
		model.addAttribute("author", sessionManager.getAuthor());
		return request.getServletPath();
	}
	
}
