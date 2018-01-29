package com.itcrowd.board.service;

import java.util.ArrayList;

import com.itcrowd.book.model.BoardBean;
import com.itcrowd.util.db.BoardDao;



public class BoardListService {
	public ArrayList<BoardBean> getArticleList(int startRow) throws Exception {
		ArrayList<BoardBean> articleList = null;
		BoardDao bDao = BoardDao.getInstance();
		articleList = (ArrayList<BoardBean>) bDao.selectListBoard(startRow);
		return articleList;
	}
}
