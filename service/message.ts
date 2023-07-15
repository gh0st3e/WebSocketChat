import MessageModel, {Message} from "../model/message"
import {logger} from "../main"

export const RetrieveMessageByText = async (text: string, chatID: number) => {
    logger.info("RetrieveMessageByText started")
    if (!text) {
        logger.warn("Empty Text")
        return null
    }
    logger.info(text)
    const messages = await MessageModel.RetrieveMessageByText(text, chatID)
    logger.info(messages)
    logger.info("RetrieveMessageByText ended")

    return messages
}

export const RetrieveAllMessages = async (id: number) => {
    logger.info("RetrieveAllMessages started")
    const messages = await MessageModel.RetrieveAllMessages(id)
    logger.info(messages)
    logger.info("RetrieveAllMessages ended")

    return messages
}

export const InsertMessage = async (msg: string, chat_id: number, sender: number, msg_type: string) => {
    logger.info("InsertMessage Started")
    if (!msg) {
        logger.warn("Empty Msg")
        return null
    }
    if(!chat_id){
        logger.warn("Empty ChatID")
        return null
    }
    if(!sender){
        logger.warn("Empty Sender")
        return null
    }
    if(!msg_type){
        logger.warn("Empty MsgType")
        return null
    }
    logger.info(msg,chat_id,sender,msg_type)
    const inserted = await MessageModel.InsertMessage(msg, chat_id,sender,msg_type)
    logger.info(inserted)
    logger.info("InsertMessage Ended")

    return inserted
}

export const MessageService = {
    RetrieveAllMessages,
    RetrieveMessageByText,
    InsertMessage
}