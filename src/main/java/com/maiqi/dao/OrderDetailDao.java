package com.maiqi.dao;

import java.util.List;
import java.util.Map;

import com.maiqi.po.OrderDetail;

public interface OrderDetailDao {
	
	public OrderDetail getOrderDetailsById(String orderDetailId);
	
	public int createOrderDetail(OrderDetail orderDetail);
	
	public int saveOrderDetail(OrderDetail orderDetail);
	
	public List<OrderDetail> selectOrderDetailsByOrderId(String orderId);
	
	public List<Map<String,Object>> selectOrderDetails4V(Map<String,Object> params);
	
	public int selectOrderDetails4VCnt(Map<String,Object> params);
}
