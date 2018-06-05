package com.maiqi.dao;

import org.apache.ibatis.annotations.Param;

import com.maiqi.po.User;

public interface UserDao {
	public int createUser(User user);

	public User selectUserById(String userId);

	public User verifyUser(@Param("loginName") String username,
			@Param("password") String password);
	
	public int saveUser(User user);
}
