import dataBase from "../config/connexionSQL.js";
import generateString from "../utils/generatString.js";
import bcrypt from "bcrypt"
const chaine = "0123456789abcdefghijklmnopqrstuvwxyz";
import Jwt  from "jsonwebtoken";
import cookie from "cookie-parser"
import { generateToken, verifyToken } from "../utils/generatToken.js";
import QRCode from "qrcode";



const Restaurant = dataBase.restaurant

class RestoController {
    // enregistrer le restaurant
    static async create(req , res){
        try {
        const restoExist = await Restaurant.findOne({where : {nom : req.body.nom , location : req.body.location , commune : req.body.commune}})
        const emailUsed = await Restaurant.findOne({where : { email : req.body.email}})
        const numExist = await Restaurant.findOne({where : {contact : req.body.contact}})
        if(restoExist || emailUsed) return res.status(400).json({message : 'cet restaurant existe deja ou email deja utilisé !!'})
        if (numExist) return res.status(400).json({message :"Ce contact est déja utilisé"})
        req.body.id = "RESTO" + generateString(chaine , 16)
        req.body.password = await bcrypt.hash(req.body.password , 10)
        await Restaurant.create(req.body)
        .then(newResto => {
            const dataQRcode ={
                id : newResto.id,
                nom : newResto.fullName,
                email : newResto.email,
                password : newResto.password,
                commune : newResto.commune,
                location : newResto.location,
                contact : newResto.contact,
                link : `http://localhost:5173/menu/${newResto.id}`
            };
            const imag_QRcode = "stockage/QRcode"+generateString(chaine , 50)+".png"
            const img_code_qr = req.protocol+"://"+req.get('host')+"/"+imag_QRcode;
            QRCode.toFile(imag_QRcode , JSON.stringify(dataQRcode))
            .then(createdQRcode =>{
                        Restaurant.update({img_code_qr : img_code_qr} , {where : {email : newResto.email}})
                        res.status(200).json({valide1 : true , message1 : "ce restaurant à été ajoute avec succes !" , newResto ,valid2 : true , message2 : "le code QR du restaurant a été generer avec succès..." , imag_QRcode , img_code_qr})
            })
            
        })
        .catch(err => {
            res.status(400).json({message : "impossible d'ajouter ce restaurant" , error : err.message})
            console.log(err)
        })
        } catch (error) {
            res.status(400).json({message : "une erreur est survenu lors du traitement !!!"})
            console.log(error)
        }
    }

    // connexion au restaurant
    static async login(req , res){
        try {
            const restaurant = await Restaurant.findOne({where : {email : req.body.email}})
            if(!restaurant) return res.status(400).json({message : "adresse mail ou mot de passe incorrect !!"})
            const valid = await bcrypt.compare(req.body.password , restaurant.password)
            if(!valid) return res.status(400).json({message : "adresse mail ou mot de passe incorrect !!"})
            const token = Jwt.sign({id : restaurant.id} , "LA_CARTE_TOKEN" , {expiresIn : '24h'})
            res.cookie("token" , token )
            res.status(200).json({ id : restaurant.id , token , message : "connexion effectuée !"})
        } catch (error) {
            res.status(400).json({message : "une erreur est survenue lors du traitement !!!"})
            console.log(error)
        }
    }

    static async getById( req , res){
        try {
            const {id} = req.params
            console.log('le params....' , req.params)
            // console.log('--------------------------' , id)
            const restaurant = await Restaurant.findByPk(id)
            // console.log(restaurant)
            if(!restaurant) return res.status(400).json({message : "aucun restaurant trouvé !"})
            res.status(200).json({message : 'le restaurant' , restaurant})
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "une erreur est survenue lors du traitement !!!"})
        }
    }

    // obtenir le restaurant 
    static async restaurant(req, res){
        try {
            const { userId } =req.auth
            console.log(userId)
            const restaurant = await Restaurant.findByPk(userId)
            console.log(restaurant)
            if(!restaurant) return res.status(400).json({message : 'veuillez vous connecter'})
            res.status(200).json({message : 'restaurant existe' , restaurant})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message : ' une erreur est survenu !!'})
        }
    }

    // modification des information du restaurant 
    static async edit(req , res){
        try {
            const { userId } = req.auth
            const restaurant = await Restaurant.findByPk(userId)
            if(!restaurant) return res.status(400).json({message : " veuillez vous connecter !!!"})
            // const id = req.params.id
            // if(id !== userId ) return res.status(400).json({message : "vous n'avez pas cette autorisation !!"})
            let updateUser = (req.body)
            // const emailUsed = await Restaurant.findOne({where : {email : req.body.email}})
            const restoExist = await Restaurant.findOne({where : {nom : req.body.nom , location : req.body.location , commune : req.body.commune}})
            // if(emailUsed){
            //     return res.status(400).json({message : "cet email est déjà utilisé !"})
            // }else 
            if(restoExist){
                return res.status(400).json({message : "ce restaurant existe déjà !!"})
            }
            const valid = await Restaurant.update(updateUser , {where : {id : userId}})
            if (!valid[0]) return res.status(400).json({message : "veuillez verifier vos informations"})
            res.status(200).json({message : "vos information ont été mise à jours avec succès !!!"})
        } catch (error) {
            res.status(400).json({message : "une erreur est survenue lors du traitement !!!"})
            console.log(error)
        }
    }

    static async delete (req , res){
        try {
            const { userId } = req.auth;
        const restaurant = await Restaurant.findByPk(userId)
        if(!restaurant) res.status(401).json({message : 'veuillez vous connecter !!!'})
        let update = {
            status : 0
        }
        const valid = await Restaurant.update(update , {where : { id : userId}})
        if(!valid)res.status(400).json({messsage : 'echec de la suppression du compte'})
        res.status(200).json({message : 'compte desactivé avec succès !!'})
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "une erreur est survenue lors du traitement !!!"})
        }
        
    }

    static async active (req , res){
        try {
            const { userId } = req.auth;
        const restaurant = await Restaurant.findByPk(userId)
        if(!restaurant) res.status(401).json({message : 'veuillez vous connecter !!!'})
        let update = {
            status : 1
        }
        const valid = await Restaurant.update(update , {where : { id : userId}})
        if(!valid)res.status(400).json({messsage : 'echec de la suppression du compte'})
        res.status(200).json({message : 'compte desactivé avec succès !!'})
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "une erreur est survenue lors du traitement !!!"})
        }
        
    }

    static async all(req , res){
        try {
        const resto = await Restaurant.findAndCountAll()
        if(!resto)return res.status(400).json({message : 'aucun resto trouve'})
        res.status(200).json({message : "liste des restaurant" , resto})
        } catch (error) {
            console.log(err)
            res.status(400).json({message :'une erreur est survenu...'})
        }
        
    }

}

export default RestoController