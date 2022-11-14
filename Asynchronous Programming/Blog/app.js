function attachEvents() {
    document.getElementById("btnLoadPosts").addEventListener("click", getPosts);
    document.getElementById("btnViewPost").addEventListener("click", getComments);

    async function getPosts() {
        const url = `http://localhost:3030/jsonstore/blog/posts`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error');
            }
            const data = await response.json();

            const selectOp = document.getElementById("posts");
            //selectOp.innerHTML = "";//зануляваме коментарите за да не се слеят с предишните коментари за предното избрано body
            //window.localStorage.setItem("post.id") за да не правим отново Get заявка за urlPosts/responsePo
            
            Object.values(data).forEach(post => {
                const op = document.createElement("option");
                op.value = post.id;
                op.textContent = post.title;
                selectOp.appendChild(op);
            }
            );
        } catch (error) {
            console.error(error.message);
        }
    }
    async function getComments() {
        const urlPosts = `http://localhost:3030/jsonstore/blog/posts`;
        const urlComments = `http://localhost:3030/jsonstore/blog/comments`;
        const selectedOp = document.getElementById("posts").selectedOptions[0];//взимаме селектнатия бутон
        const postTitle = document.getElementById("post-title");
        const postBody = document.getElementById("post-body");
        const postCom = document.getElementById("post-comments");
        postCom.innerHTML = "";//зануляваме коментарите за да не се слеят с предишните коментари за предното избрано body

        try {
            const responsePo = await fetch(urlPosts);
            if (!responsePo.ok) {
                throw new Error('Error');
            }
            const dataPo = await responsePo.json();

            Object.values(dataPo).forEach(post => {
                if (post.id === selectedOp.value) {
                    postTitle.innerHTML = post.title;
                    postBody.innerHTML = post.body;
                }
            });//const const a= Object.values(dataPo).find(post =>post.id === selectedOp.value);postTitle.innerHTML = a.title;postBody.innerHTML = a.body;

            const responseCom = await fetch(urlComments);
            if (!responseCom.ok) {
                throw new Error('Error');
            }
            const dataC = await responseCom.json();

            Object.values(dataC).forEach(comment => {
                debugger
                if (comment.postId === selectedOp.value) {
                    let li = htmlGenerator('li', `${comment.id}`, `${comment.text}`, postCom);//com.forEach(el=>
                    //let li = document.createElement(li);
                    // li.textContent = comment.text;li.id = comment.id;postCom.appendChild(li);)
                }
            });//const com = Object.values(dataC).filter(c => c.postId === selectedOp.value)
            //let li = htmlGenerator('li', `${com .id}`, `${com .text}`, postCom);

        } catch (error) {
            console.error(error.message);
        }
    }
    function htmlGenerator(tagName, id, text, parent) {
        let el = document.createElement(tagName);
        el.textContent = text;
        el.id = id;
        if (parent) {
            parent.appendChild(el);
        }
        return el;
    }
}
attachEvents();

// второ решение
// function attachEvents() {
//     const baseUrl = 'http://localhost:3030/jsonstore/blog/';
//     const posts = document.querySelector("#posts");
//     const postTitle = document.querySelector("#post-title");
//     const postBody = document.querySelector("#post-body");
//     const comments = document.querySelector("#post-comments");

//     document.querySelector("#btnLoadPosts").addEventListener('click', () => getPosts());
//     document.querySelector("#btnViewPost").addEventListener('click', () => viewPostDetails());

//     async function getPosts() {
//         try {
//             const response = await fetch(`${baseUrl}posts`);
//             if (!response.ok) {
//                 throw new Error('Error');
//             }
//             const data = await response.json();

//             posts.replaceChildren();
//             Object.values(data).forEach(x => {
//                 htmlGenerator('option', x.title, posts, x.id);
//             });
//         } catch (error) {
//             console.error(error.message);
//         }
//     }

//     async function viewPostDetails() {
//         try {
//             const res = await fetch(`${baseUrl}posts`);
//             if (!res.ok) {
//                 throw new Error('Error');
//             }
//             const allPosts = await res.json();

//             const id = posts.value;
//             const title = posts.options[posts.selectedIndex].text;
//             const body = Object.values(allPosts).find(x => x.title === title);

//             postTitle.textContent = title;
//             postBody.textContent = body.body;

//             const response = await fetch(`${baseUrl}comments`);
//             if (!response.ok) {
//                 throw new Error('Error');
//             }
//             const info = await response.json();

//             comments.replaceChildren();
//             Object.values(info).forEach(x => {
//                 if (id === x.postId) {
//                     const li = htmlGenerator('li', x.text, comments);
//                     li.id = x.id;
//                 }
//             });
//         } catch (error) {
//             console.error(error.message);
//         }
//     }

//     function htmlGenerator(tagName, content, parent, value) {
//         const el = document.createElement(tagName);
//         el.textContent = content;

//         if (parent) {
//             parent.appendChild(el);
//         }

//         if (value) {
//             el.setAttribute('value', value);
//         }
//         return el;
//     }
// }

// attachEvents();