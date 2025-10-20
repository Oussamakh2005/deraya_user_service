import { ZodSchema } from "zod"

const schemaParser = (data : object , schema : ZodSchema ) => {
    try {
        const validated = schema.parse(data);
        return validated;
    }catch{
        return null;
    }
}

export default schemaParser;