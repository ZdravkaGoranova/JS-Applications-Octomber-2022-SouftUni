import { html, render } from '../node_modules/lit-html/lit-html.js';

const url = `http://localhost:3030/jsonstore/advanced/dropdown`
const menuRoot = document.getElementById("menu");

const form = document.querySelector("form");
form.addEventListener("submit", onSubmit)

onLoadContent()

async function onLoadContent() {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error")
    }
    const data = await response.json();
    const result = Object.values(data).map(x => createOptionTemp(x))
    render(result, menuRoot)
}

function createOptionTemp(option) {
    return html`
<option value="${option._id}">${option.text}</option>
`
}

function onSubmit(e) {
    e.preventDefault();
    const value = document.getElementById("itemText").value;
    value && addItem(value)
}

async function addItem(data) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify({ text: data })
    })
    form.reset();
    onLoadContent();
}





