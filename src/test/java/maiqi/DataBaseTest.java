package maiqi;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.maiqi.dao.ClientDao;
import com.maiqi.dao.GoodsDao;
import com.maiqi.dao.OrderDao;
import com.maiqi.dao.OrderDetailDao;
import com.maiqi.po.Client;
import com.maiqi.po.Goods;
import com.maiqi.po.Order;
import com.maiqi.po.OrderDetail;

public class DataBaseTest extends BaseJunit4Test{
	
	Logger logger = LogManager.getLogger(DataBaseTest.class);
	
	@Autowired
	private GoodsDao goodsDao;
	
	@Autowired
	private ClientDao clientDao;
	
	@Autowired
	private OrderDao orderDao;
	
	@Autowired
	private OrderDetailDao orderDetailDao;
	
	@Test
	public void createGoodsTest(){
		System.out.println("\n\n\n createGoods test start... \n\n");
		Goods goods = new Goods();
		goods.setGoodsName("测试商品");
		goods.setLabel("测试标签1,标签2,标签4");
		goods.setOrgPrice(new BigDecimal("21"));
		goods.setCreateUserId("0");
		goodsDao.createGoods(goods);
		
		
		System.out.println("\n\n\n createGoods \n\n");
		
		Goods goods2 = new Goods();
		goods2.setGoodsName("测试商品2");
		goods2.setLabel("测试标签5,标签2,标签4");
		goods2.setOrgPrice(new BigDecimal("25"));
		goods2.setCreateUserId("0");
		goodsDao.createGoods(goods2);
		
		System.out.println("\n\n\n createGoods2 \n\n");
		
		Goods goods3 = new Goods();
		goods3.setGoodsName("测试商品3");
		goods3.setLabel("测试标签6,标签7,标签9");
		goods3.setOrgPrice(new BigDecimal("36"));
		goods3.setCreateUserId("0");
		goodsDao.createGoods(goods3);
		
		System.out.println("\n\n\n createGoods3 \n\n");
		
		Goods oneGoods = goodsDao.selectGoodsById(goods.getGoodsId());
		System.out.println("["+oneGoods.getGoodsId()+","+oneGoods.getGoodsName()+","+oneGoods.getLabel()+"]");
		goods.setGoodsName("商品0");
		goods.setUpdateUserId("01");
		goodsDao.saveGoods(goods);
		
		System.out.println("\n\n\n saveGoods \n\n");
		
		Map params = new HashMap();
		List labels = new ArrayList();
		labels.add("标签2");
		labels.add("标签4");
		params.put("labels", labels);
		List<Goods> ls = goodsDao.selectGoods(params);
		System.out.println(">>>>>标签2,标签4");
		for(Goods g : ls){
			System.out.println("["+g.getGoodsId()+","+g.getGoodsName()+","+g.getLabel()+"]");
		}
		params.put("goodsName", "测试商品");
		ls = goodsDao.selectGoods(params);
		System.out.println(">>>>>标签2,标签4, goodsName like 测试商品%");
		for(Goods g : ls){
			System.out.println("["+g.getGoodsId()+","+g.getGoodsName()+","+g.getLabel()+"]");
		}
	}
	
	@Test
	public void clientTest(){
		Client c1 = new Client();
		c1.setClientName("c1");
		c1.setBirthday(Date.valueOf("2017-11-01"));
		c1.setLabel("A,B");
		c1.setLevel(1);
		c1.setPhoneNum("13598489949");
		c1.setSex("男");
		c1.setCreateUserId("00");
		clientDao.createClient(c1);
		
		Client c2 = new Client();
		c2.setClientName("c2");
		c2.setBirthday(Date.valueOf("2017-11-02"));
		c2.setLabel("A,C");
		c2.setLevel(1);
		c2.setPhoneNum("13598489950");
		c2.setSex("男");
		c2.setCreateUserId("00");
		clientDao.createClient(c2);
		
		Client c3 = new Client();
		c3.setClientName("c3");
		c3.setBirthday(Date.valueOf("2017-11-03"));
		c3.setLabel("C,D");
		c3.setLevel(1);
		c3.setPhoneNum("13598489951");
		c3.setSex("男");
		c3.setCreateUserId("00");
		clientDao.createClient(c3);
		
		logger.debug(String.format("c1:【%s,%s,%s,%s】", c1.getClientName(),c1.getLabel(),c1.getPhoneNum(),c1.getLevel()));
		logger.debug(String.format("c2:【%s,%s,%s,%s】", c2.getClientName(),c2.getLabel(),c2.getPhoneNum(),c2.getLevel()));
		logger.debug(String.format("c3:【%s,%s,%s,%s】", c3.getClientName(),c3.getLabel(),c3.getPhoneNum(),c3.getLevel()));
		
		c3.setLevel(3);
		c3.setUpdateUserId("test");
		clientDao.saveClient(c3);
		logger.debug("--------------------saveClient");
		logger.debug(String.format("c3:【%s,%s,%s,%s】", c3.getClientName(),c3.getLabel(),c3.getPhoneNum(),c3.getLevel()));
		logger.debug("--------------------saveClient end");
		
		Map params = new HashMap();
		params.put("birthday", Date.valueOf("2017-11-03"));
		List<Client> ls = clientDao.selectClients(params);
		for(Client c : ls){
			logger.debug(String.format("【%s,%s,%s,%s,%s】", c.getClientName(),c.getLabel(),c.getPhoneNum(),c.getLevel(),c.getUpdateTime()));
		}
	}
	
	@Test
	public void OrderTest(){
		
		Order or1 = new Order();
		or1.setCreateUserId("0");
		or1.setSalespersonId("saler1");
		or1.setTotalPrice(new BigDecimal("12.3"));
		or1.setOrderNumber(orderDao.getOrderNumber());
		orderDao.createOrder(or1);
		
		Order or2 = new Order();
		or2.setCreateUserId("0");
		or2.setSalespersonId("saler2");
		or2.setTotalPrice(new BigDecimal("1212.3"));
		or2.setOrderNumber(orderDao.getOrderNumber());
		orderDao.createOrder(or2);
		
		Order or3 = new Order();
		or3.setCreateUserId("0");
		or3.setSalespersonId("saler1");
		or3.setTotalPrice(new BigDecimal("312.3"));
		or3.setOrderNumber(orderDao.getOrderNumber());
		orderDao.createOrder(or3);
		
		logger.debug(String.format("created:【%s,%s,%s】", or1.getOrderNumber(),or1.getSalespersonId(),or1.getTotalPrice()));
		logger.debug(String.format("created:【%s,%s,%s】", or2.getOrderNumber(),or2.getSalespersonId(),or2.getTotalPrice()));
		logger.debug(String.format("created:【%s,%s,%s】", or3.getOrderNumber(),or3.getSalespersonId(),or3.getTotalPrice()));
		
		or3.setSalespersonId("new saler");
		or3.setTotalPrice(new BigDecimal("300.9"));
		or3.setUpdateUserId("u1");
		orderDao.saveOrder(or3);
		logger.debug(String.format("save:【%s,%s,%s】", or3.getOrderNumber(),or3.getSalespersonId(),or3.getTotalPrice()));
		
		Map params = new HashMap();
		params.put("orderTimeS", "2018-03-13 00:00:00");
		params.put("orderTimeE", "2018-03-13 22:50:00");
		params.put("salespersonId", "saler1");
		params.put("curPageNum", 1);
		params.put("pageSize", 10);
		int cnt = orderDao.selectOrdersCnt(params);
		logger.debug(String.format("select:【CNT=%s】", cnt));
		List<Order> ls = orderDao.selectOrders(params);
		for(Order o : ls){
			logger.debug(String.format("select:【%s,%s,%s】", o.getOrderNumber(),o.getSalespersonId(),o.getTotalPrice()));
		}
	}
	
	@Test
	public void OrderDetailTest(){
		OrderDetail od1 = new OrderDetail();
		od1.setCreateUserId("o");
		od1.setDiscount(new BigDecimal("0.56"));
		od1.setGoodsId("g1");
		od1.setGoodsName("g1 name");
		od1.setOrgPrice(new BigDecimal("56.3"));
		od1.setOrderId("order1");
		od1.setPrice(new BigDecimal("25"));
		od1.setQuantity(2);
		od1.setTotalPrice(new BigDecimal("80"));
		orderDetailDao.createOrderDetail(od1);
		
		OrderDetail od2 = new OrderDetail();
		od2.setCreateUserId("o");
		od2.setDiscount(new BigDecimal("0.8"));
		od2.setGoodsId("g2");
		od2.setGoodsName("g2 name");
		od2.setOrgPrice(new BigDecimal("56.3"));
		od2.setOrderId("order1");
		od2.setPrice(new BigDecimal("50"));
		od2.setQuantity(2);
		od2.setTotalPrice(new BigDecimal("100"));
		orderDetailDao.createOrderDetail(od2);
		
		OrderDetail od3 = new OrderDetail();
		od3.setCreateUserId("o");
		od3.setDiscount(new BigDecimal("0.9"));
		od3.setGoodsId("g3");
		od3.setGoodsName("g3 name");
		od3.setOrgPrice(new BigDecimal("56.3"));
		od3.setOrderId("order1");
		od3.setPrice(new BigDecimal("52"));
		od3.setQuantity(3);
		od3.setTotalPrice(new BigDecimal("160"));
		orderDetailDao.createOrderDetail(od3);
		
		logger.debug(String.format("created:【%s,%s,%s】", od1.getOrderId(),od1.getGoodsName(),od1.getTotalPrice()));
		logger.debug(String.format("created:【%s,%s,%s】", od2.getOrderId(),od2.getGoodsName(),od2.getTotalPrice()));
		logger.debug(String.format("created:【%s,%s,%s】", od3.getOrderId(),od3.getGoodsName(),od3.getTotalPrice()));
		
		od3.setQuantity(4);
		od3.setTotalPrice(new BigDecimal("200"));
		od3.setUpdateUserId("u1");
		orderDetailDao.saveOrderDetail(od3);
		logger.debug(String.format("saved:【%s,%s,%s】", od3.getOrderId(),od3.getGoodsName(),od3.getTotalPrice()));
		
		List<OrderDetail> ls = orderDetailDao.selectOrderDetailsByOrderId("order1");
		for(OrderDetail od : ls){
			logger.debug(String.format("select:【%s,%s,%s】", od.getOrderId(),od.getGoodsName(),od.getTotalPrice()));
		}
	}
}
