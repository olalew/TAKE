package services;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import models.Client;


@Stateless
public class ClientEJB {
	
	@PersistenceContext(name="client")
	EntityManager manager;
	
	EntityTransaction transaction;
	
	public ClientEJB() {
		EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("BookPu");
    	this.manager = entityManagerFactory.createEntityManager();
	}
	
	public List<Client> getAllClients() {
		Query q = manager.createQuery("SELECT C FROM Client C");
		@SuppressWarnings("unchecked")
		List<Client> clients = q.getResultList();
		return clients;
	}
	
	public void createClient(Client client) {
		this.beginTransaction();
		manager.persist(client);
		this.closeTransaction();
	}
	
	public void updateClient(Client client) {
		this.beginTransaction();
		manager.merge(client);
		this.closeTransaction();
	}
	
	public void deleteClient(Integer id) {
		this.beginTransaction();
		Client client = manager.find(Client.class, id);
		manager.remove(client);
		this.closeTransaction();
	}
	
	private void beginTransaction() {
		transaction = manager.getTransaction();
    	transaction.begin();
	}
	
	private void closeTransaction() {
		transaction.commit();
    	manager.close();
	}
}
