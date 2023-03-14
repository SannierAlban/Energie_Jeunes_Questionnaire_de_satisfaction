import { generateQuiz } from "./questionHtmlGenerator";

export function generateNavBar(allQuizName, quizMap) {
    let toInject = "";
    for (let i = 0; i < allQuizName.length; i++) {
        toInject += `
        <li class="nav-item">
            <a class="nav-link btn-${i == 0 ? "light" : "secondary"}" id="${allQuizName[i]}" href="#">${allQuizName[i]}</a>
        </li>
        `
    }
    document.getElementById('nav').innerHTML = toInject;

    for (let i = 0; i < allQuizName.length; i++) {
        document.getElementById(allQuizName[i]).addEventListener('click', function () {
            generateQuiz(quizMap.get(allQuizName[i]))

            for (let r = 0; r < allQuizName.length; r++) {
                document.getElementById(allQuizName[r]).classList.replace("btn-light", "btn-secondary")
            }
            this.classList.add("btn-light")
        });
    }


}