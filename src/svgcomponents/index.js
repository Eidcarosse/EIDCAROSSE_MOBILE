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
  { title: "Autos", show: "category.Autos", Icon: Car },
  { title: "Bikes", show: "category.Bikes", Icon: Bike },
  { title: "Boats", show: "category.Boats", Icon: Boat },
  { title: "Drones", show: "category.Drones", Icon: Drone },
  {
    title: "Construction Machines",
    show: "category.ConstructionMachines",
    Icon: Excavator,
  },
  { title: "Trucks", show: "category.Trucks", Icon: Trucks },
  { title: "Vans", show: "category.Vans", Icon: Van },
  { title: "Trailers", show: "category.Trailers", Icon: Trailer },
  { title: "Busses", show: "category.Busses", Icon: Bus },
  { title: "Parts", show: "category.Parts", Icon: SPart },
  { title: "Others", show: "category.Others", Icon: More },
];

export default categories;
