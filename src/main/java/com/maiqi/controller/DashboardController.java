package com.maiqi.controller;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.maiqi.component.JsonResult;
import com.maiqi.component.Utils;
import com.maiqi.service.OrderService;
import com.maiqi.service.UserService;

@Controller
@RequestMapping(value={"/views/dashboard"})
public class DashboardController {

	Logger logger = LogManager.getLogger(DashboardController.class);
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private OrderService orderService;
	
	@RequestMapping(value={"/dashboard"})
	public String ordersPage(Model model){
		return "views/dashboard/dashboard";
	}
	
	@RequestMapping(value={"/getTodaySales"})
	@ResponseBody
	public JsonResult getTodaySales(){
		JsonResult jresult = new JsonResult();
		try{
			jresult.setData(orderService.getTodaySales());
			jresult.setIsSuccess(1);
		}catch(Exception e){
			jresult.setIsSuccess(0);
			jresult.setMessage("获取数据出现异常！");
			e.printStackTrace();
		}		
		return jresult;
	}
	
	@RequestMapping(value={"/getSalesStatByDay"})
	@ResponseBody
	public JsonResult getSalesStatByDay(){
		JsonResult jresult = new JsonResult();
		Map resM = new HashMap();
		try{
			List<String> users = userService.getAllUserName();
			List<Map<String,Object>> statRes = orderService.getSalesStatByDay();
			List<String> x = orderService.getSalesStatDayCon();
			List r = Utils.trcChartsModel(x, users, statRes, "sdate", "sales", "salesperson", "name", "data", 0.00f);
			resM.put("salesStatByDay", r);
			resM.put("users", users);
			resM.put("xAxis", x);
			jresult.setData(resM);
			jresult.setIsSuccess(1);
		}catch(Exception e){
			jresult.setIsSuccess(0);
			jresult.setMessage("获取数据出现异常！");
			e.printStackTrace();
		}		
		return jresult;
	}
}
