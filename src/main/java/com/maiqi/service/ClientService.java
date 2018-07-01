package com.maiqi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maiqi.component.SessionManager;
import com.maiqi.component.Utils;
import com.maiqi.dao.ClientDao;
import com.maiqi.po.Client;

@Service
public class ClientService {

	@Autowired
	private ClientDao clientDao;
	
	@Autowired
	private SessionManager sessionManager;
	
	public Client getClientByPhoneNum(String phoneNum){
		if(Utils.isEmpty(phoneNum)){
			return null;
		}
		return clientDao.selectClientByPhoneNum(phoneNum);
	}
	
	public int saveClient(Client client){
		if(Utils.isEmpty(client)){
			return 0;
		}
		if(Utils.isEmpty(client.getClientId())){
			client.setCreateUserId(sessionManager.getAuthor().getUserId());
			return clientDao.createClient(client);
		}else{
			return clientDao.saveClient(client);
		}
	}
}
