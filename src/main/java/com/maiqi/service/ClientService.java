package com.maiqi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maiqi.component.Utils;
import com.maiqi.dao.ClientDao;
import com.maiqi.po.Client;

@Service
public class ClientService {

	@Autowired
	private ClientDao clientDao;
	
	public Client getClientByPhoneNum(String phoneNum){
		if(Utils.isEmpty(phoneNum)){
			return null;
		}
		return clientDao.selectClientByPhoneNum(phoneNum);
	}
}
