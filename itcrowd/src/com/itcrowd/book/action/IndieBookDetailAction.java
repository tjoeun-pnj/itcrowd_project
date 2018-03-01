package com.itcrowd.book.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.itcrowd.book.service.IndieBookDetailService;
import com.itcrowd.util.url.Action;
import com.itcrowd.util.url.ActionForward;

public class IndieBookDetailAction implements Action {

	@Override
	public ActionForward execute(HttpServletRequest req, HttpServletResponse res) throws Exception {
		int ib_no = Integer.parseInt(req.getParameter("ib_no"));
		IndieBookDetailService ibService = new IndieBookDetailService();
		ActionForward forward = new ActionForward();
		req.setAttribute("article", new Gson().toJson(ibService.indieBookDetail(ib_no)));
		forward.setPath("../indieDetail.jsp");
		return forward;
	}

}
