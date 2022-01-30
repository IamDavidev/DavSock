//mongo 
import { config } from 'dotenv'
config()
import mongoose from 'mongoose'
import { noteSchema } from './schemas/noteSchema'


const DB_URI_MONGO = process.env.URI_DB

export const MongoConnect = mongoose.connect(DB_URI_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connected to mongodb')
}).catch(err => {
    console.error('error connecting to mongodb', err)
})

export const Note = mongoose.model('Note', noteSchema)