
window.onload = attachEvents;

const url = 'http://localhost:3030/jsonstore/collections/students';
const tBody = document.querySelector("#results tbody");
const form = document.querySelector('#form');

function attachEvents() {
    form.addEventListener('submit', createStudent);
    getStudents();
}

async function getStudents() {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Errpr")
    }
    const data = await response.json();
    tBody.innerHTML = '';// tBody.replaceChildren();
    Object.values(data).forEach(stud => {
        const tr = htmlGenerator('tr', "", tBody);
        htmlGenerator('td', `${stud.firstName}`, tr)
        htmlGenerator('td', `${stud.lastName}`, tr)
        htmlGenerator('td', `${stud.facultyNumber}`, tr)
        htmlGenerator('td', `${stud.grade}`, tr)
    });
}
async function createStudent(e) {
    e.preventDefault();

    let info = new FormData(e.target);
    let firstName = info.get('firstName');
    let lastName = info.get('lastName');
    let facultyNumber = info.get('facultyNumber');
    let grade = info.get('grade');

    if (!firstName || !lastName || !facultyNumber || !grade) {
        alert('All fields are required!Have a free field!');
    } else {
        let bodyS = {
            firstName,
            lastName,
            facultyNumber,
            grade
        };
        await  request(url, bodyS);
        firstName.innerText='';
        grade = ""
        getStudents();
       
    }
}
async function  request(url, body) {
    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        throw new Error("Errpr")
    }
    return await response.json();
}
function htmlGenerator(tag, content, parent) {
    let el = document.createElement(tag);
    el.textContent = content;

    if (parent) {
        parent.appendChild(el);
    }
    return el;
}