
import { html } from '../node_modules/lit-html/lit-html.js';
import { loadBooks } from './views/catalog.js';
import { getFormData } from './views/create.js';
import { deleteBook } from './views/delete.js';
import {updateBook  } from './views/edit.js';

const tableBodyTemplate = html`

<body>
    <button id="loadBooks" @click=${loadBooks}>LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
</body>`;

const createFormTemplate = html`

<form @submit=${getFormData} id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>`;

const editFormTemplate = html`

    <form id="edit-form">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Save">
    </form>`;

function tableRow(books) {
    // debugger
    return html`${Object.entries(books).map(book => createTemp(book))}`;
}
function createTemp(book) {
    return html`
    <tr id="${book[1][0]}">
        <td>${book[1][1].title}</td>
        <td>${book[1][1].author}</td>
        <td>
            <button @click=${updateBook}>Edit</button>
            <button @click=${deleteBook}>Delete</button>
        </td>
    </tr>`
}
export { tableBodyTemplate, createFormTemplate, editFormTemplate, tableRow, createTemp }