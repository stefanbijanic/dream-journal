import {createQueryBuilder, DataSource, DeleteResult, getConnection} from "typeorm";
import ErrorResponse from "../../common/error-response.interface";
import {Dream, DreamTypes} from "./dream.entity";
import {CreateDreamDto} from "./dto/create-dream.dto";
import {EditDreamDto} from "./dto/edit-dream.dto";

export default class DreamService {
    public async getAllDreams(): Promise<Dream[] | ErrorResponse> {
        try {
            const dreams = await Dream.find()
        return dreams;
        } catch (error) {
            return({
                errorCode: error?.errno,
                errorMessage: error?.sqlMessage,
            })
        }
    }

    public async getAllDreamTypes() {
        return Object.values(DreamTypes);
    }

    public async createDream(data: CreateDreamDto): Promise<Dream | ErrorResponse> {
        try {
            const dream = Dream.create({
                title: data.title,
                dream_type: data.dreamType,
                description: data.description,
                date: data.date,
            })

            await dream.save();

            return dream;
        } catch (error) {
            return({
                errorCode: error?.errno,
                errorMessage: error?.sqlMessage,
            })
        }
    }

    public async getDreamById(dreamId: number): Promise<Dream | ErrorResponse> {
        try {
            const dream = await Dream.findOneBy({
                dream_id: dreamId,
            })
            
            if(!dream) {
                return({
                    errorCode: 1001,
                    errorMessage: "Invalid Dream ID",
                })
            }
            
            return dream;
        } catch (error) {
            return({
                errorCode: error?.errno,
                errorMessage: error?.sqlMessage,
            })
        }
    }

    public async editDreamById(dreamId: number, data: EditDreamDto): Promise<Dream | ErrorResponse> {
        try {
            const dream = await Dream.findOneBy({
                dream_id: dreamId,
            })

            if(!dream) {
                return({
                    errorCode: 1001,
                    errorMessage: "Invalid Dream ID",
                })
            }

            dream.title = data.title;
            dream.dream_type = data.dreamType;
            dream.description = data.description;
            dream.date = data.date;

            await dream.save();

            return dream;
        } catch (error) {
            return({
                errorCode: error?.errno,
                errorMessage: error?.sqlMessage,
            })
        }
    }

    public async deleteDreamById(dreamId: number): Promise<DeleteResult | ErrorResponse> {
        try {
            const result = await Dream.delete({
                dream_id: dreamId,
            })

            return result;
        } catch (error) {
            return({
                errorCode: error?.errno,
                errorMessage: error?.sqlMessage,
            })
        }
    }

    public async dreamSearch(querySerch) {
        const page = querySerch?.page;
        const limit = querySerch?.limit;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        try {
            const dreams = await getConnection()
            .createQueryBuilder()
            .select("dream")
            .from(Dream, "dream")
            .where("dream.title LIKE :title AND dream.dream_type::text ILIKE :dream_type AND (dream.date BETWEEN :start_date AND :end_date)", {
                title: "%" + querySerch?.title + "%",
                dream_type: "%" + querySerch?.dream_type + "%",
                start_date:  querySerch?.start_date,
                end_date: querySerch?.end_date,
            })
            .getMany()

            const result = dreams.slice(startIndex, endIndex);

            return result;
        } catch (error) {
            return({
                errorCode: error?.errno,
                errorMessage: error?.sqlMessage,
            })
        }
    }
}