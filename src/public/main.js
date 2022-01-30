const socket = io()

let renderNotes = true

    



const form = document.querySelector('#formCrud')
const notes = document.querySelector('#notes')


function RenderNote(note) {
    const item = document.createElement('div')
    item.classList.add('item')
    item.innerHTML = `
    <div class="note">
        <h1 class="title">${note.title}</h1>
        <p class="content">${note.content}</p>
        <button class="delete">Delete</button>
    </div>
    `

    if (note.important) {
        item.classList.add('noteImportant')
    }

    notes.appendChild(item)
}


form.addEventListener('submit', e => {
    e.preventDefault();
    // extrayendo valores del formulario
    const title = e.target.elements.title ?? ''
    const content = e.target.elements.content ?? ''
    const important = e.target.elements.important ?? false
    // creando objeto con los valores del formulario
    const note = {
        title: title.value,
        content: content.value,
        important: important.checked
    }
    // 
    title.value = ' '
    content.value = ' '
    important.chekend = false

    // enviando objeto al servidor
    socket.emit('client:addnote', note)
})


socket.on('server:addnote', note => {
    RenderNote(note)
})