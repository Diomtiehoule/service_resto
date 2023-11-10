import { DataTypes } from "sequelize";

export default(connexion_model) =>{
    const categorie = connexion_model.define("categorie" ,{
        id : {type: DataTypes.STRING(20),
             primaryKey:true,
             allowNull : false,
             autoIncrement : false
            },
        nom : {
            type : DataTypes.STRING(30),
            allowNull : false
         },
         description : {
            type :DataTypes.STRING(100),
            allowNull : false
         },
         status : {
            type : DataTypes.INTEGER(1),
            allowNull : false,
            default : 1
        },
        restaurant_id : {
            type : DataTypes.STRING(20),
            allowNull : false
        }
    },
    {
        timestamps : true,
        createAt : "create_at",
        updateAt : "update_at"
    })
    return categorie
}