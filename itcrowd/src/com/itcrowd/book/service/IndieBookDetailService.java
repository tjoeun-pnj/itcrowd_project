package com.itcrowd.book.service;

import com.itcrowd.book.dao.BookDao;
import com.itcrowd.book.model.IndieBookVo;

public class IndieBookDetailService {

	public IndieBookVo indieBookDetail(int ib_no) {
		return BookDao.getInstance().getIndieBookDetail(ib_no);
	}

}
