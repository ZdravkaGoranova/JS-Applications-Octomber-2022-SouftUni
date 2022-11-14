
const url = `http://localhost:3030/jsonstore/advanced/articles/list`;
const main = document.getElementById("main");

async function solution() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error");
        }
        const data = await response.json();
        Object.values(data).forEach(el => {
            const divAcc = htmlGenerator("div", "", main, "accordion");

            const divHead = htmlGenerator("div", "", divAcc, "head");
            htmlGenerator("span", `${el.title}`, divHead, "");

            const btnMore = htmlGenerator("button", "More", divHead, 'button');
            btnMore.id = el._id;
            btnMore.addEventListener('click', (e) => showHiddenInfo(e));

            const divExtra = htmlGenerator("div", "", divAcc, "extra");
            htmlGenerator("p", "", divExtra);
        })
    } catch (error) {
        console.error(error.message);
    }
}
async function showHiddenInfo(e) {
    btnId = e.target.id;
    let div = e.target.parentNode.parentNode.querySelector(".extra");
    let p = div.querySelector('p');

    const url = `http://localhost:3030/jsonstore/advanced/articles/details/${btnId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error");
        }
        const data = await response.json();

        if (e.target.textContent === 'More') {
            div.style.display = 'block';
            p.textContent = data.content;
            e.target.textContent = 'Less';

        } else if (e.target.textContent === 'Less') {
            e.target.textContent = 'More';
            div.style.display = 'none';
        }
    } catch (error) {
        console.error(error.message);
    }
}
function htmlGenerator(tagName, content, parent, className) {
    let el = document.createElement(tagName);
    el.textContent = content;
    if (parent) {
        parent.appendChild(el);
    }
    if (className) {
        el.className = className;
    }
    return el;
}
solution();