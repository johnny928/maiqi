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
import com.maiqi.component.Utils;
import com.maiqi.po.Client;
import com.maiqi.service.ClientService;

@Controller
@RequestMapping(value={"/views/clients"})
public class ClientsController {
	
	Logger logger = LogManager.getLogger(ClientsController.class);
	
	@Autowired
	private SessionManager sessionManager;
	
	@Autowired
	private ClientService clientService;
	
	@RequestMapping(value={"/clients"})
	public String clientsPage(Model model){
		return "views/clients/clients";
	}
	
	@RequestMapping(value={"/clientEditer"})
	public String clientEditerPage(Model model){
		return "views/clients/clientEditer";
	}
	
	@RequestMapping(value={"/getClients"})
	@ResponseBody
	public DataTableResult getClients(@RequestParam(value="queryCond",required=true) String queryCond,
			@RequestParam(value="start",required=false,defaultValue="0")  String start,
			@RequestParam(value="length",required=false,defaultValue="10") String length,
			@RequestParam(value="draw",required=false,defaultValue="0") String draw,
			Model model){
		
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
			int cnt =clientService.getClientsListCnt(m);
			jresult.setData(clientService.getClientsList(m));
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
	
	@RequestMapping(value={"/getClientById"})
	@ResponseBody
	public JsonResult getClientById(@RequestBody Map<String,Object> params){
		JsonResult jresult = new JsonResult();
		Map resM = new HashMap();
		try{
			if(Utils.isEmpty(params) || Utils.isEmpty(params.get("clientId"))){
				resM.put("client", null);
			}else{
				resM.put("client", clientService.getClientById((String)params.get("clientId")));
			}
			jresult.setData(resM);
			jresult.setIsSuccess(1);
		}catch(Exception e){
			jresult.setIsSuccess(0);
			jresult.setMessage("获取数据出现异常！");
			e.printStackTrace();
		}		
		return jresult;
	}
	
	@RequestMapping(value={"/saveClient"})
	@ResponseBody
	public JsonResult saveClient(@RequestBody Map<String,Object> params){
		JsonResult jresult = new JsonResult();
		Map resM = new HashMap();
		try{
			if(Utils.isEmpty(params) || Utils.isEmpty(params.get("client"))){
				throw new Exception("缺少参数！"); 
			}
			Client c = new Client();
			Utils.populate(c, (Map<String, Object>) params.get("client"));
			clientService.saveClient(c);
			resM.put("client", c);
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
