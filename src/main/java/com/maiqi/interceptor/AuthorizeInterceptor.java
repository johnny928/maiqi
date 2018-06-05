package com.maiqi.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.maiqi.component.Author;
import com.maiqi.component.SessionManager;

public class AuthorizeInterceptor extends HandlerInterceptorAdapter{

	Logger logger = LogManager.getLogger(AuthorizeInterceptor.class);
	
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		Author user =  (Author)request.getSession().getAttribute(SessionManager.Author_Key);  
		if(user == null){  
			logger.debug("Interceptor：跳转到login页面！");  
            request.getRequestDispatcher("/WEB-INF/pages/login.jsp").forward(request, response);
            return false;  
        }else  
            return true; 
	}

}
