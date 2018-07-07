package com.maiqi.service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maiqi.component.Author;
import com.maiqi.component.SecurityUtils;
import com.maiqi.component.SessionManager;
import com.maiqi.component.Utils;
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
	
	public List<Map<String,Object>> getAllOperators(){
		return userDao.selectOperators();
	}
	
	public List<Map<String,Object>> getAllUsers(){
		return userDao.selectUsers();
	}
	
	public int getAllUsersCnt(){
		return userDao.selectUsersCnt();
	}
	
	public void saveAllUsers4Proportion(List<Map> ls) throws Exception{
		if(Utils.isEmpty(ls)){
			return;
		}
		for(Map m : ls){
			User u = new User();
			Utils.populate(u, m);
			if(!Utils.isEmpty(u.getUserId())){
				u.setUpdateUserId(sessionManager.getAuthor().getUserId());
				userDao.saveUserProportion(u);
			}
		}
	}
	
}
