package com.itcrowd.member.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;
import com.itcrowd.member.service.MemberJoinNameChkService;
import com.itcrowd.util.url.Action;
import com.itcrowd.util.url.ActionForward;

public class MemberJoinNameChkAction implements Action {

	
	/*****************************
	 * db에 아이디를 체크해 json으로 결과를 준다
	 */
	@Override
	public ActionForward execute(HttpServletRequest req, HttpServletResponse res) throws Exception {
		
		ActionForward forward = null;
		MemberJoinNameChkService mjidService = new MemberJoinNameChkService();
		boolean isNameChk = mjidService.joinMemberNameChk(req.getParameter("m_name"));
		JsonObject json = new JsonObject();
		res.setContentType("application/x-json;charset=utf-8");
		json.addProperty("type", "닉네임");
		if(isNameChk) {
			json.addProperty("result", true);
		}else {
			json.addProperty("result", false);
		}
		res.getWriter().print(json);
		return null;
	}
}
