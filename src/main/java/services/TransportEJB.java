package services;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import models.Transport;

@Stateless
public class TransportEJB {

	@PersistenceContext(name = "transport")
	EntityManager manager;

	EntityTransaction transaction;

	public TransportEJB() {
		EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("BookPu");
		this.manager = entityManagerFactory.createEntityManager();
	}

	public List<Transport> getAllTransports() {
		Query q = manager.createQuery("SELECT T FROM Transport T");
		@SuppressWarnings("unchecked")
		List<Transport> transports = q.getResultList();
		return transports;
	}

	public void createTransport(Transport transport) {
		this.beginTransaction();
		manager.persist(transport);
		this.closeTransaction();
	}

	public void updateTransport(Transport transport) {
		this.beginTransaction();
		manager.merge(transport);
		this.closeTransaction();
	}

	public void deleteTransport(Integer id) {
		this.beginTransaction();
		Transport transport = manager.find(Transport.class, id);
		manager.remove(transport);
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

	public List<Transport> getAllTransportForClient(Integer id) {
		Query q = manager.createQuery("SELECT T FROM Transport T JOIN T.clients C WHERE C.id = :id");
		q.setParameter("id", id);
		@SuppressWarnings("unchecked")
		List<Transport> transports = q.getResultList();
		return transports;
	}
}
