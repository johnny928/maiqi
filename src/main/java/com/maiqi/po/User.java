package com.maiqi.po;

import java.math.BigDecimal;
import java.util.Date;

public class User {
	private String userId;
	private String userName;
	private String loginName;
	private String password;
	private int isAdmin;
	private Date createTime;
	private Date updateTime;
	private String createUserId;
	private String updateUserId;
	private String userDesc;
	private BigDecimal proportion;
	private String userImgVersion;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public String getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}
	public String getUpdateUserId() {
		return updateUserId;
	}
	public void setUpdateUserId(String updateUserId) {
		this.updateUserId = updateUserId;
	}
	public String getUserDesc() {
		return userDesc;
	}
	public void setUserDesc(String userDesc) {
		this.userDesc = userDesc;
	}
	public int getIsAdmin() {
		return isAdmin;
	}
	public void setIsAdmin(int isAdmin) {
		this.isAdmin = isAdmin;
	}
	public BigDecimal getProportion() {
		return proportion;
	}
	public void setProportion(BigDecimal proportion) {
		this.proportion = proportion;
	}
	public String getUserImgVersion() {
		return userImgVersion;
	}
	public void setUserImgVersion(String userImgVersion) {
		this.userImgVersion = userImgVersion;
	}
}
