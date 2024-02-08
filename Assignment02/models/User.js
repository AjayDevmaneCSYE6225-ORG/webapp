const {DataTypes, Sequelize} = require("sequelize");
const {sequelize}=require("../controllers/healthzController");
const FirstLastnameRegex = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
// const passwordRegex=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/

const User=sequelize.define("User", {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        readOnly: true,
        defaultValue: DataTypes.UUIDV4
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: FirstLastnameRegex
        }
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: FirstLastnameRegex
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        writeOnly: true,
        // validate:{
        //     is: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
        // }
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate: {
            isEmail: true,
        }
    },
    accountUpdated:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW,
        allowNull:false
    },
    accountCreated:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW,
        allowNull:false
    }
},
{
    timestamps:true,
    createdAt:false,
    updatedAt:false,
}
);

module.exports=User;