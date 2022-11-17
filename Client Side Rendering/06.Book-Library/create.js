
import { createBook} from '../api.js';
import {loadBooks } from './catalog.js';

export async function getFormData(e) {
    e.preventDefault();
    debugger
    const form = e.target;
    const formData = new FormData(form);
    const { title, author } = Object.fromEntries(formData)

    if (!title || !author) {
        alert('All fields are required!');
        return;
    }
    await createBook({ title, author });
    form.reset();
    loadBooks();
}