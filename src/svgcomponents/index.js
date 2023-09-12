import Car from "./car";
import Bike from "./bike";
import Bus from "./bus";
import Boat from "./boat";
import Drone from "./drone";
import Excavator from "./excavator";
import More from "./other";
import Truck from "./truck";
import Van from "./van";
import SPart from "./sparepart";
import Trailer from "./dtruck";
import Trucks from "./trucks";

const categories = [
  { title: "Car", Icon: Car },
  { title: "Bikes", Icon: Bike },
  { title: "Boats", Icon: Boat },
  { title: "Drones", Icon: Drone },
  { title: "Construction Machines", Icon: Excavator },
  { title: "Trucks", Icon: Trucks },
  { title: "Vans", Icon: Van },
  { title: "Trailers", Icon: Trailer },
  { title: "Buses", Icon: Bus },
  { title: "Parts", Icon: SPart },
  { title: "Others", Icon: More },
];

export default categories;
