import {UserService} from "../service/user";
import {logger} from "../main"
import {User} from "../model/user";
import {Auth} from "../middleware/auth"

import express from "express";

const authRouter = express.Router()

// Login User
authRouter.post('/signin', async (req,res)=>{
    try{
        const {login,password} = req.body
        const user = await UserService.RetrieveUser(login,password)
        if (user) {
            const tokens = Auth.GenerateToken(user)
            res.statusCode = 200
            res.json({tokens})
        } else {
            res.statusCode = 404
            res.setHeader("Content-Type", "plain/text")
            res.end("No such User")
        }
    }catch(err){
        logger.error(err)
        res.statusCode = 500
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(err))
    }
})

// Register User
authRouter.post("/signup", async (req, res) => {
    try {
        console.log(req.body)
        const user: User = JSON.parse(JSON.stringify(req.body));
        const inserted = await UserService.InsertUser(user)
        if (inserted) {
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(inserted))
        } else {
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(`Fill The Data`))
        }
    } catch (err) {
        res.statusCode = 500
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(err))
    }
})

export {authRouter}