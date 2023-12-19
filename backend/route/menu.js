import { Router } from "express";
import menuController from "../controller/menu.js";
import onAuth from "../middleware/onAuth.js";
const route = Router()

route.post('/add' , onAuth , menuController.create)
route.get('/all' , onAuth , menuController.getAll)
route.get('/:id' , menuController.getById)
route.get('/categorie/:id' , menuController.getByCategory)
route.get('/all/:id' , onAuth , menuController.getByCategory)

export default route