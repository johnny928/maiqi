package com.maiqi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maiqi.dao.GoodsDao;

@Service
public class GoodsService {
	
	@Autowired
	private GoodsDao goodsDao;
	
}
