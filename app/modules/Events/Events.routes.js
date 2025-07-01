import { Router } from "express";
import { createEvent, deleteEvent, getAllEvents, getEventById, getMyEvents, joinEvent, leaveEvent, updateEvent } from "./Events.controller.js";

const EventRoutes = Router() ;

EventRoutes.get('/', getAllEvents);
EventRoutes.get('/:id', getEventById);
EventRoutes.post('/', createEvent);
EventRoutes.put('/:id', updateEvent);
EventRoutes.delete('/:id', deleteEvent);
EventRoutes.post('/join/:id', joinEvent);
EventRoutes.post('/leave/:id', leaveEvent);
EventRoutes.get('/myevents/:id', getMyEvents);

export default EventRoutes ;