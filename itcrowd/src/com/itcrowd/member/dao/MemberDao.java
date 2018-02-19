package com.itcrowd.member.dao;

import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;

import com.itcrowd.member.model.MemberVo;
import com.itcrowd.util.db.SqlUtil;


public class MemberDao {
	private static MemberDao mDao;
	private MemberDao() {}
	public static MemberDao getInstance() {
		if(mDao == null) mDao = new MemberDao();
		return mDao;
	}
	
	/**************************88
	 * 회원 가입 
	 * @param mVo
	 * @return int
	 */
	public int joinMember(MemberVo mVo) {
		int result = 0;
		SqlSession session = null;
		try {
			session = SqlUtil.getSession();
			result = session.insert("member.insertMember", mVo);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			e.printStackTrace();
			result = 0;
		} 
		return result;
	}
	/**********************************8
	 * 이메일 중복확인
	 * @param m_id
	 * @return int
	 */
	public int joinMemberIdChk(String m_id) {
		int result = 0;
		SqlSession session = null;
		try {
			session = SqlUtil.getSession();
			result = session.selectOne("member.joinIdChk", m_id);
		} catch (Exception e) {
			e.printStackTrace();
			result = 0;
		} 
		return result;
	}
	
	/***************************************************
	 * 닉네임 중복 확인
	 * @param m_name
	 * @return int
	 */
	public int joinMemberNameChk(String m_name) {
		int result = 0;
		SqlSession session = null;
		try {
			session = SqlUtil.getSession();
			result = session.selectOne("member.joinNameChk", m_name);
		} catch (Exception e) {
			e.printStackTrace();
			result = 0;
		} 
		return result;
	}
	/*****************************************
	 * 로그인 ㄱㄱ
	 * @param lData
	 * @return
	 */
	public MemberVo loginMember(HashMap<String, String> lData) {
		SqlSession session = null;
		try {
			session = SqlUtil.getSession();
			return session.selectOne("member.loginMember", lData);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
