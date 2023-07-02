package models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="transport")
@Getter
@Setter
public class Transport {
	@Id
	@GeneratedValue
	private Integer id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="date")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Europe/Warsaw")
	private Date date;
		
	@ManyToMany
	private List<Client> clients;
	
	@ManyToMany
	private List<Bus> buses;
	
	@OneToOne
	private Route route;
	
	public Integer getId() {
		return id;
	}
	
	public String getName()	{
		return name;
	}
	
	public Date getDate() {
		return date;
	}
	
	public List<Client> getClients() {
		return clients;
	}
	
	public List<Bus> getBuses() {
		return buses;
	}
	
	public Route getRoute() {
		return route;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setDate(Date date) {
		this.date = date;
	}
	
	public void setClients(List<Client> clients) {
		this.clients = clients;
	}
	
	public void setBuses(List<Bus> buses) {
		this.buses = buses;
	}
	
	public void setRoute(Route route) {
		this.route = route;
	}
}
