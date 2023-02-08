(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();function s(){var c=new XMLHttpRequest;c.open("GET","quizz.txt",!1),c.send();for(var r=c.responseText.split(`
`),n=[],l=0;l<r.length;l++){for(var e=r[l].replace(`
`,"").split(";"),t={title:e[0],isSingleAnswerQuestion:e[1]==="true",responses:[]},o=2;o<e.length;o++)t.responses.push(e[o]);n.push(t)}return console.log(n),console.log(n[0].isSingleAnswerQuestion),n}function a(c){let r="";r+='<table class="table table-light table-striped"><tbody>',c.forEach(l=>{r+=`<tr class="form-group">
                            <th class="col-4">${l.title}</th>`,l.responses.forEach(e=>{let t=l.isSingleAnswerQuestion?"radio":"checkbox";r+=`<th class="form-check form-check-inline">
                      <input class="form-check-input" type="${t}" name="${l.title}" id="${l.title}-${e}" value="${e}">
                      <label class="form-check-label d-block" for="${l.title}-${e}">${e}</label>
                    </th>`}),r+="</tr>"}),r+="</tbody></table>",r+=`<div class="container text-center mb-5 ">
                    <div class="row justify-content-evenly"> 
                        <button class="col-3 btn btn-primary" id="submitButton">Saisir la prochaine fiche</button>
                        <button class="col-3 offset-6 btn btn-danger" id="finishButton">Générer un tableau Excel</button>
                    </div>
                </div>    `,document.getElementById("body").innerHTML=r;let n={};document.getElementById("submitButton").addEventListener("click",function(){c.forEach(l=>{let e=document.getElementsByName(l.title);e.forEach(t=>{t.checked&&(n[l.title]||(n[l.title]={}),n[l.title][t.value]||(n[l.title][t.value]=0),n[l.title][t.value]++)}),e.forEach(t=>{t.checked=!1})})}),document.getElementById("finishButton").addEventListener("click",function(){let l=`Title;Response;Count
`;Object.keys(n).forEach(o=>{Object.keys(n[o]).forEach(i=>{l+=`${o};${i};${n[o][i]}
`})});let e=new Blob([l],{type:"text/csv"}),t=document.createElement("a");t.href=window.URL.createObjectURL(e),t.download="result.csv",t.click()})}var u=s();a(u);
