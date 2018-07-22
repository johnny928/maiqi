package com.maiqi.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

import com.maiqi.component.DataTableResult;
import com.maiqi.component.JsonResult;
import com.maiqi.component.SessionManager;
import com.maiqi.component.Utils;
import com.maiqi.po.Client;
import com.maiqi.po.MemberLevel;
import com.maiqi.service.MemberLevelService;

@Controller
@RequestMapping(value={"/views/memberLevel"})
public class MemberLevelController {

	Logger logger = LogManager.getLogger(MemberLevelController.class);
	
	@Autowired
	private SessionManager sessionManager;
	
	@Autowired
	private MemberLevelService memberLevelService;
	
	@RequestMapping(value={"/memberLevels"})
	public String memberLevelsPage(Model model){
		return "views/memberLevel/memberLevels";
	}
	
	@RequestMapping(value={"/getMemberLevels"})
	@ResponseBody
	public DataTableResult getMemberLevels(
			@RequestParam(value="start",required=false,defaultValue="0")  String start,
			@RequestParam(value="length",required=false,defaultValue="10") String length,
			@RequestParam(value="draw",required=false,defaultValue="0") String draw){
		
		DataTableResult jresult = new DataTableResult();
		try{
			Map data = new HashMap();
			List<MemberLevel> ml = memberLevelService.getAllMemberLevel();
			jresult.setData(ml);
			jresult.setDraw(Integer.parseInt(draw));
			jresult.setRecordsFiltered(ml.size());
			jresult.setRecordsTotal(ml.size());
		}catch(Exception e){
			e.printStackTrace();
			jresult.setData(new ArrayList());
			jresult.setDraw(Integer.parseInt(draw));
			jresult.setRecordsFiltered(0);
			jresult.setRecordsTotal(0);
		}
		return jresult;
	}
	
	@RequestMapping(value={"/saveMemberLevel"})
	@ResponseBody
	public JsonResult saveMemberLevel(@RequestBody Map<String,Object> params){
		JsonResult jresult = new JsonResult();
		Map resM = new HashMap();
		try{
			if(Utils.isEmpty(params) || Utils.isEmpty(params.get("memberLevel"))){
				throw new Exception("缺少参数！"); 
			}
			MemberLevel m = new MemberLevel();
			Utils.populate(m, (Map<String, Object>) params.get("memberLevel"));
			memberLevelService.saveMemberLevel(m);
			resM.put("memberLevel", m);
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
