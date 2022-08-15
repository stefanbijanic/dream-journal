import {Dream, DreamTypes} from "./dream.entity";

export default class DreamService {
    public async getAllDreams() {
        const dreams = await Dream.find()
        return dreams;
    }

    public async getAllDreamTypes() {
        return Object.values(DreamTypes);
    }
}