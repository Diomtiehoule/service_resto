import { Router } from "express";
import RestoController from "../controller/restaurant.js";
import onAuth from "../middleware/onAuth.js";

const route = Router()

route.post('/register' , RestoController.create);
route.post('/login' , RestoController.login);
route.put('/edit' , onAuth ,RestoController.edit);
route.put('/delete' , onAuth , RestoController.delete)
route.put('/active' , onAuth , RestoController.active)
route.get('/getRestaurant' , onAuth ,RestoController.restaurant)
route.get('/all' , RestoController.all)
route.get('/:id', RestoController.getById)

export default route