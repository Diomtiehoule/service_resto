import { where } from "sequelize";
import dataBase from "../config/connexionSQL.js";
import generateString from "../utils/generatString.js";
const chaine = "0123456789abcdefghijklmnopqrstuvwxyz";

const Restaurant = dataBase.restaurant
const Categorie = dataBase.categorie

class categorieController{

    static async create(req , res){
        try {
            const { userId } = req.auth
            const resto = await Restaurant.findByPk(userId)
            if(!resto)return res.status(400).json({message : "vousn'avez pas cette autorisation !!"})
            req.body.id = "CATG"+generateString(chaine , 16)
            req.body.restaurant_id = userId
            const info = {
                id : "CATG"+generateString(chaine , 16),
                nom : req.body.nom,
                description : req.body.description,
                restaurant_id : userId,
                ...req.body
            }
            const categorieExist = await Categorie.findOne({where :{nom : req.body.nom , restaurant_id : userId}})
            if(categorieExist)return res.status(400).json({message : "cette catégorie existe déjà !"})
            const newCategorie = await Categorie.create(info)
            res.status(200).json({message : "cette categorie à été ajoutée avec succès !!" , newCategorie})
        } catch (error) {
            res.status(400).json({message : "une erreur est suervenue lors du traitement..."})
            console.log(error.message)
        }
    }

    static async allMyCategorie(req , res){
        try {
            const { userId } = req.auth
            const resto = await Restaurant.findByPk(userId)
            if(!resto)return res.status(400).json({message : "vous n'avez pas cette autorisation"})
            const myCategorie = await Categorie.findAndCountAll({where :  {restaurant_id : userId}})
            if(!myCategorie)return res.status(400).json({message : "votre liste de categorie est vide..."})
            res.status(200).json({message : "la liste de vos categories...", myCategorie})
        } catch (error) {
            res.status(401).json({message : "une erreur est survenue lors du traitement..."})
            console.log(error)
        }
    }
    static async getById( req , res){
        try {
            const {id} = req.params
            console.log('le params....' , req.params)
            console.log('--------------------------' , id)
            const categorie = await Categorie.findAndCountAll({where :{ restaurant_id : id}})
            console.log('la categorie' ,categorie)
            if(!categorie) return res.status(400).json({message : "aucune categorie trouvé !"})
            res.status(200).json({message : 'liste des categories' , categorie})
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "une erreur est survenue lors du traitement !!!"})
        }
    }

    static async edit(req , res){
        try {
            const { userId }= req.auth
            const id = req.params.id
            const resto = await Restaurant.findByPk(userId)
            if(!resto)return res.status(400).json({message : "vous n'avez pas cette autorisation !"})
            const categorie = await Categorie.findByPk(id)
            if(!categorie)return res.status(400).json({message : "cette categorie n'existe pas"})
            const info =(req.body)
            const categorieUpdate = await Categorie.update(info , {where : {id}})
            res.status(200).json({message : "votre categorie à été modifié avec succès" , categorieUpdate})
        } catch (error) {
            res.status(400).json({message : "une erreur est survenue lors du traitement..."})
            console.log(error)
        }
    }

    static async delete(req , res){
        try {
            const { userId } = req.auth
            const resto = await Restaurant.findByPk(userId)
            if(!resto)return res.status(400).json({message : "vous n'avez pas cette autorisation !"})
            const id = req.params.id
            const categorie = await Categorie.findByPk(id)
            if(!categorie)return res.status(400).json({message : "aucune categorie trouvé"})
            const info = {
                status : 0
            }
            const update = await Categorie.update(info , {where :{id}})
            res.status(200).json({message : "la categorie à été supprimée avec succès" , update})
        } catch (error) {
            res.status(400).json({message : "une erreur est survenu lors du traitement !!!"})
        }
    }
}

export default categorieController