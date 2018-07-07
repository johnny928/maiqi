package com.maiqi.controller;

import java.awt.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.maiqi.component.DataTableResult;
import com.maiqi.component.JsonResult;
import com.maiqi.component.SessionManager;
import com.maiqi.component.Utils;
import com.maiqi.po.User;
import com.maiqi.service.UserService;

@Controller
@RequestMapping(value={"/views/proportion"})
public class ProportionController {
	
	Logger logger = LogManager.getLogger(ProportionController.class);
	
	@Autowired
	private SessionManager sessionManager;
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value={"/proportion"})
	public String proportionPage(Model model){
		return "views/proportion/proportion";
	}
	
	@RequestMapping(value={"/getAllUsers"})
	@ResponseBody
	public DataTableResult getAllUsers(
			@RequestParam(value="start",required=false,defaultValue="0")  String start,
			@RequestParam(value="length",required=false,defaultValue="10") String length,
			@RequestParam(value="draw",required=false,defaultValue="0") String draw,
			Model model){
		
		DataTableResult jresult = new DataTableResult();
		try{
			Map data = new HashMap();
			Gson gson = new Gson();
			int cnt =userService.getAllUsersCnt();
			jresult.setData(userService.getAllUsers());
			jresult.setDraw(Integer.parseInt(draw));
			jresult.setRecordsFiltered(cnt);
			jresult.setRecordsTotal(cnt);
		}catch(Exception e){
			e.printStackTrace();
			jresult.setData(new ArrayList());
			jresult.setDraw(Integer.parseInt(draw));
			jresult.setRecordsFiltered(0);
			jresult.setRecordsTotal(0);
		}
		return jresult;
	}
	
	@RequestMapping(value={"/saveUsers"})
	@ResponseBody
	public JsonResult saveUsers(@RequestBody Map<String,Object> params){
		JsonResult jresult = new JsonResult();
		Map resM = new HashMap();
		try{
			if(Utils.isEmpty(params) || Utils.isEmpty(params.get("users"))){
				throw new Exception("缺少参数！"); 
			}
			
			ArrayList<Map> ls = (ArrayList<Map>) params.get("users");
			userService.saveAllUsers4Proportion(ls);
			jresult.setData(resM);
			jresult.setIsSuccess(1);
		}catch(Exception e){
			jresult.setIsSuccess(0);
			jresult.setMessage("保存数据出现异常！");
			e.printStackTrace();
		}		
		return jresult;
	}
}
