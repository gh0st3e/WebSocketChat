import UserModel, {User} from "../model/user"
import {logger} from "../main"

export const RetrieveUser = async (login: string, password: string) => {
    logger.info("RetrieveUser started")
    if (!login) {
        logger.warn("Empty Login")
        return null
    }
    if(!password){
        logger.warn("Empty Password")
        return null
    }
    logger.info(login)
    const user = await UserModel.RetrieveUser(login,password)
    logger.info(user)
    logger.info("RetrieveUser ended")

    return user
}

export const InsertUser = async (user: User) => {
    logger.info("Insert User Started")
    if (!user.login) {
        logger.warn("Empty Login")
        return null
    }
    if(!user.password){
        logger.warn("Empty Password")
        return null
    }
    if(!user.name){
        logger.warn("Empty Name")
        return null
    }
    logger.info(user)
    const inserted = await UserModel.InsertUser(user)
    logger.info(inserted)
    logger.info("Insert User Ended")

    return inserted
}

export const UserService = {
    RetrieveUser,
    InsertUser,
}