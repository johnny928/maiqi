package com.maiqi.dao;

import java.util.List;
import java.util.Map;

import com.maiqi.po.Goods;

public interface GoodsDao {
	public Goods selectGoodsById(String goodsId);
	
	public List<Goods> selectGoods(Map<String,Object> params);
	
	public int createGoods(Goods goods);
	
	public int saveGoods(Goods goods);
}
