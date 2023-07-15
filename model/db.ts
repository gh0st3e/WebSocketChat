import {DB_CONFIG} from '../config/db.config'

import {Sequelize} from 'sequelize'
import {Dialect} from 'sequelize/types';

const sequelize = new Sequelize(
    DB_CONFIG.DB!,
    DB_CONFIG.USER!,
    DB_CONFIG.PASSWORD!,
    {
        host: DB_CONFIG.HOST,
        dialect: DB_CONFIG.DIALECT as Dialect
    }
);

export default sequelize