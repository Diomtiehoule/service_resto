import categorieController from "../controller/categorie.js";
import { Router } from 'express';
import onAuth from "../middleware/onAuth.js";
const route = Router();

route.post('/add' , onAuth ,categorieController.create)
route.get('/all' , onAuth ,categorieController.allMyCategorie)
route.get('/:id' , categorieController.getById)
route.put('/:id' , onAuth ,categorieController.edit)
route.delete('/:id' , onAuth , categorieController.delete)

export default route