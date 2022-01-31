const socket = io()

// DOM elements
const $form = document.querySelector('#formCrud')
const $notes = document.querySelector('#notes')


// new Card Note
function RenderNote(note) {
    const item = document.createElement('div')
    item.classList.add('item')
    item.innerHTML = `
    <div class="note">
        <h1 class="noteTitle">${note.title}</h1>
        <p class="noteContent">${note.content}</p>
        <button class="btnDelete" data-id=${note._id}>Delete</button>
        <button class="btnEdit" data-id=${note._id}>Edit</button>
    </div>
    `

    if (note.important) {
        item.classList.add('noteImportant')
    }

    $notes.appendChild(item)
}
