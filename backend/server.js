import express, { urlencoded } from 'express'
import cors from "cors"
import bodyParser from 'body-parser'
import dataBase from './config/connexionSQL.js'
import restoRoute from './route/restaurant.js'
import categorieRoute from './route/categorie.js'
import menuRoute from './route/menu.js'
import { fileURLToPath } from 'url'
import path from 'path'
const app = express()


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  const __dirname = path.dirname(fileURLToPath(import.meta.url))

// middleware 
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended : true }))
app.use(express.static('public'))
app.use( "/stockage" ,express.static(path.join(__dirname, "stockage")))

// cors


// route
app.use('/api/restaurant' , restoRoute)
app.use('/api/categorie' , categorieRoute)
app.use('/api/menu' , menuRoute)


// initialisation et connexion a la base de donnée mysql
const port = process.env.PORT || 8081
dataBase.sequelize.authenticate()
.then(() => {
    app.listen(port, () =>{
        console.log(("server lance sur port "+ port))
    })
})
.catch(err => {
    console.log(err)
})

