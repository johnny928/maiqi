package maiqi;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.maiqi.component.SecurityUtils;
import com.maiqi.dao.ClientDao;
import com.maiqi.dao.GoodsDao;
import com.maiqi.dao.OrderDao;
import com.maiqi.dao.OrderDetailDao;
import com.maiqi.dao.UserDao;
import com.maiqi.po.Client;
import com.maiqi.po.Goods;
import com.maiqi.po.Order;
import com.maiqi.po.OrderDetail;
import com.maiqi.po.User;

public class DataInit extends BaseJunit4Test{
	
	Logger logger = LogManager.getLogger(DataBaseTest.class);
	
	@Autowired
	private GoodsDao goodsDao;
	
	@Autowired
	private ClientDao clientDao;
	
	@Autowired
	private OrderDao orderDao;
	
	@Autowired
	private OrderDetailDao orderDetailDao;
	
	@Autowired
	private UserDao userDao;
	
	public static String CREATE_USER_ID = "be9ddd47-ec70-11e7-ba81-3417eb84357b";
	
	@Test
	public void OrderTest(){
		initOrder();
	}
	
	/**用户初始化
	 * @param userN
	 * @return
	 */
	public List<User> initUser(int userN){
		List<User> ls = new ArrayList<User>();
		String passwordMD5 = SecurityUtils.getMD5("a");
		for(int i =0; i< userN; i++){
			User u = new User();
			u.setUserName("用户【"+i+"】");
			u.setUserDesc("测试用户");
			u.setLoginName("user_"+i);
			u.setCreateUserId(CREATE_USER_ID);
			u.setPassword(passwordMD5);
			u.setUpdateUserId(CREATE_USER_ID);
			userDao.createUser(u);
			ls.add(u);
		}
		return ls;
	}
	
	public List<Client> initClient(int clientN){
		List<Client> ls = new ArrayList<Client>();
		for(int i = 0; i<clientN; i++){
			Client c = new Client();
			c.setClientName("客户【"+i+"】");
			c.setBirthday(Utils4Test.randomDate("1970-01-01", "2000-01-01"));
			c.setCreateUserId(CREATE_USER_ID);
			c.setUpdateUserId(CREATE_USER_ID);
			c.setLabel(Utils4Test.getClientLabel());
			c.setLevel(Utils4Test.getClientLevel());
			c.setPhoneNum(Utils4Test.getClientPhone());
			c.setSex(Utils4Test.getSex());
			clientDao.createClient(c);
			ls.add(c);
		}
		return ls;
	}
	
	public List<Goods> initGoods(int goodsN){
		List<Goods> ls = new ArrayList<Goods>();
		for(int i=0; i<goodsN; i++){
			Goods g = new Goods();
			g.setGoodsName("商品【"+i+"】");
			g.setCreateUserId(CREATE_USER_ID);
			g.setGoodsDesc("测试商品");
			g.setLabel(Utils4Test.getGoodsLabel());
			g.setOrgPrice(Utils4Test.getPrice());
			g.setUpdateUserId(CREATE_USER_ID);
			goodsDao.createGoods(g);
			ls.add(g);
		}
		return ls;
	}
	
	public BigDecimal initOrderDetail(String orderId,int detailN, List<Goods> gl){
		BigDecimal total = new BigDecimal(0);
		for(int i=0; i<detailN; i++){
			OrderDetail od = new OrderDetail();
			Goods g = (Goods)Utils4Test.getRadomFromList(gl);
			od.setOrderId(orderId);
			od.setCreateUserId(CREATE_USER_ID);
			od.setUpdateUserId(CREATE_USER_ID);
			od.setGoodsId(g.getGoodsId());
			od.setGoodsName(g.getGoodsName());
			od.setDiscount(Utils4Test.geDiscount());
			od.setOrgPrice(g.getOrgPrice());
			od.setQuantity(Utils4Test.getQuantity(0));
			od.setPrice(od.getOrgPrice().multiply(od.getDiscount().divide(new BigDecimal(10),2,BigDecimal.ROUND_HALF_UP)));
			od.setTotalPrice(od.getPrice().multiply(new BigDecimal(od.getQuantity())));
			orderDetailDao.createOrderDetail(od);
			total.add(od.getTotalPrice());
		}
		return total;
	}
	
	public void initOrder(){
		int userN = 4, clientN = 40, goodsN = 200, orderN = 500, orderDetail = 20;
		Random radom = new Random();
		List<User> userList = initUser(userN);
		List<Client> clientList = initClient(clientN);
		List<Goods> goodsList = initGoods(goodsN);
		for(int i=0; i<orderN; i++){
			Order o = new Order();
			o.setCreateUserId(CREATE_USER_ID);
			o.setUpdateUserId(CREATE_USER_ID);
			o.setOrderNumber(orderDao.getOrderNumber());
			o.setClientId(((Client)Utils4Test.getRadomFromList(clientList)).getClientId());
			o.setSalespersonId(((User)Utils4Test.getRadomFromList(userList)).getUserId());
			orderDao.createOrder(o);
			o.setTotalPrice(initOrderDetail(o.getOrderId(),radom.nextInt(orderDetail),goodsList));
			orderDao.saveOrder(o);
		}
	}
}
