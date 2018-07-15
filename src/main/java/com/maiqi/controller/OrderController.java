package com.maiqi.controller;

import java.math.BigDecimal;
import java.math.RoundingMode;
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
import com.maiqi.po.Client;
import com.maiqi.po.Goods;
import com.maiqi.po.Order;
import com.maiqi.service.ClientService;
import com.maiqi.service.OrderService;
import com.maiqi.service.UserService;

@Controller
@RequestMapping(value={"/views/orders"})
public class OrderController {
	
	Logger logger = LogManager.getLogger(OrderController.class);
	
	@Autowired
	private SessionManager sessionManager;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ClientService clientService;
	
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
			e.printStackTrace();
			jresult.setIsSuccess(0);
			jresult.setMessage("获取数据出现异常！");
		}		
		return jresult;
	}
	
	@RequestMapping(value={"/getGoodsList"})
	@ResponseBody
	public DataTableResult getGoodsList(@RequestParam(value="goodsListQueryCond",required=true) String queryCond,
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
			logger.debug(String.format("\n\nlabels=%s\n", m.get("labels")));
			int cnt =orderService.getGoodsListCnt(m);
			jresult.setData(orderService.getGoodsList(m));
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
	
	@RequestMapping(value={"/getDetailsEditList"})
	@ResponseBody
	public DataTableResult getDetailsEditList(@RequestParam(value="detailsEditQueryCond",required=true) String queryCond,
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
			logger.debug(String.format("\n\nlabels=%s\n", m.get("labels")));
			int cnt =orderService.getDetailsEditListCnt(m);
			jresult.setData(orderService.getDetailsEditList(m));
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
	
	@RequestMapping(value={"/saveOrderInfo"})
	@ResponseBody
	public JsonResult saveOrderInfo(@RequestBody Map<String,Object> params){
		JsonResult jresult = new JsonResult();
		Map resM = new HashMap();
		try{
			Gson gson = new Gson();
			Client client = new Client();
			Order order = new Order();
			Utils.populate(client,(Map)params.get("client"));
			Utils.populate(order,(Map)params.get("order"));
			orderService.saveOrderInfo(order, client);
			resM.put("client", client);
			resM.put("order", order);
			jresult.setData(resM);
			jresult.setIsSuccess(1);
		}catch(Exception e){
			jresult.setIsSuccess(0);
			jresult.setMessage("获取数据出现异常！");
			e.printStackTrace();
		}		
		return jresult;
	}
	
	@RequestMapping(value={"/getClientByPhoneNum"})
	@ResponseBody
	public JsonResult getClientByPhoneNum(@RequestBody Map<String,Object> params){
		JsonResult jresult = new JsonResult();
		Map resM = new HashMap();
		try{
			resM.put("client", clientService.getClientByPhoneNum((String)params.get("phoneNum")));
			jresult.setData(resM);
			jresult.setIsSuccess(1);
		}catch(Exception e){
			jresult.setIsSuccess(0);
			jresult.setMessage("获取数据出现异常！");
		}		
		return jresult;
	}
	
	@RequestMapping(value={"/saveOrderDetail"})
	@ResponseBody
	public JsonResult saveOrderDetail(@RequestBody Map<String,Object> params){
		JsonResult jresult = new JsonResult();
		Map resM = new HashMap();
		try{
			String orderId = (String) params.get("orderId");
			Goods goods = new Goods();
			Utils.populate(goods, (Map)params.get("goods"));
			Integer quantity = Utils.isEmpty(params.get("quantity")) ? 0: new Integer((String)params.get("quantity"));
			BigDecimal discount = Utils.isEmpty(params.get("discount")) ? new BigDecimal(10): new BigDecimal((String)params.get("discount"));
			resM.put("orderDetail", orderService.saveOrderDetail(orderId, goods, quantity, discount));
			if(Utils.isEmpty(resM.get("orderDetail"))){
				jresult.setMessage("缺少參數。");
				jresult.setIsSuccess(0);
			}else{
				jresult.setData(resM);
				jresult.setIsSuccess(1);
			}
		}catch(Exception e){
			jresult.setIsSuccess(0);
			jresult.setMessage("保存数据出现异常！");
			e.printStackTrace();
		}		
		return jresult;
	}
	
	@RequestMapping(value={"/cancelGoods"})
	@ResponseBody
	public JsonResult cancelGoods(@RequestBody Map<String,Object> params){
		JsonResult jresult = new JsonResult();
		Map resM = new HashMap();
		try{
			resM.put("cancelRows", orderService.cancelOrderDetail(params));
			jresult.setData(resM);
			jresult.setIsSuccess(1);
		}catch(Exception e){
			jresult.setIsSuccess(0);
			jresult.setMessage("保存数据出现异常！");
			e.printStackTrace();
		}		
		return jresult;
	}
	
	@RequestMapping(value={"/createOrder"})
	@ResponseBody
	public JsonResult createOrder(@RequestBody Map<String,Object> params){
		JsonResult jresult = new JsonResult();
		Map resM = new HashMap();
		try{
			resM.put("order", orderService.newOrder());
			jresult.setData(resM);
			jresult.setIsSuccess(1);
		}catch(Exception e){
			jresult.setIsSuccess(0);
			jresult.setMessage("保存数据出现异常！");
			e.printStackTrace();
		}		
		return jresult;
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
	
}
