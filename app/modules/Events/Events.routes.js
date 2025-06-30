import { Router } from "express";
import { GetEvents } from "./Events.controller.js";

const EventRoutes = Router() ;

EventRoutes.get("/get_assignments/:courseId",GetEvents);

export default EventRoutes ;