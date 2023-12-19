import dataBase from "../config/connexionSQL.js";
import generateString from "../utils/generatString.js";
const chaine = "0123456789abcdefghijklmnopqrstuvwxyz";

const Menu = dataBase.menu
const Restaurant = dataBase.restaurant
const Categorie = dataBase.categorie

class menuController{
    static async create(req , res){
        try {
            const { userId } = req.auth
            console.log("id de l'utilisateur connecté..."+userId)
            const resto = await Restaurant.findByPk(userId)
            if(!resto)return res.status(400).json({message : "vous n'avez pas cette autorisation !!!"})
            console.log("le restaraunt connecté..."+resto)
            const categorie = await Categorie.findOne({where :{restaurant_id : userId , nom : req.body.category}})
            console.log("la categorie vise est...."+categorie)
            if(!categorie)return res.status(400).json({message : "cette categorie n'existe pas pour votre restaurant !"})
            const allCategorie = await Categorie.findOne( { where : {restaurant_id : userId , nom : req.body.category}})
            console.log("******************"+allCategorie.id)
            req.body.id = 'MENU'+generateString(chaine , 16)
            req.body.restaurant_id = userId
            req.body.categorie_id = allCategorie.id
            const info = {
                id : 'MENU'+generateString(chaine , 16),
                nom : req.body.nom,
                description : req.body.description,
                prix : req.body.prix,
                category : req.body.category,
                restaurant_id: userId,
                categorie_id : allCategorie.id,
                ...req.body
            }
            const menuExist = await Menu.findOne({ where : { nom : req.body.nom , description : req.body.description}})
            if(menuExist) return res.status(400).json({message : "ce menu existe déjà..."})
            const newMenu = await Menu.create(info)
            res.status(200).json({newMenu ,status : true ,message : "menu ajouté !"})
        } catch (error) {
            res.status(400).json({message : "une erreur est survenu lors  du traitement !!!"})
            console.log(error)
        }
    }

    static async getAll(req , res){
        try {
            const { userId } = req.auth
            const resto = await Restaurant.findByPk(userId)
            if(!resto)return res.status(400).json({message : "vous n'avez pas cette autorisation !!!"})
            const allCategorie = await Categorie.findOne( { where : {restaurant_id : userId}})
            console.log("toute les categories sont..."+allCategorie)
            const allMenu = await Menu.findAndCountAll({where : {restaurant_id : userId , status :1}})
            if(!allMenu) return res.status(400).json({message : "aucun menu disponible pour ce restauratnt..."})
            res.status(200).json({allMenu , status : true , message : "la liste des menu pour ce restaurant..."})
        } catch (error) {
            res.status(400).json({message : "une erreur est survenue lors du traitement !!!" , error : error.message})
            console.log(error)
        }
    }

    static async getByCategory(req , res){
        try {
            const { userId } = req.auth
            const id = req.params.id
            const resto = await Restaurant.findByPk(userId)
            if(!resto)return res.status(400).json({message : "vous n'avez pas cette autorisation !!!"})
            const allCategorie = await Categorie.findOne( { where : {restaurant_id : userId}})
            console.log("toute les categories sont..."+allCategorie)
            const allMenu = await Menu.findAndCountAll({where : {restaurant_id : userId , categorie_id : id ,status :1}})
            if(!allMenu) return res.status(400).json({message : "aucun menu disponible pour ce restauratnt..."})
            res.status(200).json({allMenu , status : true , message : "la liste des menu pour ce restaurant..."})
        } catch (error) {
            res.status(400).json({message : "une erreur est survenue lors du traitement !!!" , error : error.message})
            console.log(error)
        }
    }

    static async getById( req , res){
        try {
            const {id} = req.params
            console.log('le params....' , req.params)
            console.log('--------------------------' , id)
            const menus = await Menu.findAndCountAll({where :{ restaurant_id : id}})
            console.log('les menu' ,menus)
            if(!menus) return res.status(400).json({message : "aucune menu trouvé !"})
            res.status(200).json({message : 'liste des menus' , menus})
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "une erreur est survenue lors du traitement !!!"})
        }
    }

    static async getByCategory( req , res){
        try {
            const {id} = req.params
            console.log('le params....' , req.params)
            console.log('--------------------------' , id)
            const menus = await Menu.findAndCountAll({where :{ categorie_id : id}})
            console.log('les menu' ,menus)
            if(!menus) return res.status(400).json({message : "aucune menu trouvé !"})
            res.status(200).json({message : 'liste des menus' , menus})
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "une erreur est survenue lors du traitement !!!"})
        }
    }

}

export default menuController