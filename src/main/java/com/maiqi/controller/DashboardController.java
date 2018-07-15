package com.maiqi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value={"/views/dashboard"})
public class DashboardController {

	@RequestMapping(value={"/dashboard"})
	public String ordersPage(Model model){
		return "views/dashboard/dashboard";
	}
}
