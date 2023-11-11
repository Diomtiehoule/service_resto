import Jwt from "jsonwebtoken"

export const generateToken = (user) => {
    const tokenSecret = process.env.TOKEN_SECRET
    if(!tokenSecret) throw new Error ('token secret introuveable...')
    return Jwt.sign( user , tokenSecret , {expiresIn : '24h'})
}

export const verifyToken = (token) => {
    const tokenSecret = process.env.TOKEN_SECRET
    if(!tokenSecret) throw new Error ('token secret introuvable...')
    return Jwt.verify(token , tokenSecret)
}