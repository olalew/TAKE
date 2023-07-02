package endpoints;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("ping")
public class PingController {

	@GET
	public String ping() {
//	    	EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("BookPu");
//	    	EntityManager manager = entityManagerFactory.createEntityManager();
//	    	
//	    	EntityTransaction transaction = manager.getTransaction();
//	    	transaction.begin();
//	    	
//	    	Book book = new Book();
//	    	book.setTitle("title");
//	    
//	    	manager.persist(book);
//	    	transaction.commit();
//	    	
//	    	manager.close();
//	    	entityManagerFactory.close();
//	    	
		return "Ping Works!";
	}

}
