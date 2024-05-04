import dotenv from 'dotenv';
dotenv.config();
const _config={
    db:{
        url:process.env.DB_URL
    }
}
const dbConfig=Object.freeze(_config)
export {dbConfig}