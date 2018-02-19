package com.itcrowd.member.service;

import com.itcrowd.member.dao.MemberDao;
import com.itcrowd.member.model.MemberVo;

public class MemberJoinServece {

	public boolean joinMember(MemberVo mVo) throws Exception {
		MemberDao mDao = MemberDao.getInstance();
		int result =  mDao.joinMember(mVo);
		if(result > 0)return true;
		else return false;
	}

}
