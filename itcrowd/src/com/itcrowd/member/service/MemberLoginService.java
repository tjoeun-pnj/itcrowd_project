package com.itcrowd.member.service;

import java.util.HashMap;

import com.itcrowd.member.dao.MemberDao;
import com.itcrowd.member.model.MemberVo;


public class MemberLoginService {

	public MemberVo loginMember(HashMap<String, String> lData) {
		MemberDao mDao = MemberDao.getInstance();
		return mDao.loginMember(lData);
	}

}
