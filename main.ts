import http from 'http'
import fs from "fs"
import path from "path"

import sequelize from "./model/db"
import { authRouter } from "./controller/auth";
import { chatRouter } from "./controller/chat";
import { messageRouter } from "./controller/message";
import { viewRouter } from "./controller/views";
import { InitSocket } from "./socket/socket";

import bodyParser from "body-parser"
import express from "express"
import log4js from "log4js"; 
import {Server} from "socket.io"

const app: express.Application = express();
app.use(bodyParser.json())

app.use("/auth", authRouter)
app.use("/chat", chatRouter)
app.use("/msg", messageRouter)
app.use("/view",viewRouter)

app.use("/view/files", express.static(path.join(__dirname, "files")));


log4js.configure('./log4js.json')
const logger = log4js.getLogger()


fs.access("files", function(error){
    if (error) {
        fs.mkdir('files', err => {
            if(err ){
                logger.error(err)
                return
            } 
            logger.info('Folder successfully created');
         });
    } else {
        logger.info("Folder already exists");
    }
});

const port = 8080

sequelize
    .authenticate()
    .then(()=>{
        logger.info('Connection has been established successfully')

        const server = http.createServer(app)
        const io = new Server(server)

       InitSocket(io)

        server.listen(port, ()=>{
            logger.info(`Server is running on port: ${port}`)
        })
    })
    .catch((err)=>{
        logger.error('Unable to connect to the database: ', err)
    });

app.get("/", (req,res)=>{
    res.end("It works")
})

export {app,logger}

