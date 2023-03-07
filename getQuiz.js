export function getAllQuizMap(allQuizName) {
    let quizMap = new Map();
    for (let i = 0; i < allQuizName.length; i++) {
        quizMap.set(allQuizName[i], getQuizData(allQuizName[i] + ".txt"))
    }
    return quizMap;
}

function getQuizData(fileName) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", fileName, false);
    xhr.send();
    var lines = xhr.responseText.split("\n");
    var quizData = [];
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
        quizData.push(question);
    }
    return quizData;
}
