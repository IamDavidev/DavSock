
// evento para renderizar las notas de la base de datos
socket.on('server:allnotes', (notes) => {
    $notes.innerHTML = ' '
    notes.map(note => {
        RenderNote(note)
    })
})

// evento para renderizar las notas despues de eliminar una nota de la base de datos
socket.on('server:rendernotes', (notes) => {
    $notes.innerHTML = ''
    notes.map(note => {
        RenderNote(note)
    })
})

// evento para agregar notas a la base de datos

$form.addEventListener('submit', e => {
    e.preventDefault();
    
    // creando objeto con los valores del formulario
    if ($formTitle.value.trim() === '' || $formContent.value.trim() === '') {
        alert('title and content are required')
        return
    }

    const title = $formTitle.value
    const content = $formContent.value
    const important = $formImportant.chekend
    const note = {
        title,
        content,
        important
    }

    $formTitle.value = ''
    $formContent.value = ' '
    $formImportant.chekend = false


    // enviando objeto al servidor
    socket.emit('client:addnote', note)


})

// renderizar nueva nota 
socket.on('server:addnote', note => {
    RenderNote(note)
})
