import {Request, Response, NextFunction} from "express";
import BaseController from "../../common/base-controller.interface";

export default class DreamController extends BaseController {
    public async getAllDreams(req: Request, res: Response, next: NextFunction) {
        const allDreams = await this.services.dreamService.getAllDreams();
        res.send(allDreams);
    }

    public async getAllDreamTypes(req: Request, res: Response, next: NextFunction) {
        const dreamTypes = await this.services.dreamService.getAllDreamTypes();
        res.send(dreamTypes);
    }
}