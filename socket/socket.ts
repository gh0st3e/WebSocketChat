import fs from "fs"

import { logger } from "../main";
import { Auth } from "../middleware/auth";
import { MessageService } from "../service/message";
import { Message } from "../model/message";
import { ChatService } from "../service/chat";

import {Server} from "socket.io"

function InitSocket(io: Server){
    io.on("connection", (socket) => {
        logger.info('A user connected');

        socket.on("sendMessage", (message) => {
            logger.info(message)

            const sender = Auth.DecodeToken(message.sender)
            logger.info(sender?.id)

            const msg = Message.build({
                msg: message.msg,
                chat_id: message.chat_id,
                sender: sender?.id,
                msg_type: message.msg_type,
                created_at: new Date()
            });

            io.emit("receiveMessage", msg);
            MessageService.InsertMessage(msg.msg,msg.chat_id,msg.sender,msg.msg_type)
        });

        socket.on("createChat", (name,token)=>{
            logger.info(name,token)

            const sender = Auth.DecodeToken(token)
            logger.info(sender?.id)

            ChatService.InsertChat(name, sender?.id).then(chat=>{
                logger.info(chat)
                io.emit("refreshChats", chat)
            })

            
        })

        socket.on("uploadFile",(file,msg,callback)=>{
            logger.info(file)
            logger.info(msg.msg)

            const sender = Auth.DecodeToken(msg.sender)
            console.log(sender)

            saveFileToDirectory(file,msg.msg,"files")
            const Msg = Message.build({
                msg: "files/"+msg.msg,
                chat_id: msg.chat_id,
                sender: sender?.id,
                msg_type: msg.msg_type,
                created_at: new Date()
            });
            MessageService.InsertMessage(Msg.msg,Msg.chat_id,Msg.sender,Msg.msg_type)
            io.emit("receiveMessage", Msg);
            callback("success");
        })

        socket.on("disconnect", () => {
            logger.info('A user disconnected');
        });
    });
}

function saveFileToDirectory(fileBytes: Uint8Array, fileName: string, directoryPath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const filePath = `${directoryPath}/${fileName}`;
  
      fs.writeFile(filePath, Buffer.from(fileBytes), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(filePath);
        }
      });
    });
}

export {InitSocket}