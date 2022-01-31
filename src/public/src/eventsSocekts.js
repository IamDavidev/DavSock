
// evento para renderizar las notas de la base de datos
socket.on('server:allnotes', (notes) => {
    notes.map(note => {
        RenderNote(note)
    })
})

// evento para agregar notas a la base de datos
$form.addEventListener('submit', e => {
    e.preventDefault();

    // extrayendo valores del formulario
    const title = e.target.elements.title ?? ' NO TITLE'
    const content = e.target.elements.content ?? ' NO CONTENT'
    const important = e.target.elements.important ?? false
    // creando objeto con los valores del formulario
    if (title.value.trim() === '' || content.value.trim() === '') {
        alert('title and content are required')
        return
    }
    const note = {
        title: title.value,
        content: content.value,
        important: important.checked
    }

    title.value = ' '
    content.value = ' '
    important.chekend = false

    // enviando objeto al servidor
    socket.emit('client:addnote', note)
})

// renderizar nueva nota 
socket.on('server:addnote', note => {
    RenderNote(note)
})