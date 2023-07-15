import sequelize from "./db"

import {Model, DataTypes} from "sequelize";

class Chat extends Model{
    public id!: number;
    public name!: string;
    public creator!: number;
}

async function InsertChat(name: string, creator: number){
    return Chat.create(
        {
            name: name,
            creator: creator
        })
}

async function RetrieveAllChats(){
    return Chat.findAll({raw: true})
}

async function RetriveChatByID(id: number){
    return Chat.findOne({where: {id: id}, raw: true})
}

Chat.init(
    {
        name:{
            type: DataTypes.STRING,
            unique: true
        },
        creator:{
            type: DataTypes.INTEGER
        },

    },{
        tableName:'chats',
        sequelize,
        createdAt:false,
        updatedAt:false
    }
)

export default {
    InsertChat,
    RetrieveAllChats,
    RetriveChatByID
}

export {Chat}