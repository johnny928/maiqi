package com.maiqi.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maiqi.dao.ClientDao;
import com.maiqi.dao.GoodsDao;
import com.maiqi.dao.OrderDao;
import com.maiqi.dao.OrderDetailDao;
import com.maiqi.po.Client;
import com.maiqi.po.Order;
import com.maiqi.po.OrderDetail;

@Service
public class OrderService {
	Logger logger = LogManager.getLogger(OrderService.class);
	
	@Autowired
	private OrderDao orderDao;
	
	@Autowired
	private ClientDao clientDao;
	
	@Autowired
	private OrderDetailDao orderDetailDao;
	
	@Autowired
	private GoodsDao goodsDao;
	
	public List<Map<String,Object>> getOrdersList(Map params){
		return orderDao.selectOrders4V(params);
	}
	
	public int getOrdersCnt(Map params){
		return orderDao.selectOrdersCnt(params);
	}
	
	public Order getOrder(String orderId){
		return orderDao.selectOrderById(orderId);
	}
	
	public List<OrderDetail> getOrderDetails(String orderId){
		return orderDetailDao.selectOrderDetailsByOrderId(orderId);
	}
	
	public String getOrderNumber(){
		return orderDao.getOrderNumber();
	}
	
	public Map getOrderInfo(String orderId){
		Map resM = new HashMap();
		Order order = orderDao.selectOrderById(orderId); 
		Client client = clientDao.selectClientById(order.getClientId());
		logger.debug(String.format("client birthday:%s[long=%s]", client.getBirthday().toLocaleString(),client.getBirthday().getTime()));
		resM.put("client", client);
		resM.put("order", order);
		return resM;
	}
	
	public List<Map<String,Object>> getGoodsList(Map params){
		return goodsDao.selectGoods4V(params);
	}
	
	public int getGoodsListCnt(Map params){
		return goodsDao.selectGoods4VCnt(params);
	}
	
	public List<Map<String,Object>> getDetailsEditList(Map params){
		return orderDetailDao.selectOrderDetails4V(params);
	}
	
	public int getDetailsEditListCnt(Map params){
		return orderDetailDao.selectOrderDetails4VCnt(params);
	}
}
