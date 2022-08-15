import * as express from "express";
import "reflect-metadata";
import {createConnection} from "typeorm";
import Config from "./config/config";
import DreamRouter, * as dreamRoutes from './components/Dream/dream.router';
import Router from "./router";
import ApplicationResources from "./common/application-resources.interface";
import DreamService from "./components/Dream/dream.service";
import {Dream} from "./components/Dream/dream.entity";
import {CustomLogger} from "./common/custom-logger";

async function main() {
    const app: express.Application = express();
    let router = express.Router();

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
            logger: new CustomLogger(),
            entities: [
                Dream,
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
    
    const resources: ApplicationResources = {};
    resources.services = {
        dreamService: new DreamService(),
    }

    Router.setRoutes(app, resources, [
        new DreamRouter(),
    ])

    app.use((req, res) => {
        res.sendStatus(404);
    });

    app.use((err, req, res, next) => {
        res.status(err.status).send(err.type);
    });

    app.listen(Config.server.port, async () => {
        console.log(`Server running on port ${Config.server.port}`)
    });
}

main();