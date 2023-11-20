import { Router } from "express";
import RestoController from "../controller/restaurant.js";
import onAuth from "../middleware/onAuth.js";

const route = Router()

route.post('/register' , RestoController.create);
route.post('/login' , RestoController.login);
route.put('/:id' , onAuth ,RestoController.edit);
route.get('/all' , RestoController.all)

export default route