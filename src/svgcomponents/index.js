import Bike from "./bike";
import Boat from "./boat";
import Bus from "./bus";
import Car from "./car";
import Drone from "./drone";
import Trailer from "./dtruck";
import Excavator from "./excavator";
import More from "./other";
import SPart from "./sparepart";
import Trucks from "./trucks";
import Van from "./van";

const categories = [
  { title: "Autos", Icon: Car },
  { title: "Bikes", Icon: Bike },
  { title: "Boats", Icon: Boat },
  { title: "Drones", Icon: Drone },
  { title: "Construction Machine", Icon: Excavator },
  { title: "Trucks", Icon: Trucks },
  { title: "Vans", Icon: Van },
  { title: "Trailers", Icon: Trailer },
  { title: "Busses", Icon: Bus },
  { title: "Parts", Icon: SPart },
  { title: "Others", Icon: More },
];

export default categories;
