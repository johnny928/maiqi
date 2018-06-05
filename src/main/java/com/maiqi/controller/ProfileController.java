package com.maiqi.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.maiqi.component.Author;
import com.maiqi.component.JsonResult;
import com.maiqi.component.SessionManager;
import com.maiqi.po.User;
import com.maiqi.service.UserService;

@Controller
@RequestMapping(value={"/views/profile"})
public class ProfileController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private SessionManager sessionManager;
	
	@RequestMapping("/main")
	public String mainPage(Model model){
//		model.addAttribute("author", sessionManager.getAuthor());
		return "views/profile/main";
	}
	
	@RequestMapping("/account")
	public String accountPage(Model model){
//		model.addAttribute("author", sessionManager.getAuthor());
		return "views/profile/account";
	}
	
	@RequestMapping("/getAuthor")
	@ResponseBody
	public JsonResult getAuthor(Model model){
		Author author = sessionManager.getAuthor();
		JsonResult jresult = new JsonResult();
		if(author != null){
			jresult.setIsSuccess(1);
			Map data = new HashMap();
			data.put("author", author);
			jresult.setData(data);
		}else{
			jresult.setIsSuccess(0);
		}
		return jresult;
	}
	
	@RequestMapping("/saveAuthor")
	@ResponseBody
	public JsonResult saveAuthor(@RequestBody User user,Model model){
		JsonResult jresult = new JsonResult();
		if(user == null || (user.getUserName()==null||user.getUserName().isEmpty())
				|| (user.getLoginName()==null||user.getLoginName().isEmpty())
				|| (user.getUserDesc()==null||user.getUserDesc().isEmpty()) ){
			jresult.setIsSuccess(0);
		}else{
			try{
				userService.saveAccount(user.getUserName(), user.getLoginName(), user.getUserDesc());
				jresult.setIsSuccess(1);
			}catch(Exception e){
				jresult.setIsSuccess(0);
				jresult.setMessage(e.getMessage());
			}
		}
		return jresult;
	}
}
