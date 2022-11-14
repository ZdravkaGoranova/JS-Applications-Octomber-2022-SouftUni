function attachEvents() {
    const btnSend = document.getElementById("submit");
    btnSend.addEventListener('click', onSendMsg);

    const btnRefresh = document.getElementById("refresh");
    btnRefresh.addEventListener('click', getAllMsg);
}
function renderMsg(data) {
    const content = Object.values(data).map(entry => `${entry.author}: ${entry.content}`).join("\n");
    const textArea = document.getElementById("messages");
    textArea.innerHTML = content;//textContent
    debugger
};
function onSendMsg() {
    const author = document.querySelector('input[name=author]');
    const content = document.querySelector('input[name=content]');

    const body = {
        author: author.value,
        content: content.value
    };
    createMsg(body);
    author.value = "";
    content.value = "";
};
async function getAllMsg() {
    const url = `http://localhost:3030/jsonstore/messenger`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error");
    }
    const data = await response.json();
    renderMsg(data);
};
async function createMsg(body) {
    const url = `http://localhost:3030/jsonstore/messenger`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(body)
    });
    if (!response.ok) {
        throw new Error("Error");
    }
    // const data = await response.json();
    getAllMsg();
}
attachEvents();