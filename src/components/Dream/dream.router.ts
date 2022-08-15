import Routers from "../../common/router.interface";
import {Application} from "express";
import ApplicationResources from "../../common/application-resources.interface";
import DreamController from "./dream.controller";

export default class DreamRouter implements Routers {
    public setupRoutes(app: Application, resources: ApplicationResources) {
        const dreamController = new DreamController(resources);

        app.get("/dreams", dreamController.getAllDreams.bind(dreamController));
        app.get("/dream/types", dreamController.getAllDreamTypes.bind(dreamController));
    }
}