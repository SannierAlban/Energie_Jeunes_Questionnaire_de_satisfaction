import { getAllQuizMap } from './getQuiz.js'
import { generateNavBar } from './navBarHtmlGenerator.js';

// https://vitejs.dev/guide/static-deploy.html

var allQuizName = ["Questionnaire élève AAC collège", "Questionnaire élève AAC lycée", "Questionnaire élève CAPO", "Questionnaire élève CM2"]
var quizMap = getAllQuizMap(allQuizName);

generateNavBar(allQuizName, quizMap)
