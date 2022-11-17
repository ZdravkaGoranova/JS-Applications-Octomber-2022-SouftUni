import {deleteBookById } from '../api.js';
import { loadBooks} from './catalog.js';

export async function deleteBook(e) {
    debugger
    e.preventDefault();
    const currentBook = e.target.parentElement.parentElement;
 
    const id = e.target.parentElement.parentElement.id;
    await deleteBookById(id);// !!!!currentBook.remove();
    loadBooks();
}