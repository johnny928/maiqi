package com.maiqi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maiqi.component.Author;
import com.maiqi.component.SecurityUtils;
import com.maiqi.component.SessionManager;
import com.maiqi.dao.UserDao;
import com.maiqi.po.User;

@Service
public class UserService {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private SessionManager sessionManager;
	
	public void createUser(User user){
		if(user == null){
			return;
		}
		user.setPassword(SecurityUtils.getMD5(user.getPassword()));
		userDao.createUser(user);
	}
	
	public boolean verifyUser(String loginName, String password){
		String passwordMD5 = SecurityUtils.getMD5(password);
		User user = userDao.verifyUser(loginName, passwordMD5);
		if( user != null ){
			sessionManager.sessionBound(user);
			return true;
		}else{
			return false;
		}
	}
	
	public int saveAccount(String userName,String loginName,String desc){
		Author author = sessionManager.getAuthor();
		if(author!=null){
			User user = new User();
			user.setUserId(author.getUserId());
			user.setUserName(userName);
			user.setLoginName(loginName);
			user.setUserDesc(desc);
			user.setUpdateUserId(author.getUserId());
			int cnt = userDao.saveUser(user);
			sessionManager.refreshAuthor(user);
			return cnt;
		}else{
			return 0;
		}
	}
	
}
