package endpoints;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import models.Client;
import services.ClientEJB;

@Path(value="client")
public class ClientController {
	ClientEJB clientEJB;
	
	public ClientController() {
		clientEJB = new ClientEJB();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Client> getAllClients() {
		return clientEJB.getAllClients();
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void createClient(Client client) {
		if(client.getId() != null) {
			throw new IllegalArgumentException();
		}
		clientEJB.createClient(client);
	}
	
	@PUT
	public void updateClient(Client client) {
		if(client.getId() == null) {
			throw new IllegalArgumentException();
		}
		clientEJB.updateClient(client);
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteClient(@PathParam("id") Integer id) {
		clientEJB.deleteClient(id);
	}
}
