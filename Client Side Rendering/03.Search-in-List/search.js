
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js'

const townsRoot = document.getElementById("towns");// document.querySelector('#towns');
const resultRoot = document.getElementById("result");//document.querySelector('#result');
document.querySelector("button").addEventListener("click", search);
// <button>Search</button>

update();

function updateCount() {
   const matches = document.querySelectorAll(".active");
   const countEl = matches ? html`<p>${matches.length} matches found</p>` : '';
   render(countEl, resultRoot)
}
function searchTemplate(townsName, match) {
   const ul = html`
   <ul>
      ${townsName.map(townName => createLiTemplate(townName, match))}
   </ul>`
   return ul;
}
function createLiTemplate(town, match) {
   const li = html`
   <li class="${(match && town.includes(match)) ? " active" : ""}">${town}</li>
`
// ${repeat(towns, town => html`<li>${town}</li>`)}

//match && ако нямаме нищо написано да не match всичките градове
   //<li class="${(match && town.toLocaleLowerCase().includes(match)) ? " active" : "" }">${town}</li>
   //The search should be  not case-insensitive.
   return li;
}
function update(text) {
   const ul = searchTemplate(towns, text);
   render(ul, townsRoot);
}
function search(e) {
   //debugger
   const textNode = document.getElementById('searchText')
   const text = textNode.value
   // const text = textNode.value.toLocaleLowerCase();//The search should be  not case-insensitive.
   update(text);
   updateCount();
   textNode.value = "";
}
//второ решение

// import { render, html } from 'https://unpkg.com/lit-html?module';
// import { repeat } from 'https://unpkg.com/lit-html/directives/repeat.js?module';
// import { towns } from './towns.js';
 
 
// const townsDiv = document.getElementById('towns');
// const button = document.querySelector('button');
// button.addEventListener('click', search);
// const renderTowns = () => html`
// <ul> 
//    ${repeat(towns, town => html`<li>${town}</li>`)}
// </ul>`
 
// render(renderTowns(), townsDiv);
 
// function search() {
//    const searchText = document.getElementById('searchText');
//    const townsList = townsDiv.querySelectorAll('li');
//    let count = 0;
//    townsList.forEach(t => {
//       t.classList.remove('active');
//       if (t.textContent.includes(searchText.value)) {
//          t.classList.add('active');
//          count++;
//       }
//    })
//    document.getElementById('result').textContent = `${count} matches found`;
// }