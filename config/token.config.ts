import * as dotenv from 'dotenv'
dotenv.config()

export const TOKEN_CONFIG={
    ATSecret: process.env.ACS_TOK_SECRET,
    RTSecret: process.env.REF_TOK_SECRET
}