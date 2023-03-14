let nb = 0;

export function generateQuiz(questions) {
    let quizHTML = '';

    quizHTML += '<table class="table table-light table-striped"><tbody>'
    quizHTML += '<tr class="form-group"><th class="col-4">Nom du fichier Excel :</th><th class="col-4"><input type="text" id="fileName"></th></tr>'
    questions.forEach((question) => {
        quizHTML += `<tr class="form-group">
<th class="col-4">${question.title}</th>`;
        question.responses.forEach((response) => {
            let inputType = question.isSingleAnswerQuestion ? 'radio' : 'checkbox';
            quizHTML += `
        <th class="form-check form-check-inline cel">
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
                        <div class="col">Nombre de saisies :<div id="nbSaissi">0</div></div>
                        <button class="col-3 btn btn-danger" id="finishButton">Générer le fichier Excel</button>
                    </div>
                </div>    `;

    document.getElementById('body').innerHTML = quizHTML;

    let responses = {};
    initResponsesArray(questions, responses)

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
                input.checked = false;
            });
        });

        downloadExcelFile(responses, document.getElementById('fileName').value, "sheetName")
        document.getElementById("nbSaissi").innerHTML = (nb = 0);
        responses = {};
        initResponsesArray(questions, responses);

    });
}

function downloadExcelFile(data, filename, sheetName) {
    const fileExtension = ".xlsx";

    // Check if the file exists
    const fileExists = localStorage.getItem(filename) !== null;
    // Create a new workbook or load the existing one
    let workbook;
    if (fileExists) {
        // Load the existing file
        const fileData = localStorage.getItem(filename);
        const workbookData = new Uint8Array(atob(fileData).split('').map(c => c.charCodeAt(0)));
        workbook = XLSX.read(workbookData, { type: "array" });
    } else {
        // Create a new workbook
        workbook = XLSX.utils.book_new();
    }

    // Create a new workbook
    workbook = XLSX.utils.book_new();

    // Convert the data to an array of arrays
    const worksheetData = [];
    for (const key in data) {
        const row = [key];
        const values = data[key];
        for (const value in values) {
            const stringValue = value.trim();
            const numberValue = values[value];
            row.push(stringValue);
            row.push(numberValue);
        }
        worksheetData.push(row);
    }

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Convert the workbook to binary data
    const workbookData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Save the file to local storage
    const fileData = btoa(String.fromCharCode.apply(null, workbookData));
    localStorage.setItem(filename, fileData);

    // Download the file using FileSaver.js
    saveAs(new Blob([workbookData], { type: "application/octet-stream" }), filename + fileExtension);
}


function initResponsesArray(questions, responses) {
    questions.forEach((question) => {
        if (!responses[question.title]) {
            responses[question.title] = {}
            question.responses.forEach((response) => {
                responses[question.title][response] = 0
            })
        }
    })
}