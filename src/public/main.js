const socket = io()



const form = document.querySelector('#formCrud')
const notes = document.querySelector('#notes')





form.addEventListener('submit', e => {
    e.preventDefault();
    // extrayendo valores del formulario
    const title = e.target.elements.title.value
    const content = e.target.elements.content.value
    const important = e.target.elements.important.checked ?? false

    // creando objeto con los valores del formulario
    const note = {
        title,
        content,
        important
    }

    //  * evet para enviar el objeto note al servidor


    socket.emit('client:addNote', note)
    notes.appendChild(item)
})


socket.on('server:addNote', note => {
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
})