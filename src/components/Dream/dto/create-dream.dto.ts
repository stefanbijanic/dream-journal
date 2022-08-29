import Ajv from "ajv";
import addFormats from "ajv-formats";
import {DreamTypes} from "../dream.entity";

const ajv = new Ajv();
addFormats(ajv);

interface CreateDreamDto {
    title: string;
    dreamType: DreamTypes;
    description: string;
    date: Date;
}

const CreateDreamDtoVerification = ajv.compile({
    type: "object",
    properties: {
        title: {
            type: "string",
            minLength: 2,
            maxLength: 32,
        },
        dreamType: {
            type: "string",
            enum: [
                DreamTypes.NORMAL_DREAM,
                DreamTypes.DAYDREAMS,
                DreamTypes.FALSE_AWAKENING_DREAMS,
                DreamTypes.LUCID_DREAMS,
                DreamTypes.NIGHTMARES,
            ],
        },
        description: {
            type: "string",
            minLength: 2,
        },
        date: {
            type: "string",
            format: "date",
        },
    },
    required: [
        "title",
        "dreamType",
        "description",
        "date",
    ],
    additionalProperties: false,
})

export {CreateDreamDto}
export {CreateDreamDtoVerification}