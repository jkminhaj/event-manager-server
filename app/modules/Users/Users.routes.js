import { Router } from "express";
import { GetEvfadents } from "./Users.controller.js";

const UserRoutes = Router() ;

UserRoutes.get("/get_assignments/:courseId",GetEvfadents);

export default UserRoutes ;