package com.itcrowd.member.dao;

import java.util.List;

import com.itcrowd.member.model.BoardBean;
import com.itcrowd.util.db.SqlUtil;


public class BoardDao {
	
	private static BoardDao bDao;
	private BoardDao() {}
	public static BoardDao getInstance() {
		if(bDao == null) bDao = new BoardDao();
		return bDao;
	}
	public List<BoardBean> selectListBoard(int startRow) throws Exception {
		return SqlUtil.getSession().selectList("board.selectListBoard", startRow);
	}
}
