function attachEvents() {
    document.getElementById("btnLoad").addEventListener('click', onLoadAllRecord)//document.querySelector('#btnLoad').addEventListener('click', onLoadAllRecord);
    document.getElementById('btnCreate').addEventListener('click', heandleCreateRecord);
}
function heandleCreateRecord() {
    const personEl = document.getElementById("person");
    const phoneEl = document.getElementById("phone");

    onCreatReacord(personEl.value, phoneEl.value);
    personEl.value = "";
    phoneEl.value = "";
};
function renderRecords(data) {
    const ul = document.getElementById("phonebook");
    ul.innerHTML = "";
    Object.values(data).forEach(rec => {
        const li = document.createElement("li");
        li.textContent = `${rec.person}: ${rec.phone}`;
        li.setAttribute("data-id", rec._id);

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener('click', handleDelete)

        li.appendChild(btnDelete);
        ul.appendChild(li);
    });
};
function handleDelete(e) {
    const li = e.target.parentElement
    const id = li.getAttribute("data-id");
    deleteReacord(id);
    li.remove();
};
async function onLoadAllRecord() {
    const url = `http://localhost:3030/jsonstore/phonebook`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Errpr")
    }
    const data = await response.json();

    return renderRecords(data);
};
async function onCreatReacord(person, phone) {
    const url = `http://localhost:3030/jsonstore/phonebook`;
    const body = {
        person,
        phone
    };
    const headers = getHeader("POST", body);
    const response = await fetch(url, headers)
    if (!response.ok) {
        throw new Error("Error");
    }
    const data = await response.json();
    onLoadAllRecord();
    return data;
};
async function deleteReacord(id) {
    const url = `http://localhost:3030/jsonstore/phonebook/${id} `;

    const headers = getHeader("DELETE", null);
    const response = await fetch(url, headers);
    if (!response.ok) {
        throw new Error("Error");
    }
    const data = await response.json();
    return data;
}
function getHeader(method, body) {
    return {
        method: `${method}`,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
}
attachEvents();
//второ решение

// function attachEvents() {
//     document.querySelector('#btnLoad').addEventListener('click', getPhones);
//     document.querySelector('#btnCreate').addEventListener('click', setPhone);
// }

// async function getPhones() {
//     const url = 'http://localhost:3030/jsonstore/phonebook';
//     const phonebook = document.querySelector('#phonebook');
//   //  phonebook.replaceChildren();

//     const response = await fetch(url);
//     const data = await response.json();

//     Object.values(data).forEach(x => {
//         let li = htmlGenerator('li', `${x.person}: ${x.phone}`, phonebook);
//         let deleteBtn = htmlGenerator('button', 'Delete', li);
//         deleteBtn.setAttribute('id', x._id);
//         deleteBtn.addEventListener('click', (e) => deletePhone(e));
//     })
// }

// async function setPhone() {
//     const url = 'http://localhost:3030/jsonstore/phonebook';
//     const person = document.querySelector('#person');
//     const phone = document.querySelector('#phone');

//     if (person.value && phone.value) {
//         let info = {
//             "person": person.value,
//             "phone": phone.value
//         }
//         await request(url, info);

//         getPhones();
//         person.value = '';
//         phone.value = '';
//     } else {
//         alert('All fields are required');
//     }
// }

// async function deletePhone(e) {
//     const url = 'http://localhost:3030/jsonstore/phonebook';

//     let id = e.target.getAttribute('id');
//     e.target.parentNode.remove();

//     await fetch(`${url}/${id}`, {
//         method: 'DELETE',
//     });
// }
// async function request(url, body) {
//     if (body) {
//         let post = {
//             method: 'POST',
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify(body)
//         }
//         let response = await fetch(url, post);
//         return await response.json();
//     }
// }
// function htmlGenerator(tag, content, parent) {
//     let el = document.createElement(tag);
//     el.textContent = content;
//     if (parent) {
//         parent.appendChild(el);
//     }
//     return el;
// }
// attachEvents();