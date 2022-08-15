import * as express from "express";
import {createConnection} from "typeorm";
import Config from "./config/config";

async function main() {
    const app: express.Application = express();

    app.use(express.json());

    try {
        await createConnection({
            type: "postgres",
            host: Config.database.host,
            port: Config.database.port,
            username: Config.database.user,
            password: Config.database.password,
            database: Config.database.database,
            synchronize: true,
            logging: true,
            entities: [

            ]
        });

        console.log("Connected to Postgres")
    } catch (error) {
        console.log(error);
    }

    app.use(
        Config.server.static.route,
        express.static(Config.server.static.path, {
            index: Config.server.static.index,
            cacheControl: Config.server.static.cacheControl,
            maxAge: Config.server.static.maxAge,
            etag: Config.server.static.etag,
            dotfiles: Config.server.static.dotfiles,
        }),
    );

    app.use((req, res) => {
        res.sendStatus(404);
    });

    app.use((err, req, res, next) => {
        res.status(err.status).send(err.type);
    });

    app.listen(Config.server.port, async () => {
        console.log("Server running on port 3001")
    });
}

main();