package com.maiqi.component;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtilsBean;

import com.maiqi.po.User;

public class Utils {
	
	public static BeanUtilsBean beanUtilsBean;
	
	public static boolean isEmpty(Object obj){
		if(obj == null){
			return true;
		}
		if(obj instanceof String && ((String) obj).length()==0){
			return true;
		}else if(obj instanceof List && ((List)obj).size()==0){
			return true;
		}
		return false;
	}
	
	public static void populate(Object bean, Map<String, ? extends Object> properties) throws IllegalAccessException, InvocationTargetException{
		if(beanUtilsBean == null){
			beanUtilsBean = new BeanUtilsBean();
		}
		beanUtilsBean.getConvertUtils().register(new org.apache.commons.beanutils.converters.BigDecimalConverter(null), BigDecimal.class);  
		beanUtilsBean.getConvertUtils().register(new org.apache.commons.beanutils.converters.DateConverter(null), java.util.Date.class);  
		  
		beanUtilsBean.getConvertUtils().register(new org.apache.commons.beanutils.converters.SqlTimestampConverter(null), java.sql.Timestamp.class);  
		beanUtilsBean.getConvertUtils().register(new org.apache.commons.beanutils.converters.SqlDateConverter(null), java.sql.Date.class);  
		beanUtilsBean.getConvertUtils().register(new org.apache.commons.beanutils.converters.SqlTimeConverter(null), java.sql.Time.class);  
		beanUtilsBean.populate(bean, properties);
	}
	
	public static BigDecimal round(BigDecimal num, int r){
		return num.add(new BigDecimal(0.0000000000000001)).setScale(r, RoundingMode.HALF_UP);
	}
	
	public static List<Map<String,Object>> trcChartsModel(List<String> x, List<String> users, List<Map<String,Object>> statRes, String xkey, String vkey, String ukey,String nameKey, String dataKey, Object defV){
		List<Map<String,Object>> resL = new ArrayList<Map<String,Object>>();
		Map userStatTmp = new HashMap();
		for(Map m : statRes){
			String u = (String)m.get(ukey);
			Map _m = Utils.isEmpty(userStatTmp.get(u))? new HashMap() : (Map) userStatTmp.get(u);
			_m.put( m.get(xkey) , m.get(vkey) );
			userStatTmp.put(u, _m);
		}
		Map userStat = new HashMap();
		for(String user : users){
			Map node = Utils.isEmpty(userStat.get(user)) ? new HashMap() : (Map)userStat.get(user);
			node.put(dataKey, Utils.trcListFromStatMap(x,(Map<String, Object>) userStatTmp.get(user), defV));
			userStat.put(user, node);
		}
		resL = Utils.trcChartsData(userStat, nameKey, dataKey);
		return resL;
	}
	
	public static List trcListFromStatMap(List<String> x, Map<String, Object> m, Object defV){
		List ls = new ArrayList();
		for(int i=0; i<x.size(); i++){
			String key = x.get(i);
			ls.add( (!Utils.isEmpty(m) && m.containsKey(key)) ? m.get(key) : defV );
		}
		return ls;
	}
	
	public static List trcChartsData(Map<String,Object> userStat, String nameKey, String dataKey){
		List ls = new ArrayList();
		for(Map.Entry<String, Object> entry : userStat.entrySet()){
			Map e = new HashMap<String,Object>();
//			e.put(dataKey, entry.getValue());
			e.putAll((Map) entry.getValue());
			e.put(nameKey, entry.getKey());
			ls.add(e);
		}
		return ls;
	}
}
