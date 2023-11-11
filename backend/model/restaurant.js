import { DataTypes} from "sequelize";

export  default(connecion_model) =>{
    const restaurant = connecion_model.define("restaurant" , {
        id : {
            primaryKey:true,
            type : DataTypes.STRING(20),
            allowNull : false,
            autoIncrement : false,
            unique : true
        },
        nom: {
            type : DataTypes.STRING(25),
            allowNull : false
        },
        commune :{
            type : DataTypes.STRING(25),
            allowNull : false
        },
        location : {
            type : DataTypes.STRING(150),
            allowNull : false
        },
        contact : {
            type : DataTypes.STRING(10),
            allowNull : false
        },
        status : {
            type : DataTypes.INTEGER(1),
            allowNull : false,
            default : 1
        },
        email : {
            type : DataTypes.STRING(50),
            allowNull : false
            // unique : true
        },
        password : {
            type : DataTypes.STRING(100),
            allowNull : false
        }
    },
    {
            timestamps : true,
            createdAt : 'created_at',
            updatedAt : 'updated_at'
     })
    
    return restaurant;
}