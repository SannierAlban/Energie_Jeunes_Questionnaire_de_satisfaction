import { generateQuiz } from "./questionHtmlGenerator";

export function generateNavBar(allQuizName, quizMap) {
    let toInject = "";
    for (let i = 0; i < allQuizName.length; i++) {
        toInject += `<a class="nav-link" id="${allQuizName[i]}">${allQuizName[i]}</a>`
    }
    document.getElementById('nav').innerHTML = toInject;

    for (let i = 0; i < allQuizName.length; i++) {
        document.getElementById(allQuizName[i]).addEventListener('click', function () {
            generateQuiz(quizMap.get(allQuizName[i]))
        });
    }
}