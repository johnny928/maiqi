package com.maiqi.controller;

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
import com.maiqi.service.OrderService;

@Controller
@RequestMapping(value={"/views/orders"})
public class OrderController {
	
	Logger logger = LogManager.getLogger(OrderController.class);
	
	@Autowired
	private SessionManager sessionManager;
	
	@Autowired
	private OrderService orderService;
	
	@RequestMapping(value={"/orders"})
	public String ordersPage(Model model){
		return "views/orders/orders";
	}
	
	@RequestMapping(value={"/orderEditer"})
	public String orderEditerPage(Model model){
		logger.info("here");
		return "views/orders/orderEditer";
	}
	
	@RequestMapping(value={"/getOrders"})
	@ResponseBody
	public DataTableResult getOrders(@RequestParam(value="queryCond",required=true) String queryCond,
			@RequestParam(value="start",required=false,defaultValue="0")  String start,
			@RequestParam(value="length",required=false,defaultValue="10") String length,
			@RequestParam(value="draw",required=false,defaultValue="0") String draw,
			Model model){
		
		logger.info(String.format("queryCond=%s", queryCond));
		DataTableResult jresult = new DataTableResult();
		if(queryCond==null || queryCond.isEmpty()){
			jresult.setData(new ArrayList());
			jresult.setDraw(Integer.parseInt(draw));
			jresult.setRecordsFiltered(0);
			jresult.setRecordsTotal(0);
			return jresult;
		}
		try{
			Map data = new HashMap();
			Gson gson = new Gson();
			Map m = gson.fromJson(queryCond, Map.class);
			logger.debug(String.format("\n\nqueryCond=%s\nrowStart=%s\npageSize=%s\n\n", queryCond,start,length));
			m.put("rowStart", start);
			m.put("pageSize", length);
			int cnt =orderService.getOrdersCnt(m);
			jresult.setData(orderService.getOrdersList(m));
			jresult.setDraw(Integer.parseInt(draw));
			jresult.setRecordsFiltered(cnt);
			jresult.setRecordsTotal(cnt);
		}catch(Exception e){
			jresult.setData(new ArrayList());
			jresult.setDraw(Integer.parseInt(draw));
			jresult.setRecordsFiltered(0);
			jresult.setRecordsTotal(0);
		}
		return jresult;
	}
	
	@RequestMapping(value={"/getOrderDetails"})
	@ResponseBody
	public JsonResult getOrderDetails(@RequestParam(value="orderId",required=true) String orderId,
			Model model){
		JsonResult jresult = new JsonResult();
		logger.debug(String.format("\n\norderId=%s\n\n", orderId));
		if(orderId==null || orderId.isEmpty()){
			jresult.setData(null);
			jresult.setIsSuccess(0);
			jresult.setMessage("查询条件不能为空！");
			return jresult;
		}
		try{
			Map data = new HashMap();
			data.put("detailList", orderService.getOrderDetails(orderId));
			data.put("order", orderService.getOrder(orderId));
			jresult.setData(data);
			jresult.setIsSuccess(1);
		}catch(Exception e){
			jresult.setIsSuccess(0);
			jresult.setMessage("获取数据出现异常！");
		}
		return jresult;
	}
	
	@RequestMapping(value={"/getOrderNumber"})
	@ResponseBody
	public JsonResult getOrderNumber(){
		JsonResult jresult = new JsonResult();
		Map resM = new HashMap();
		try{
			resM.put("orderNumber", orderService.getOrderNumber());
			jresult.setData(resM);
			jresult.setIsSuccess(1);
		}catch(Exception e){
			jresult.setIsSuccess(0);
			jresult.setMessage("获取数据出现异常！");
		}		
		return jresult;
	}
	
	@RequestMapping(value={"/getOrderInfo"})
	@ResponseBody
	public JsonResult getOrderInfo(@RequestBody Map<String,Object> params){
		JsonResult jresult = new JsonResult();
		Map resM = new HashMap();
		try{
			resM.put("orderInfo", orderService.getOrderInfo((String)params.get("orderId")));
			jresult.setData(resM);
			jresult.setIsSuccess(1);
		}catch(Exception e){
			jresult.setIsSuccess(0);
			jresult.setMessage("获取数据出现异常！");
		}		
		return jresult;
	}
}
