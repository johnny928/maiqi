package com.maiqi.service;

import java.util.List;
import java.util.Map;

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
			client.setIsValid(1);
			return clientDao.createClient(client);
		}else{
			client.setUpdateUserId(sessionManager.getAuthor().getUserId());
			return clientDao.saveClient(client);
		}
	}
	
	public List<Client> getClientsList(Map params){
		return clientDao.selectClients(params);
	}
	
	public int getClientsListCnt(Map params){
		return clientDao.selectClientsCnt(params);
	}
	
	public Client getClientById(String clientId){
		return clientDao.selectClientById(clientId);
	}
	
}
