import mongoose from "mongoose";
export const AddressSchema = new mongoose.Schema({
    address_line_1: String,
    address_line_2: String,
    landmark: String,
    city: String,
    state: String,
    country: String,
    zip: Number,
},{_id: false});