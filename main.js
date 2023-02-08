function getQuizzData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "quizz.txt", false);
    xhr.send();
    var lines = xhr.responseText.split("\n");
    var quizzData = [];
    for (var i = 0; i < lines.length; i++) {
        var lineData = lines[i].replace('\n', '').split(";");
        var question = {
            title: lineData[0],
            isSingleAnswerQuestion: lineData[1] === "true",
            responses: []
        };
        for (var j = 2; j < lineData.length; j++) {
            question.responses.push(lineData[j]);
        }
        quizzData.push(question);
    }
    console.log(quizzData)
    console.log(quizzData[0].isSingleAnswerQuestion)
    return quizzData;
}

function generateQuiz(questions) {
    let quizHTML = '';

    quizHTML += '<table class="table table-light table-striped"><tbody>'

    questions.forEach((question) => {
        quizHTML += `<tr class="form-group">
                            <th class="col-4">${question.title}</th>`;
        question.responses.forEach((response) => {
            let inputType = question.isSingleAnswerQuestion ? 'radio' : 'checkbox';
            quizHTML += `<th class="form-check form-check-inline">
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
                        <button class="col-3 offset-6 btn btn-danger" id="finishButton">Générer un tableau Excel</button>
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
    });

    document.getElementById('finishButton').addEventListener('click', function () {
        let csv = 'Title;Response;Count\n';
        Object.keys(responses).forEach((title) => {
            Object.keys(responses[title]).forEach((response) => {
                csv += `${title};${response};${responses[title][response]}\n`;
            });
        });

        let blob = new Blob([csv], { type: 'text/csv' });
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'result.csv';
        link.click();
    });
}

var quizzData = getQuizzData();
generateQuiz(quizzData);