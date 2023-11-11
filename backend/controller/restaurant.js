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
                link : `https://investcop-11623.web.app/${newResto.id}`
            };
            const imag_QRcode = "stockage/QRcode"+generateString(chaine , 100)+".png"
            // const img_code_qr = req.protocol+"://"+req.get('host')+"/"+imag_QRcode;
            QRCode.toFile(imag_QRcode , JSON.stringify(dataQRcode))
            .then(createdQRcode =>{
                res.status(200).json({valide1 : true , message1 : "ce restaurant à été ajoute avec succes !" , newResto ,valid2 : true , message2 : "le code QR du restaurant a été generer avec succès..." , imag_QRcode})
                console.log("le code qr est : "+imag_QRcode)
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
            const token = Jwt.sign({id : restaurant.id} , "RANDOM_TOKEN_SECRET" , {expiresIn : '24h'})
            res.cookie("token" , Jwt.sign({id : restaurant.id} , "RANDOM_TOKEN_SECRET" , {expiresIn : '24h'}))
            res.status(200).json({ id : restaurant.id , token , message : "connexion effectuée !"})
        } catch (error) {
            res.status(400).json({message : "une erreur est survenue lors du traitement !!!"})
            console.log(error)
        }
    }

    // modification des information du restaurant 
    static async edit(req , res){
        try {
            const { userId } = req.auth
            const restaurant = await Restaurant.findByPk(userId)
            if(!restaurant) return res.status(400).json({message : " veuillez vous connectez !!!"})
            const id = req.params.id
            if(id !== userId ) return res.status(400).json({message : "vous n'avez pas cette autorisation !!"})
            let updateUser = (req.body)
            const emailUsed = await Restaurant.findOne({where : {email : req.body.email}})
            const restoExist = await Restaurant.findOne({where : {nom : req.body.nom , location : req.body.location , commune : req.body.commune}})
            if(emailUsed){
                return res.status(400).json({message : "cet email est déjà utilisé !"})
            }else if(restoExist){
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
}

export default RestoController