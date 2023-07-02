package services;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import models.Bus;


@Stateless
public class BusEJB {
	
	EntityManager manager;
	
	EntityTransaction transaction;
	
	public BusEJB() {
		EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("BookPu");
    	this.manager = entityManagerFactory.createEntityManager();
	}
	
	public List<Bus> getAllBuses() {
		Query q = manager.createQuery("SELECT B FROM Bus B");
		@SuppressWarnings("unchecked")
		List<Bus> buses = q.getResultList();
		return buses;
	}
	
	public void createBus(Bus bus) {
		this.beginTransaction();
		manager.persist(bus);
		this.closeTransaction();
	}
	
	public void updateBus(Bus bus) {
		this.beginTransaction();
		manager.merge(bus);
		this.closeTransaction();
	}
	
	public void deleteBus(Integer id) {
		this.beginTransaction();
		Bus bus = manager.find(Bus.class, id);
		manager.remove(bus);
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
