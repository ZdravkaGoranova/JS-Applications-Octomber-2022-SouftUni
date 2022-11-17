import { render } from '../node_modules/lit-html/lit-html.js';
import { tableBodyTemplate, editFormTemplate, createFormTemplate } from './templates.js';

const body = document.querySelector("body");

render([
    tableBodyTemplate,
    createFormTemplate,
    editFormTemplate
], body);//показва в страницата създадените темплайти закачени към бодито