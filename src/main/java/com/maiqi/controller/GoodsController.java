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
import com.maiqi.po.Goods;
import com.maiqi.service.GoodsService;

@Controller
@RequestMapping(value={"/views/goods"})
public class GoodsController {
	
	Logger logger = LogManager.getLogger(GoodsController.class);
	
	@Autowired
	private SessionManager sessionManager;
	
	@Autowired
	private GoodsService goodsService;
	
	@RequestMapping(value={"/goods"})
	public String goodsPage(Model model){
		return "views/goods/goods";
	}
	
	@RequestMapping(value={"/goodsEditer"})
	public String goodsEditerPage(Model model){
		return "views/goods/goodsEditer";
	}
	
	@RequestMapping(value={"/getGoods"})
	@ResponseBody
	public DataTableResult getGoods(@RequestParam(value="queryCond",required=true) String queryCond,
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
			int cnt =goodsService.getGoodsListCnt(m);
			jresult.setData(goodsService.getGoodsList(m));
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
	
	@RequestMapping(value={"/delGoods"})
	@ResponseBody
	public JsonResult delGoods(@RequestBody Map<String,Object> params){
		JsonResult jresult = new JsonResult();
		Map resM = new HashMap();
		try{
			if(Utils.isEmpty(params) || Utils.isEmpty(params.get("goodsId"))){
				throw new Exception("缺少参数！"); 
			}
			resM.put("delRows", goodsService.delGoods((String)params.get("goodsId")));
			jresult.setData(resM);
			jresult.setIsSuccess(1);
		}catch(Exception e){
			jresult.setIsSuccess(0);
			jresult.setMessage("保存数据出现异常！");
			e.printStackTrace();
		}		
		return jresult;
	}
	
	@RequestMapping(value={"/getGoodsById"})
	@ResponseBody
	public JsonResult getGoodsById(@RequestBody Map<String,Object> params){
		JsonResult jresult = new JsonResult();
		Map resM = new HashMap();
		try{
			if(Utils.isEmpty(params) || Utils.isEmpty(params.get("goodsId"))){
				throw new Exception("缺少参数！"); 
			}
			resM.put("goods", goodsService.getGoods((String)params.get("goodsId")));
			jresult.setData(resM);
			jresult.setIsSuccess(1);
		}catch(Exception e){
			jresult.setIsSuccess(0);
			jresult.setMessage("获取数据出现异常！");
			e.printStackTrace();
		}		
		return jresult;
	}
	
	@RequestMapping(value={"/saveGoods"})
	@ResponseBody
	public JsonResult saveGoods(@RequestBody Map<String,Object> params){
		JsonResult jresult = new JsonResult();
		Map resM = new HashMap();
		try{
			if(Utils.isEmpty(params) || Utils.isEmpty(params.get("goods"))){
				throw new Exception("缺少参数！"); 
			}
			Goods g = new Goods();
			Utils.populate(g, (Map<String, Object>) params.get("goods"));
			resM.put("rows", goodsService.saveGoods(g));
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
