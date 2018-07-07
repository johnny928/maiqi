package com.maiqi.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.maiqi.po.User;

public interface UserDao {
	public int createUser(User user);

	public User selectUserById(String userId);

	public User verifyUser(@Param("loginName") String username,
			@Param("password") String password);
	
	public int saveUser(User user);
	
	public List<Map<String,Object>> selectOperators();
	
	public List<Map<String,Object>> selectUsers();
	
	public int selectUsersCnt();
	
	public int saveUserProportion(User user);
}
