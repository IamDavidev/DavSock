
// evento para renderizar las notas de la base de datos
socket.on('server:allnotes', (notes) => {
    $notes.innerHTML = ' '
    notes.map(note => {
        RenderNote(note)
    })
})
let edit = false
// evento para renderizar las notas despues de eliminar una nota de la base de datos
socket.on('server:rendernotes', (notes) => {
    $notes.innerHTML = ''
    console.log($notes);
    notes.map(note => {
        RenderNote(note)
    })
})

// evento para agregar notas a la base de datos
const title = $formTitle.value
const content = $formContent.value
const important = $formImportant.chekend

$form.addEventListener('submit', e => {
    e.preventDefault();
    // creando objeto con los valores del formulario
    if ($formTitle.value.trim() === '' || $formContent.value.trim() === '') {
        alert('title and content are required')
        return
    }
    const note = {
        title,
        content,
        important
    }
    $formTitle.value = ''
    $formContent.value = ' '
    $formImportant.chekend = false

    // enviando objeto al servidor
    if (!edit) {
        socket.emit('client:addnote', note)
    }
})

// renderizar nueva nota 
socket.on('server:addnote', note => {
    RenderNote(note)
})

socket.on('server:edit', note => {
    const { title, content, important } = note
    $formTitle.value = title
    $formContent.value = content
    $formImportant.chekend = important
    $btnAdd.innerHTML = 'Edit'

    $btnAdd.classList.add('btnEdit')
    let edit  = true 
})
//evento para editar notas de la base de datos

