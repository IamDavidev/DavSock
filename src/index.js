//expres 
import express from 'express';
import http from 'http'

// socket.io
import {
    Server as WebSocketServer
} from 'socket.io';

// mongo db connection
import {
    MongoClient
} from 'mongodb'
import {
    assert
} from 'assert';

// => url db mongo 
const url = 'mongodb+srv://admin:admin@cluster0.tjen3.mongodb.net/davsock?retryWrites=true&w=majority'

//mongoose 
import mongoose from 'mongoose'


const app = express()
const server = http.createServer(app)
const io = new WebSocketServer(server)
const PORT = process.env.PORT || 8000


app.use(express.static(__dirname + '/public'))
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('connected to mongo db')).catch(err => console.error(err))

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)





io.on('connection', (socked) => {
    console.log('connected socket io server')
    console.log(' id => ', socked.id)

    socked.on('client:addNote', (note) => {
        const { title, content, important } = note

        const newNote = new Note({
            title,
            content,
            important
        })

        newNote.save().then(()=> {
            console.log('note saved => ', newNote)
            mongoose.connection.close()

        })

        io.emit('server:addNote', newNote)

    })
})


// const Post = mongoose.model('Post', postSchema)

// Note.find({
//     title: 'title'
// })
//     .then(notes => {
//         console.log("allNote in db => ", notes)
//         mongoose.connection.close();
//     })




server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});