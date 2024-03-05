import mongoose from "mongoose";
import { AddressSchema } from "./Address.model.js";

export const StudentSchema = new mongoose.Schema({
    stdName : {
        type: String,
    },
    fatherName: {
        type: String,
    },
    motherName: {
        type: String,
    },
    stdAge : { type : Number},
    homeAddress: {
        type: AddressSchema,
    },
    regDate: { type: Date},
    delete: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model.Students || mongoose.model('Student', StudentSchema);