package com.maiqi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maiqi.component.SessionManager;
import com.maiqi.component.Utils;
import com.maiqi.dao.MemberLevelDao;
import com.maiqi.po.MemberLevel;

@Service
public class MemberLevelService {
	
	@Autowired
	private MemberLevelDao memberLevelDao;
	
	@Autowired
	private SessionManager sessionManager;
	
	public List<MemberLevel> getAllMemberLevel(){
		return memberLevelDao.selectMemberLevels();
	}
	
	public int saveMemberLevel(MemberLevel memberLevel){
		if(Utils.isEmpty(memberLevel.getLevelId())){
			memberLevel.setCreateUserId(sessionManager.getAuthor().getUserId());
			return memberLevelDao.createMemberLevel(memberLevel);
		}else{
			memberLevel.setUpdateUserId(sessionManager.getAuthor().getUserId());
			return memberLevelDao.saveMemberLevel(memberLevel);
		}
	}
}
