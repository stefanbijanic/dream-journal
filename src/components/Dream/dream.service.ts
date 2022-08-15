import {Dream, DreamTypes} from "./dream.entity";
import {CreateDreamDto} from "./dto/create-dream.dto";
import {EditDreamDto} from "./dto/edit-dream.dto";

export default class DreamService {
    public async getAllDreams() {
        const dreams = await Dream.find()
        return dreams;
    }

    public async getAllDreamTypes() {
        return Object.values(DreamTypes);
    }

    public async createDream(data: CreateDreamDto) {
        try {
            const dream = Dream.create({
                dream_name: data.dreamName,
                dream_type: data.dreamType,
                description: data.description,
                date: data.date,
            })

            await dream.save();

            return dream;
        } catch (error) {

        }
    }

    public async getDreamById(dreamId: number) {
        try {
            const dream = await Dream.findOneBy({
                dream_id: dreamId,
            })

            return dream;
        } catch (error) {
            
        }
    }

    public async editDreamById(dreamId: number, data: EditDreamDto) {
        try {
            const dream = await Dream.findOneBy({
                dream_id: dreamId,
            })

            dream.dream_name = data.dreamName;
            dream.dream_type = data.dreamType;
            dream.description = data.description;
            dream.date = data.date;

            await dream.save();

            return dream;
        } catch (error) {
            
        }
    }

    public async deleteDreamById(dreamId: number) {
        try {
            const result = await Dream.delete({
                dream_id: dreamId,
            })

            return result;
        } catch (error) {
            
        }
    }
}