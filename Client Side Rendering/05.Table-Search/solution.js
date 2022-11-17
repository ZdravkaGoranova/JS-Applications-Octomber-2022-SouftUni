import { html, render } from '../node_modules/lit-html/lit-html.js';

const url = `http://localhost:3030/jsonstore/advanced/table`
const bodyRoot = document.querySelector('tbody')

document.querySelector('#searchBtn').addEventListener('click', onClick);

getData()

async function  getData() {
   //debugger
   const response = await fetch(url);
   if (!response.ok) {
      throw new Error("Error")
   }
   const data = await response.json();
   const students = Object.values(data).map(st => createOptionTemp(st))
   //update(students);
   render(students, bodyRoot);
}

function createOptionTemp(el) {
   return html`
<tr id=${el._id} class=>
   <td>${el.firstName} ${el.lastName}</td>
   <td>${el.email}</td>
   <td>${el.course}</td>
</tr>`
}

// function update(student) {
//    render(student, bodyRoot);
// }

function onClick(e) {
   e.preventDefault();
   debugger
   const rows = document.querySelectorAll('tbody tr');
   const search = e.target.parentElement.children[0];// document.querySelector('#searchField')
   const searchedText = search.value.toLowerCase();

   for (let row of rows) {
      row.removeAttribute('class', 'select');
      const rowText = row.textContent.toLowerCase();

      if (rowText.includes(searchedText) && searchedText !== '') {
         row.className = 'select';
      }
   }
   search.value = '';
}

