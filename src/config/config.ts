import ConfigInterface from "../common/config.interface";
import * as dotenv from "dotenv";

const dotEnv = dotenv.config();

if (dotEnv.error) throw ".env configuration error: " + dotEnv.error;

const Config: ConfigInterface = {
    server: {
        port: +(process.env?.SERVER_PORT),
        static: {
            route: "/static",
            path: "./static/",
            cacheControl: false,
            dotfiles: "deny",
            etag: false,
            index: false,
            maxAge: 360000,
        }
    },

    database: {
        host: process.env?.DATABASE_HOST,
        port: +(process.env?.DATABASE_PORT),
        user: process.env?.DATABASE_USER,
        password: process.env?.DATABASE_PASSWORD,
        database: process.env?.DATABASE_DATABASE,
        charset: process.env?.DATABASE_CHARSET,
        timezone: process.env?.DATABASE_TIMEZONE,
    }
}

export default Config