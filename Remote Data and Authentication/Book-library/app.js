const url = 'http://localhost:3030/jsonstore/collections/books';
document.getElementById("loadBooks").addEventListener("click", loadAllBooks);
const tbody = document.querySelector("tbody");
const submitBtn = document.querySelector('form button');
const h3 = document.querySelector('form h3');
let id;


document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(event) {
    event.preventDefault();
    debugger
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const author = formData.get('author');
    const formBtn = document.querySelector('form button');

    if (!title || !author) {
        return;
    }

    formBtn.textContent === 'Submit'
        ? response = await getResponse('post', url, { title, author })
        : response = await getResponse('put', `${url}/${id}`, { title, author });

    if (!response.ok) {
        throw new Error('Error in submit');
    }

    h3.textContent = 'FORM';
    submitBtn.textContent = 'Submit';
    loadAllBooks()
}
async function loadAllBooks() {
    debugger
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error while loads all books');
        }

        const data = await response.json();

        tbody.innerHTML = '';
        Object.entries(data).forEach(book => {
            const author = book[1].author;
            const title = book[1].title;
            const key = book[0]
                ; createBookRecord([key, { title, author }])
        })
    } catch (error) {
        alert(error.message);
    }

}
function createBookRecord([key, { title, author }]) {
    const tr = htmlGenerator("tr", "", tbody);
    if (!title || !author) {
        return;
    }
    const tdTitle = htmlGenerator("td", `${title}`, tr);
    const tdAutor = htmlGenerator("td", `${author}`, tr);
    const tdAction = htmlGenerator("td", "", tr);
    htmlGenerator("button", "Edit", tdAction)
    htmlGenerator("button", "Delete", tdAction)
    tdAction.id = key;
    document.querySelector('input[name=title]').innerHTML = ""
    document.querySelector('form')[1].textContent = "";
    submitBtn.textContent = 'Submit';
}

function onSendMsg() {
    const title = document.querySelector('input[name=title]');
    const author = document.querySelector('input[name=author]')

    const body = {
        author: author.value,
        content: title.value
    };
    createMsg(body);
    author.value = "";
    content.value = "";
};
async function getResponse(methodType, url, data) {
    const response = await fetch(url, {
        method: methodType,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response;
};
function htmlGenerator(tag, content, parent) {
    let el = document.createElement(tag);
    el.textContent = content;

    if (parent) {
        parent.appendChild(el);
    }
    return el;
};