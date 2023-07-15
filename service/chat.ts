import ChatModel, {Chat} from "../model/chat"
import {logger} from "../main"

export const RetrieveChatByID = async (id: number) => {
    logger.info("RetrieveChatByID started")
    if (!id) {
        logger.warn("Empty ID")
        return null
    }
    logger.info(id)
    const chat = await ChatModel.RetriveChatByID(id)
    logger.info(chat)
    logger.info("RetrieveChatByID ended")

    return chat
}

export const RetrieveAllChats = async () => {
    logger.info("RetrieveAllChats started")
    const chats = await ChatModel.RetrieveAllChats()
    logger.info(chats)
    logger.info("RetrieveAllChats ended")

    return chats
}

export const InsertChat = async (name: string, creator: number | undefined) => {
    logger.info("InsertChat Started")
    if (!name) {
        logger.warn("Empty Name")
        return null
    }
    if(!creator){
        logger.warn("Empty Creator")
        return null
    }
    logger.info(name,creator)
    const inserted = await ChatModel.InsertChat(name, creator)
    logger.info(inserted)
    logger.info("InsertChat Ended")

    return inserted
}

export const ChatService = {
    RetrieveAllChats,
    RetrieveChatByID,
    InsertChat
}