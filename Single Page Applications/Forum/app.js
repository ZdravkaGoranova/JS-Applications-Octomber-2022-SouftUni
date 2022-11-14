//alert("work");// инструктира браузъра да покаже диалогов прозорец
// с незадължително съобщение и да изчака,
// докато потребителят го отхвърли.При някои условия - например,
// когато потребителят превключва табове - браузърът може да не показва диалогов прозорец
// или да не изчаква потребителя да го прекрати.

import { getTopics } from './load.js';
import { getFormData} from './create.js';
debugger
const container = document.querySelector('.container');
const main = document.querySelector('main');

window.addEventListener('load', showHome);
document.querySelector('a').addEventListener('click', showHome);


const form = document.querySelector('form');
form.addEventListener('submit', getFormData);

function showHome() {
   container.replaceChildren(main);

    getTopics();
}