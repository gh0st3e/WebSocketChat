import {ChatService} from "../service/chat";
import {Auth} from "../middleware/auth"
import {logger} from "../main"

import express from "express";

const chatRouter = express.Router()

// New Chat
chatRouter.post('/', Auth.AuthToken, async (req,res)=>{
    try{
        const {name,creator} = req.body
        const chat = await ChatService.InsertChat(name,creator)
        if (chat) {
            res.statusCode = 200
            res.json({chat})
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

// Get All Chats
chatRouter.get("/", Auth.AuthToken, async (req, res) => {
    try{
        const chats = await ChatService.RetrieveAllChats()
        if (chats) {
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(chats))
        } else {
            res.statusCode = 404
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(`No chats`))
        }
    } catch (err) {
        res.statusCode = 500
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(err))
    }
})

// Get Chat By ID
chatRouter.get("/:id", Auth.AuthToken, async (req, res) => {
    try{
        const id: number = Number(req.params.id);
        const chat = await ChatService.RetrieveChatByID(id)
        if (chat) {
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(chat))
        } else {
            res.statusCode = 404
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(`No such chat`))
        }
    } catch (err) {
        res.statusCode = 500
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(err))
    }
})

export {chatRouter}