import Jwt  from "jsonwebtoken";


export default (req , res , next) => {
    console.log(req.headers.authorization.split(' ')[1])

    try{
        const token = req.headers.authorization;
        const decodedToken = Jwt.verify(token , 'LA_CARTE_TOKEN');
        console.log(decodedToken)
        req.auth = {userId : decodedToken.id};
        next();
    }catch(err){
        console.log(err)
        res.status(401).json({message : "une erreur s'est produit au niveau du token !!!"});
    }
}