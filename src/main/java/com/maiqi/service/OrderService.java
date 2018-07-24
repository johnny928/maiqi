package com.maiqi.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maiqi.component.SessionManager;
import com.maiqi.component.Utils;
import com.maiqi.dao.ClientDao;
import com.maiqi.dao.GoodsDao;
import com.maiqi.dao.OrderDao;
import com.maiqi.dao.OrderDetailDao;
import com.maiqi.po.Client;
import com.maiqi.po.Goods;
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
	
	@Autowired
	private ClientService clientService;
	
	@Autowired
	private SessionManager sessionManager;
	
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
	
	public Order newOrder(){
		Order order = new Order();
		order.setCreateUserId(sessionManager.getAuthor().getUserId());
		order.setSalespersonId(sessionManager.getAuthor().getUserId());
		order.setOrderNumber(orderDao.getOrderNumber());
		order.setIsValid(1);
		orderDao.createOrder(order);
		return order;
	}
	
	public Map getOrderInfo(String orderId){
		Map resM = new HashMap();
		Order order = orderDao.selectOrderById(orderId); 
		Client client = Utils.isEmpty(order.getClientId()) ? null : clientDao.selectClientById(order.getClientId());
//		logger.debug(String.format("client birthday:%s[long=%s]", client.getBirthday().toLocaleString(),client.getBirthday().getTime()));
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
	
	public int saveOrder(Order order){
		if(Utils.isEmpty(order)){
			return 0;
		}
		if(Utils.isEmpty(order.getOrderId())){
			order.setIsValid(1);
			return orderDao.createOrder(order);
		}else{
			return orderDao.saveOrder(order);
		}
	}
	
	public void saveOrderInfo(Order order,Client client){
		if(Utils.isEmpty(order) || Utils.isEmpty(client)){
			return;
		}
		clientService.saveClient(client);
		order.setClientId(client.getClientId());
//		order.setClientSource(client.getClientSource());
		saveOrder(order);
	}
	
	public OrderDetail saveOrderDetail(String orderId, Goods goods, Integer quantity, BigDecimal discount){
		if(Utils.isEmpty(orderId) || Utils.isEmpty(goods) || Utils.isEmpty(goods.getGoodsId())){
			return null;
		}
		Map params = new HashMap();
		params.put("orderId", orderId);
		params.put("goodsId", goods.getGoodsId());
		OrderDetail orderDetail = orderDetailDao.getOrderDetailByGoodsId(params);
		if(Utils.isEmpty(orderDetail)){
			orderDetail = new OrderDetail();
			orderDetail.setCreateUserId(sessionManager.getAuthor().getUserId());
			orderDetail.setGoodsId(goods.getGoodsId());
			orderDetail.setGoodsName(goods.getGoodsName());
			orderDetail.setOrgPrice(goods.getOrgPrice());
			orderDetail.setGoodsDesc(goods.getGoodsDesc());
			orderDetail.setLabel(goods.getLabel());
			orderDetail.setOrderId(orderId);
			orderDetail.setQuantity(quantity);
			orderDetail.setDiscount(discount);
			orderDetail.setPrice(orderDetail.getOrgPrice()
					.multiply(new BigDecimal(orderDetail.getQuantity())));
			orderDetail.setTotalPrice(Utils.round(orderDetail.getPrice()
					.multiply(orderDetail.getDiscount()
							.divide(new BigDecimal(10)))
							,2));
			orderDetail.setIsValid(1);
			orderDetailDao.createOrderDetail(orderDetail);
		}else{
			orderDetail.setQuantity(quantity);
			orderDetail.setDiscount(discount);
			orderDetail.setPrice(orderDetail.getOrgPrice()
					.multiply(new BigDecimal(orderDetail.getQuantity())));
			orderDetail.setTotalPrice(Utils.round(orderDetail.getPrice()
					.multiply(orderDetail.getDiscount()
							.divide(new BigDecimal(10)))
							,2));
			orderDetailDao.saveOrderDetail(orderDetail);
		}
		return orderDetail;
	}
	
	public int cancelOrderDetail(Map params){
		if(Utils.isEmpty(params)){
			return 0;
		}
		String orderId = (String) params.get("orderId");
		String goodsId = (String) params.get("goodsId");
		if(Utils.isEmpty(orderId) || Utils.isEmpty(goodsId)){
			return 0;
		}
		return orderDetailDao.cancelGoods(params);
	}
	
	public Map getTodaySales(){
		Map resM = null;
		Map params = new HashMap();
		params.put("userId", sessionManager.getAuthor().getUserId());
		resM = orderDao.getTodaySales(params);
		return resM;
	}
	
	public List<Map<String,Object>> getSalesStatByDay(){
		return orderDao.getSalesStatByDay(null);
	}
	
	public List<String> getSalesStatDayCon(){
		return orderDao.getSalesStatDayCon(null);
	}
	
	public List<Map<String,Object>> getSalesStatByMonth(){
		return orderDao.getSalesStatByMonth(null);
	}
	
	public List<String> getSalesStatMonthCon(){
		return orderDao.getSalesStatMonthCon(null);
	}
	
	public List<Map<String,Object>> getSalesStatByYear(){
		return orderDao.getSalesStatByYear(null);
	}
	
	public List<String> getSalesStatYearCon(){
		return orderDao.getSalesStatYearCon(null);
	}
	
	public List<Map<String,Object>> getProStatByDay(){
		return orderDao.getProStatByDay(null);
	}
	
	public List<Map<String,Object>> getProStatByMonth(){
		return orderDao.getProStatByMonth(null);
	}
	
	public List<Map<String,Object>> getProStatByYear(){
		return orderDao.getProStatByYear(null);
	}
	
	public BigDecimal getDiscount(String orderId){
		BigDecimal d = orderDao.getDiscount(orderId);
		return Utils.isEmpty(d) ? new BigDecimal(10) : d;
	}
	
	public int delOrder(String orderId){
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("orderId", orderId);
		params.put("updateUserId", sessionManager.getAuthor().getUserId());
		return orderDao.delOrder(params);
	}
}
