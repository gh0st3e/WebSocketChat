import {MessageService} from "../service/message";
import {logger} from "../main"
import {Auth} from "../middleware/auth"

import express from "express";

const messageRouter = express.Router()

// Insert Message
messageRouter.post('/', Auth.AuthToken, async (req,res)=>{
    try{
        const {msg,chat_id,sender,msg_type} = req.body
        const message = await MessageService.InsertMessage(msg,chat_id,sender,msg_type)
        if (message) {
            res.statusCode = 200
            res.json({message})
        } else {
            res.statusCode = 400
            res.setHeader("Content-Type", "plain/text")
            res.end("Fill The Data")
        }
    }catch(err){
        logger.error(err)
        res.statusCode = 500
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(err))
    }
})

// Retrieve Messages
messageRouter.get('/:id', Auth.AuthToken, async (req,res)=>{
    try{
        const id: number = Number(req.params.id);
        const messages = await MessageService.RetrieveAllMessages(id)
        if (messages) {
            res.statusCode = 200
            res.end(JSON.stringify(messages))
        } else {
            res.statusCode = 404
            res.setHeader("Content-Type", "plain/text")
            res.end("No Messages")
        }
    }catch(err){
        logger.error(err)
        res.statusCode = 500
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(err))
    }
})

// Retrieve Messages
messageRouter.get('/:id/:text', Auth.AuthToken, async (req,res)=>{
    try{
        const id: number = Number(req.params.id);
        const text: string = req.params.text
        const messages = await MessageService.RetrieveMessageByText(text,id)
        if (messages) {
            res.statusCode = 200
            res.end(JSON.stringify(messages))
        } else {
            res.statusCode = 404
            res.setHeader("Content-Type", "plain/text")
            res.end("No Messages")
        }
    }catch(err){
        logger.error(err)
        res.statusCode = 500
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(err))
    }
})

export {messageRouter}