import sequelize from "./db"

import {Model, DataTypes} from "sequelize";

class User extends Model{
    public id!: number;
    public login!: string;
    public password!: string;
    public name!: string;
}

async function RetrieveUser(login: string, password: string){
    return User.findOne({where: {login:login, password:password}, raw:true})
}

async function InsertUser(user: User){
    return User.create(
    {
        login: user.login,
        password: user.password,
        name: user.name
    })
}

User.init(
    {
        login:{
            type: DataTypes.STRING,
            unique: true
        },
        password:{
            type: DataTypes.STRING
        },
        name:{
            type: DataTypes.STRING
        }

    },{
        tableName:'users',
        sequelize,
        createdAt:false,
        updatedAt:false
    }
)

export default {
    RetrieveUser,
    InsertUser
}

export {User}