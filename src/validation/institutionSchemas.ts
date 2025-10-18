import z from "zod";

export const newInstitutionSchema = z.object({
    name : z.string(),
    type : z.enum(["HOSPITAL","CLINIC"]),
    address : z.string(),
});