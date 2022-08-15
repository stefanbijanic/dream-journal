import {Request, Response, NextFunction} from "express";
import BaseController from "../../common/base-controller.interface";
import {CreateDreamDto, CreateDreamDtoVerification} from "./dto/create-dream.dto";
import {EditDreamDto, EditDreamDtoVerification} from "./dto/edit-dream.dto";

export default class DreamController extends BaseController {
    public async getAllDreams(req: Request, res: Response, next: NextFunction) {
        const allDreams = await this.services.dreamService.getAllDreams();
        res.send(allDreams);
    }

    public async getAllDreamTypes(req: Request, res: Response, next: NextFunction) {
        const dreamTypes = await this.services.dreamService.getAllDreamTypes();
        res.send(dreamTypes);
    }

    public async createDream(req: Request, res: Response, next: NextFunction) {
        const data: CreateDreamDto = req.body;

        if (!CreateDreamDtoVerification(data)) {
            res.status(400).send(CreateDreamDtoVerification.errors);
            return;
        }

        const createDream = await this.services.dreamService.createDream(data);

        res.send(createDream);
    }

    public async getDreamById(req: Request, res: Response, next: NextFunction) {
        const dreamId: number = +(req.params.id);

        const dream = await this.services.dreamService.getDreamById(dreamId);

        res.send(dream);
    }

    public async editDreamById(req: Request, res: Response, next: NextFunction) {
        const dreamId: number = +(req.params.id);
        const data: EditDreamDto = req.body;

        if (!EditDreamDtoVerification(data)) {
            res.status(400).send(EditDreamDtoVerification.errors);
            return;
        }

        const dream = await this.services.dreamService.editDreamById(dreamId, data);

        res.send(dream);
    }

    public async deleteDreamById(req: Request, res: Response, next: NextFunction) {
        const dreamId: number = +(req.params.id);

        const result = await this.services.dreamService.deleteDreamById(dreamId);

        res.send(result);
    }

    public async dreamSearch(req: Request, res: Response, next: NextFunction) {
        const querySearch = req.query;

        const dreams = await this.services.dreamService.dreamSearch(querySearch);

        res.send(dreams);
    }
}