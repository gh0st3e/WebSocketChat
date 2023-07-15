import fs from "fs"

import express from "express"

const authPage = fs.readFileSync('pages/auth.html')
const messangerPage = fs.readFileSync('pages/messenger.html')

const viewRouter = express.Router()

viewRouter.get("/auth", (req,res)=>{
    res.end(authPage)
})

viewRouter.get("/messenger",(req,res)=>{
    res.end(messangerPage)
})

export {viewRouter}