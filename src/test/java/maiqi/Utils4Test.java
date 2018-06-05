package maiqi;

import java.math.BigDecimal;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Utils4Test {

	public static String getClientLabel(){
    	return getRadom(new String[]{"老客户","上班族","女强人","中年男","宅男","学生哥","学生妹","成熟女性","活泼","性感","爽朗","时尚女性"}, "," ,0);
    }
	
	public static int getClientLevel(){
		Random radom = new Random();
		return Math.abs(radom.nextInt()%5)+1;
	}
	
	public static String getClientPhone(){
		String[] str = String.format("%.8f", Math.random()).split("\\.");
		return ("136"+str[1]);
	}
	
	public static String getSex(){
		return getRadom(new String[]{"男","女"}, "" ,1);
	}
	
	public static String getGoodsLabel(){
    	return getRadom(new String[]{"女装冬衣","","女装夏装","女装春装","女装秋装","男装冬装","男装春装","男装夏装","男装秋装","鞋","包","帽子"}, "," ,0);
    }
	
	public static BigDecimal getPrice(){
		Random radom = new Random();
		return new BigDecimal(String.format("%.2f", (radom.nextInt(30000)+50)/100f));
	}
	
	public static BigDecimal geDiscount(){
		Random radom = new Random();
		return new BigDecimal(String.format("%.1f", (radom.nextInt(90)+10)/10f));
	}
	
	public static Object getRadomFromList(List ls){
		Random radom = new Random();
		return ls.get(radom.nextInt(ls.size()));
	}
	
	public static int getQuantity(int num){
		Random radom = new Random();
		return radom.nextInt(num==0?50:num);
	}
	
	/**从字符数组中获取随机组合
	 * @param labels
	 * @param separator
	 * @param num
	 * @return
	 */
	public static String getRadom(String[] labels, String separator, int num){
    	Random radom = new Random();
    	int labelN = num==0? Math.abs(radom.nextInt()%labels.length)+1 : num;
    	List ls = new ArrayList();
    	for(int i=0; i<labelN; i++){
    		ls.add(labels[Math.abs(radom.nextInt()%labels.length)]);
    	}
    	return listToString(ls,separator);
    }
	
	
	public static String listToString(List list, String separator) {  
	    StringBuilder sb = new StringBuilder();  
	    for (int i = 0; i < list.size(); i++) {  
	        sb.append(list.get(i)).append(separator);  
	    }  
	    return list.isEmpty()?"":sb.toString().substring(0, sb.toString().length() - 1);  
	} 
	
	/**获取某时间段中的随机时间
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	public static Date randomDate(String beginDate, String endDate) {  
        try {  
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");  
            Date start = (Date) format.parse(beginDate);// 构造开始日期  
            Date end = (Date) format.parse(endDate);// 构造结束日期  
            // getTime()表示返回自 1970 年 1 月 1 日 00:00:00 GMT 以来此 Date 对象表示的毫秒数。  
            if (start.getTime() >= end.getTime()) {  
                return null;  
            }  
            long date = random(start.getTime(), end.getTime());  
  
            return new Date(date);  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return null;  
    }  
  
	public static long random(long begin, long end) {  
        long rtn = begin + (long) (Math.random() * (end - begin));  
        // 如果返回的是开始时间和结束时间，则递归调用本函数查找随机值  
        if (rtn == begin || rtn == end) {  
            return random(begin, end);  
        }  
        return rtn;  
    } 
	
	public static void main(String[] args){
		
	}
}
