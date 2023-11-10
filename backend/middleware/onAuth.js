import Jwt  from "jsonwebtoken";


export default (req , res , next) => {
    console.log(req.headers.authorization.split(' ')[1])

    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = Jwt.verify(token , 'RANDOM_TOKEN_SECRET');
        console.log(decodedToken)
        req.auth = {userId : decodedToken.id};
        next();
    }catch(err){
        console.log(err)
        res.status(401).json({message : "une erreur s'est produit au niveau du token !!!"});
    }
}