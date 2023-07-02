interface ITravelRoute {
  id?: number;
  name?: string;
  startingPoint?: string;
  endingPoint?: string;
  distance?: number
}

export class TravelRoute implements ITravelRoute {
  constructor(
    public id?: number,
    public name?: string,
    public startingPoint?: string,
    public endPoint?: string,
    public distance?: number
  ) {}
}
