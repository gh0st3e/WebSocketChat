import sequelize from "./db"

import {Op} from "sequelize"
import {Model, DataTypes} from "sequelize";

class Message extends Model{
    public id!: number;
    public msg!: string;
    public chat_id!: number;
    public sender!: number;
    public msg_type!: string;
    public created_at!: Date;
}

async function InsertMessage(msg: string, chat_id: number, sender: number, msg_type: string){
    return Message.create(
        {   
            msg: msg,
            chat_id: chat_id,
            sender: sender,
            msg_type: msg_type
        })
}

async function RetrieveAllMessages(id: number){
    return Message.findAll({where: {chat_id: id}, raw: true})
}

async function RetrieveMessageByText(text: string, chatID: number){
    return Message.findAll({
        where:{
            msg:{
                [Op.like]: `%${text}%`,
            },
            chat_id: chatID
        }
    })
}

Message.init(
    {
        msg:{
            type: DataTypes.STRING,
        },
        chat_id:{
            type: DataTypes.INTEGER
        },
        sender:{
            type: DataTypes.INTEGER
        },
        msg_type:{
            type :DataTypes.STRING
        },
        created_at:{
            type :DataTypes.DATE
        }

    },{
        tableName:'messages',
        sequelize,
        createdAt:false,
        updatedAt:false
    }
)

export default{
    RetrieveAllMessages,
    RetrieveMessageByText,
    InsertMessage
}

export {Message}