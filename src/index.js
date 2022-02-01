//envs
import { config } from 'dotenv'
config()
//expres 
import express from 'express';
import http from 'http'

// socket.io
import {
    Server as WebSocketServer
} from 'socket.io';

import { MongoConnect, Note } from './database/index'


const app = express()
const server = http.createServer(app)
const io = new WebSocketServer(server)
const PORT = process.env.PORT


app.use(express.static(__dirname + '/public'))



io.on('connection', (socked) => {
    console.log('connected socket io server')
    console.log(' id => ', socked.id)

    Note.find({}).then(notes => {
        socked.emit('server:allnotes', notes)
    })

    socked.on('client:addnote', (note) => {

        const { title, content, important } = note

        const newNote = new Note({
            title,
            content,
            important
        })

        newNote.save().then(() => {
            console.log('note saved => ', newNote)
        })

        io.emit('server:addnote', newNote)

    })
    socked.on('client:delete', (id) => {
        Note.findByIdAndRemove(id).then(() => {
            Note.find({}).then(notes => {
                io.emit('server:rendernotes', notes)

            })
        })
    })
})



server.listen(PORT, () => {
    console.log(`server on  PORT : ${PORT}`)
});