import { Sequelize } from "sequelize";
import restaurantModel from "../model/restaurant.js";
import categorieModel from "../model/categorie.js"
import menuModel from "../model/menu.js"

const sequelize = new Sequelize('la_carte' , 'root' , "" , {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions : {
        timeZone : 'Etc/GMT-2'
    },
    logging : true
});
try {
    await sequelize.authenticate();
    console.log("Connecté a la base de donnée avec succès !!!");
} catch (error) {
    console.log("une erreur s'est produite lors de la connexion avec la base de donnée " ,error)
}


// initialisation des models de nos table 
const dataBase = {}
dataBase.sequelize = sequelize
dataBase.restaurant = restaurantModel(sequelize)
dataBase.categorie = categorieModel(sequelize)
dataBase.menu = menuModel(sequelize)


// relation entre les differentes table de notre base de donnée 
dataBase.restaurant.hasMany(dataBase.categorie ,{
    foreignKey : {
        name :  'restaurant_id',
        allowNull : false
    }
})
dataBase.categorie.belongsTo(dataBase.restaurant ,{
    foreignKey : {
    name :'restaurant_id',
    allowNull : false
    }
})
dataBase.restaurant.hasMany(dataBase.menu ,{
    foreignKey : {
        name : "restaurant_id",
        allowNull : false
    }
})
dataBase.menu.belongsTo(dataBase.restaurant , {
    foreignKey : {
        name : 'restaurant_id',
        allowNull : false
    }
})
dataBase.categorie.hasMany(dataBase.menu , {
    foreignKey : {
        name : 'categorie_id',
        allowNull : false
    }
})
dataBase.menu.belongsTo(dataBase.categorie, {
    foreignKey : {
        name : "categorie_id",
        allowNull : false
    }
})



dataBase.sequelize.sync({alter : true});


export default dataBase;