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

import models.Route;
import services.RouteEJB;


@Path(value="route")
public class RouteController {
	RouteEJB routeEJB;
	
	public RouteController() {
		routeEJB = new RouteEJB();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Route> getAllRoutes() {
		return routeEJB.getAllRoutes();
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void createRoute(Route route) {
		if(route.getId() != null) {
			throw new IllegalArgumentException();
		}
		routeEJB.createRoute(route);
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public void updateRoute(Route route) {
		if(route.getId() == null) {
			throw new IllegalArgumentException();
		}
		routeEJB.updateRoute(route);
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteRoute(@PathParam("id") Integer id) {
		routeEJB.deleteRoute(id);
	}
}
