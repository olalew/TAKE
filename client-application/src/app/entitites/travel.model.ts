import { Bus } from "./bus.model";
import { Client } from "./client.model";
import { TravelRoute } from "./travel-route.model";

interface ITravel {
  id?: number;
  name?: string;
  date?: string;
  clients?: Client[];
  buses?: Bus[];
  route?: TravelRoute;
}

export class Travel implements ITravel {
  constructor(
    public id?: number,
    public name?: string,
    public date?: string,
    public clients?: Client[],
    public buses?: Bus[],
    public route?: TravelRoute
  ) {}
}
