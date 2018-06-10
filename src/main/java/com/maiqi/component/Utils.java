package com.maiqi.component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Utils {
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
}
