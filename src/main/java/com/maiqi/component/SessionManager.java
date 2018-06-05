package com.maiqi.component;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.maiqi.po.User;

@Component
public class SessionManager {
	
	public static String Author_Key = "com.maiqi.author";
	
	@Autowired
	private  HttpServletRequest request;
	
	Logger logger = LogManager.getLogger(SessionManager.class);
	
	public void sessionBound(User user){
		Author author = new Author();
		author.setUserId(user.getUserId());
		author.setUserName(user.getUserName());
		author.setLoginName(user.getLoginName());
		author.setUserDesc(user.getUserDesc());
		request.getSession().invalidate();
		request.getSession(true).setAttribute(Author_Key, author);
	}
	
	public void sessionUnBound(){
		HttpSession session = request.getSession(true);
		session.setAttribute(Author_Key, null);
		session.invalidate();
	}
	
	public Author getAuthor(){
		return (Author)request.getSession(true).getAttribute(Author_Key);
	}
	
	public void refreshAuthor(User user){
		Author author = this.getAuthor();
		author.setUserName(user.getUserName());
		author.setLoginName(user.getLoginName());
		author.setUserDesc(user.getUserDesc());
		request.getSession(true).setAttribute(Author_Key, author);
	}
	
	public void printParams(){
		logger.info("printParams======================");
		Enumeration en = request.getParameterNames();
		while(en.hasMoreElements()){
			String key = (String) en.nextElement();
			logger.info(String.format("%s=%s", key,request.getParameter(key)));
		}
	}
}
