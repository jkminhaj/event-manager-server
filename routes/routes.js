import { Router } from "express";
import UserRoutes from "../app/modules/Users/Users.routes.js";
import EventRoutes from "../app/modules/Events/Events.routes.js";

const routes = Router();

routes.use("/users",UserRoutes);
routes.use("/events",EventRoutes);

export default routes; 