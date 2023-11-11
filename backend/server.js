import express from 'express'
import cors from "cors"
import bodyParser from 'body-parser'
import dataBase from './config/connexionSQL.js'
import restoRoute from './route/restaurant.js'
import categorieRoute from './route/categorie.js'
import menuRoute from './route/menu.js'
const app = express()


// middleware 
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// route
app.use('/api/restaurant' , restoRoute)
app.use('/api/categorie' , categorieRoute)
app.use('/api/menu' , menuRoute)


// initialisation et connexion a la base de donnée mysql
const port = process.env.PORT || 8081
dataBase.sequelize.authenticate()
.then(() => {
    app.listen(port, () =>{
        console.log(("server lance sur port "+port))
    })
})
.catch(err => {
    console.log(err)
})

