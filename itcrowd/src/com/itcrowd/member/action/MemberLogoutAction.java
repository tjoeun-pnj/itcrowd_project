package com.itcrowd.member.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.JsonObject;
import com.itcrowd.util.url.Action;
import com.itcrowd.util.url.ActionForward;

public class MemberLogoutAction implements Action {

	@Override
	public ActionForward execute(HttpServletRequest req, HttpServletResponse res) throws Exception {
		JsonObject json = new JsonObject();
		res.setContentType("application/x-json;charset=utf-8");
		HttpSession session = req.getSession(false);
		if(session != null) session.invalidate();
		ActionForward forward = new ActionForward();
		forward.setRedirect(true);
		forward.setPath(req.getContextPath()+"/main.jsp");
		return forward;
	}

}
