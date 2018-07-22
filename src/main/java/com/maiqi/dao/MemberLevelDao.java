package com.maiqi.dao;

import java.util.List;

import com.maiqi.po.MemberLevel;

public interface MemberLevelDao {

	public List<MemberLevel> selectMemberLevels();
	public int createMemberLevel(MemberLevel memberLevel);
	public int saveMemberLevel(MemberLevel memberLevel);
}
