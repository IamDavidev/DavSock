console.log('hola mundo')

socket.on('server:allnotes', (notes) => {
    console.log('server:allnotes => ', notes, )
    notes.map(note => {
        RenderNote(note)
    })
})
