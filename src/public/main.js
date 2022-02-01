const socket = io()

// DOM elements
const $form = document.querySelector('#formCrud')
const $notes = document.querySelector('#notes')
const $btndelete = document.querySelector('#btndelete')
const $itemsNotes = document.querySelectorAll('.item')
const $btnAdd = document.querySelector('#btnAdd');


const $formTitle = $form.elements.title;
const $formContent = $form.elements.content;
const $formImportant = $form.elements.important;


// new Card Note
function RenderNote(note) {
    const item = document.createElement('div');

    item.classList.add('item');

    item.innerHTML = `
    <div class="note">
        <h1 class="noteTitle">${note.title}</h1>
        <p class="noteContent">${note.content}</p>
        <button    class="btn btnDelete" data-id=${note._id}>Delete</button>
        <button  class="btn btnEdit" data-id=${note._id}>Edit</button>
    </div>
    `;

    const $btndelete = item.querySelector('.btnDelete');
    const $btnEdit = item.querySelector('.btnEdit');

    $btndelete.addEventListener('click', () => {
        const id = $btndelete.getAttribute('data-id');
        socket.emit('client:delete', id)
    })

    $btnEdit.addEventListener('click', () => {
        const id = $btnEdit.getAttribute('data-id');
        socket.emit('client:edit', id);
    })

    if (note.important) {
        item.classList.add('noteImportant')
    }

    $notes.appendChild(item)
}

