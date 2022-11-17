
import { editBook } from '../api.js';
import { loadBooks } from './catalog.js';
import { getBookById } from '../api.js';

export async function updateBook(e) {
    debugger
    e.preventDefault();

    const createForm = document.querySelector('#add-form');
    createForm.addEventListener('submit', getFormData);

    const editForm = document.querySelector('#edit-form');

    createForm.style.display = 'none';
    editForm.style.display = 'block';

   // const currentRow = e.target.parentElement.parentElement;
    const id = e.target.parentElement.parentElement.id;

    const currentBook = await getBookById(id);

    debugger
    editForm.querySelector('input[name=title]').value = currentBook.title;
    editForm.querySelector('input[name=author]').value = currentBook.author;

    editForm.addEventListener('submit', (e) => getFormData(e, id));
}

export async function getFormData(e, bookId) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { title, author } = Object.fromEntries(formData);
    if (!title || !author) {
        alert('All fields are required!');
        return;
    }
    const createForm = document.querySelector('#add-form');
    const editForm = document.querySelector('#edit-form');

    await editBook(bookId, { title, author });
    editForm.reset();
    createForm.style.display = 'block';
    editForm.style.display = 'none';

    loadBooks();
}