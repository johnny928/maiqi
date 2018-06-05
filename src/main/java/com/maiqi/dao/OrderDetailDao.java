package com.maiqi.dao;

import java.util.List;

import com.maiqi.po.OrderDetail;

public interface OrderDetailDao {
	
	public OrderDetail getOrderDetailsById(String orderDetailId);
	
	public int createOrderDetail(OrderDetail orderDetail);
	
	public int saveOrderDetail(OrderDetail orderDetail);
	
	public List<OrderDetail> selectOrderDetailsByOrderId(String orderId);
}
