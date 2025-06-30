import { Router } from "express";
import { loginUser, registerUser } from "./Users.controller.js";

const UserRoutes = Router() ;

UserRoutes.post("/login",loginUser);
UserRoutes.post("/register",registerUser);

export default UserRoutes ;