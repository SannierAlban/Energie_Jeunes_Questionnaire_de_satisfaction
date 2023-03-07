let nb = 0;

export function generateQuiz(questions) {
    let quizHTML = '';

    console.log(questions)

    quizHTML += '<table class="table table-light table-striped"><tbody>'
    quizHTML += '<tr class="form-group"><th class="col-4">Nom du fichier :</th><th class="col-4"><input type="text" id="fileName"></th></tr>'
    questions.forEach((question) => {
        quizHTML += `<tr class="form-group">
<th class="col-4">${question.title}</th>`;
        question.responses.forEach((response) => {
            let inputType = question.isSingleAnswerQuestion ? 'radio' : 'checkbox';
            quizHTML += `<th class="form-check form-check-inline cel">
<input class="form-check-input" type="${inputType}" name="${question.title}" id="${question.title}-${response}" value="${response}">
<label class="form-check-label d-block" for="${question.title}-${response}">${response}</label>
</th>`;
        });
        quizHTML += `</tr>`;
    });
    quizHTML += `</tbody></table>`
    quizHTML += `<div class="container text-center mb-5 ">
                    <div class="row justify-content-evenly"> 
                        <button class="col-3 btn btn-primary" id="submitButton">Saisir la prochaine fiche</button>
                        <div class="col">Nombre de saissie actuel :<div id="nbSaissi">0</div></div>
                        <button class="col-3 btn btn-danger" id="finishButton">Générer un tableau Excel</button>
                    </div>
                </div>    `;

    document.getElementById('body').innerHTML = quizHTML;

    let responses = {};
    document.getElementById('submitButton').addEventListener('click', function () {
        questions.forEach((question) => {
            let inputs = document.getElementsByName(question.title);
            inputs.forEach((input) => {
                if (input.checked) {
                    if (!responses[question.title]) {
                        responses[question.title] = {};
                    }
                    if (!responses[question.title][input.value]) {
                        responses[question.title][input.value] = 0;
                    }
                    responses[question.title][input.value]++;
                }
            });
            inputs.forEach((input) => {
                input.checked = false;
            });
        });
        document.getElementById("nbSaissi").innerHTML = (nb += 1);
    });

    document.getElementById('finishButton').addEventListener('click', function () {
        questions.forEach((question) => {
            let inputs = document.getElementsByName(question.title);
            inputs.forEach((input) => {
                if (input.checked) {
                    if (!responses[question.title]) {
                        responses[question.title] = {};
                    }
                    if (!responses[question.title][input.value]) {
                        responses[question.title][input.value] = 0;
                    }
                    responses[question.title][input.value]++;
                }
            });
            inputs.forEach((input) => {
                input.checked = false;
            });
        });

        let csv = 'Title;Response;Count\n';
        Object.keys(responses).forEach((title) => {
            Object.keys(responses[title]).forEach((response) => {
                csv += `${title};${response};${responses[title][response]}\n`;
            });
        });

        let blob = new Blob([csv], { encoding: "UTF-8", type: "text/csv" });
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = document.getElementById('fileName').value + '.csv';
        link.click();

        document.getElementById("nbSaissi").innerHTML = (nb = 0);
        responses = {};
    });
}
