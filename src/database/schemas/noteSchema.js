import {Schema} from 'mongoose'


export const noteSchema = new Schema({
    title: String,
    content: String,
    important: Boolean,
}) 

