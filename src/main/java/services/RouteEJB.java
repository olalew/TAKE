package services;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import models.Route;


@Stateless
public class RouteEJB {
	
	@PersistenceContext(name="route")
	EntityManager manager;
	
	EntityTransaction transaction;
	
	public RouteEJB() {
		EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("BookPu");
    	this.manager = entityManagerFactory.createEntityManager();
	}
	
	public List<Route> getAllRoutes() {
		Query q = manager.createQuery("SELECT R FROM Route R");
		@SuppressWarnings("unchecked")
		List<Route> routes = q.getResultList();
		return routes;
	}
	
	public void createRoute(Route route) {
		this.beginTransaction();
		manager.persist(route);
		this.closeTransaction();
	}
	
	public void updateRoute(Route route) {
		this.beginTransaction();
		manager.merge(route);
		this.closeTransaction();
	}
	
	public void deleteRoute(Integer id) {
		this.beginTransaction();
		Route route = manager.find(Route.class, id);
		manager.remove(route);
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

