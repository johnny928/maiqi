package com.maiqi.component;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtilsBean;

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
}
