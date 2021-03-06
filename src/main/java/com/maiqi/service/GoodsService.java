package com.maiqi.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maiqi.component.SessionManager;
import com.maiqi.component.Utils;
import com.maiqi.dao.GoodsDao;
import com.maiqi.po.Goods;

@Service
public class GoodsService {
	
	@Autowired
	private SessionManager sessionManager;
	
	@Autowired
	private GoodsDao goodsDao;
	
	public List<Goods> getGoodsList(Map params){
		return goodsDao.selectGoods(params);
	}
	
	public int getGoodsListCnt(Map params){
		return goodsDao.selectGoodsCnt(params);
	}
	
	public int delGoods(String goodsId){
		Goods g = new Goods();
		g.setGoodsId(goodsId);
		g.setIsValid(0);
		g.setUpdateUserId(sessionManager.getAuthor().getUserId());
		return goodsDao.saveGoods(g);
	}
	
	public Goods getGoods(String goodsId){
		return goodsDao.selectGoodsById(goodsId);
	}
	
	public int saveGoods(Goods goods){
		if(Utils.isEmpty(goods)){
			return 0;
		}
		int retInt = 0;
		if(Utils.isEmpty(goods.getGoodsId())){
			goods.setIsValid(1);
			goods.setCreateUserId(sessionManager.getAuthor().getUserId());
			retInt = goodsDao.createGoods(goods);
		}else{
			goods.setUpdateUserId(sessionManager.getAuthor().getUserId());
			retInt = goodsDao.saveGoods(goods);
		}
		return retInt;
	}
}
