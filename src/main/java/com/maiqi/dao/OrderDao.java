package com.maiqi.dao;

import java.util.List;
import java.util.Map;

import com.maiqi.po.Order;

public interface OrderDao {
	public Order selectOrderById(String orderId);
	
	public Order selectOrderByNumber(String orderNumber);
	
	public List<Order> selectOrders(Map<String,Object> params);
	
	public String getOrderNumber();
	
	public int createOrder(Order order);
	
	public int saveOrder(Order order);
	
	public int selectOrdersCnt(Map<String,Object> params);
	
	public List<Map<String,Object>> selectOrders4V(Map<String,Object> params);
	
	public Map<String,Object> getTodaySales(Map<String,Object> params);
	
	public List<Map<String,Object>> getSalesStatByDay(Map<String,Object> params);
	
	public List<String> getSalesStatDayCon(Map<String,Object> params);
}
