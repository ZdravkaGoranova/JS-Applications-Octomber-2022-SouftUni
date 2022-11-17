import { html, render } from '../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';
const root = document.getElementById("allCats")
const catTemplate =
    html`<ul>
    ${cats.map(cat => creatCateCard(cat))}
    <ul>>
`
render(catTemplate, root)

function creatCateCard(cat) {
    return html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button @click="${showContent}" class="showBtn">Show status code</button>
        <div class="status" style="display: none" id="${cat.id}">
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>
`
}
function showContent(e) {
    const contentContiner = e.target.parentElement.children[1];
    const currentState = contentContiner.style.display;

    if (currentState === "none") {//  contact.active = !contact.active;  или  contentContiner.style.display = !contentContiner.style.display; НЕ СТАВА 
        contentContiner.style.display = "block";
        e.target.textContent = "Hide status code"
    } else {
        contentContiner.style.display = "none";
        e.target.textContent = "Show status code"
    }
}