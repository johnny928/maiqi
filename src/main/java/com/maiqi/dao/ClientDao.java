package com.maiqi.dao;

import java.util.List;
import java.util.Map;

import com.maiqi.po.Client;

public interface ClientDao {
	public Client selectClientById(String clientId);
	
	public List<Client> selectClients(Map<String,Object> params);
	
	public int createClient(Client client);
	
	public int saveClient(Client client);
}
