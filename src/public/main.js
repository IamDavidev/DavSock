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
        <h1 class="title">${note.title}</h1>
        <p class="content">${note.content}</p>
        <button class="delete">Delete</button>
    </div>
    `

    if (note.important) {
        item.classList.add('noteImportant')
    }

    $notes.appendChild(item)
}
