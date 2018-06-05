package com.maiqi.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.maiqi.component.SessionManager;

@Controller
@RequestMapping(value={"/views/goods"})
public class GoodsController {
	
	Logger logger = LogManager.getLogger(GoodsController.class);
	
	@Autowired
	private SessionManager sessionManager;
	
	@RequestMapping(value={"/goods"})
	public String goodsPage(Model model){
		return "views/goods/goods";
	}
	
	@RequestMapping(value={"/goodsEditer"})
	public String goodsEditerPage(Model model){
		return "views/goods/goodsEditer";
	}
}
