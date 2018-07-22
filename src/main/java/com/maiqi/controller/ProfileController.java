package com.maiqi.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.maiqi.component.Author;
import com.maiqi.component.JsonResult;
import com.maiqi.component.SessionManager;
import com.maiqi.component.Utils;
import com.maiqi.po.User;
import com.maiqi.po.UserExt;
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
			User u = userService.selectUserById(author.getUserId());
			u.setPassword("");
			jresult.setIsSuccess(1);
			Map data = new HashMap();
			data.put("author", author);
			data.put("userData", u);
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
				e.printStackTrace();
				jresult.setIsSuccess(0);
				jresult.setMessage(e.getMessage());
			}
		}
		return jresult;
	}
	
	@RequestMapping("/uploadIcon")
	@ResponseBody
	public JsonResult uploadIcon(HttpServletRequest request){
		JsonResult jresult = new JsonResult();
		Map resM = new HashMap();
		try{
			CommonsMultipartResolver multipartResolver=new CommonsMultipartResolver(
	                request.getSession().getServletContext());
			
			if(multipartResolver.isMultipart(request))
	        {
	            //将request变成多部分request
	            MultipartHttpServletRequest multiRequest=(MultipartHttpServletRequest)request;
	           //获取multiRequest 中所有的文件名
	            Iterator iter=multiRequest.getFileNames();
	             
	            while(iter.hasNext())
	            {
	                //一次遍历所有文件
	                MultipartFile file=multiRequest.getFile(iter.next().toString());
	                if(file!=null)
	                {
	                	UserExt userExt = new UserExt();
	                	userExt.setUserId(sessionManager.getAuthor().getUserId());
	                	userExt.setUserImg(file.getBytes());
	                	userExt.setUserImgVersion(new Random().nextInt()+"");
	                	userService.saveUserImg(userExt);
	                	resM.put("userImgVersion", userExt.getUserImgVersion());
	                }
	                 
	            }
	           
	        }
			jresult.setIsSuccess(1);
			jresult.setData(resM);
		}catch(Exception e){
			e.printStackTrace();
			jresult.setIsSuccess(0);
			jresult.setMessage(e.getMessage());
		}
		return jresult;
	}
	
	@RequestMapping("/getIcon")
	@ResponseBody
	public String getIcon(HttpServletRequest request, HttpServletResponse response){
		OutputStream outputSream = null;
		InputStream in = null;
		try{
			UserExt userExt = userService.getUserExt(sessionManager.getAuthor().getUserId());
//			response.setContentType("image/*");
			outputSream = response.getOutputStream();
			in = new ByteArrayInputStream(userExt.getUserImg());  
			int len = 0;  
	        byte[] buf = new byte[1024];  
	        while ((len = in.read(buf, 0, 1024)) != -1) {  
	            outputSream.write(buf, 0, len);  
	        }  
	        outputSream.flush();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			try {
				outputSream.close();
				in.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return "ok";
	}
	
	@RequestMapping("/changePassword")
	@ResponseBody
	public JsonResult changePassword(@RequestBody Map<String,Object> params){
		JsonResult jresult = new JsonResult();
		String pass = (String) params.get("newPass");
		String orgpass = (String) params.get("orgPass");
		if(Utils.isEmpty(pass) || Utils.isEmpty(orgpass)){
			jresult.setIsSuccess(0);
			jresult.setMessage("缺少参数！");
			return jresult;
		}
		try{
			if(userService.checkPassword(orgpass)){
				userService.savePassword(pass);
				jresult.setIsSuccess(1);
			}else{
				jresult.setIsSuccess(0);
				jresult.setMessage("原密码错误！");
			}
		}catch(Exception e){
			e.printStackTrace();
			jresult.setIsSuccess(0);
			jresult.setMessage(e.getMessage());
		}
		return jresult;
	}
}
