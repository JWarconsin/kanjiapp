let lesson_list = [];
let kanji_list = [];
let word_list = [];
let random_list = [];
let failed_list = [];
let popup;
let section_kanji = document.getElementById("section_kanji");
let search_input = document.getElementById("search_input");
let button_kanji = document.getElementById("button_kanji");
let bminna = document.getElementById("bminna");
let section_minna = document.getElementById("section_minna");
let select_lesson = document.getElementById("select_lesson");
let devine_moi = document.getElementById("devine_moi");
let k_input = document.getElementById("keyboard_input");
let answer = document.getElementById("answer");
let btn_enter = document.getElementById("btn_enter");
let randomCurrentIndex = 0;
let waiting_answer = true;
let meaning = document.getElementById("meaning");
let Hscore = document.getElementById("Hscore");
let score = 0;
let section_failed = document.getElementById("section_failed");
let progression_bar = document.getElementById("progression_bar");
let button_vocabulaire = document.getElementById("button_vocabulaire");
let section_vocabulaire = document.getElementById("section_vocabulaire");
let popup_voc = document.getElementById("popup_voc");
let search_input_vocabulaire = document.getElementById("search_input_vocabulaire");
let progression = 1;
btn_enter.addEventListener("click",e=>{
    if(waiting_answer){
        Check();
  
    } else {
        Next();
    }
});
All();
search_input.addEventListener("keydown",e=>{
    if (e.code == "Enter"){
        kanji_search();
    }
});
// e.code="Enter"
let search_list = [];
popup = document.getElementById("PopUp");
readFile("日本語 - みんなの日本語.tsv", "MINNA");




function readFile(pFile, type) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                    switch (type) {
                        case "KANJI":
                            createKanji(tsvFile);
                            break;
                        case "MINNA":
                            createMinna(tsvFile);
                            break;
                    }
            }
        }
    }
    rawFile.send(null);    
}

function createKanji(pFile) {
    let row = pFile.split(/\r\n|\n/);
    let test;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
       // test = new Kanji(i, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4], row[i][5]);
       let kanji = {
        id : i-1,
        kanji: row[i][0],
        onyomi: row[i][1],
        kunyomi: row[i][2],
        Francais: row[i][3],
        wordlistdukanjiaufinal: []
      };
      for(let j = 0;j < word_list.length ; j++){
            if(word_list[j].kanji.includes(kanji.kanji)){
                kanji.wordlistdukanjiaufinal.push(word_list[j]);
            }
      }
      kanji_list.push(kanji);
       //list.push(row[i][0]);
    }
    kanji_search();
}

function createMinna(pFile) {
    let lesson;
    let row = pFile.split(/\r\n|\n/);
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        if (row[i][0][0] == "@") {
            lesson = row[i][0].split("@");
            lesson_list.push(lesson[1]);
        } else {
            let kanji = {
                id : i-1,
                kanji: row[i][0],
                kana: row[i][1],
                french: row[i][2],
                lesson: lesson[1]
            };
            word_list.push(kanji);
        }
    }
    kanji_search();
    select_lesson.innerHTML = "";
    let innerHTML = "";
    innerHTML += `<option value="0">Tout</option>`
    for(let i = 0;i < lesson_list.length ; i++)
    {
        innerHTML += `<option value="${i+1}">Leçon ${lesson_list[i]}</option>`
    }
    select_lesson.innerHTML = innerHTML;
    readFile("日本語 - ちえり.tsv", "KANJI");
}

function OpenPopUp(id, liste){
    popup.style.display = "block";
    popup.innerHTML = "";
    let innerHTML;
    innerHTML = `
    <div id = "divkanji"><p>${liste[id].kanji}</p></div>
    <p class = "popupkanji_p"><span>音読み : </span>${liste[id].onyomi}</p> 
    <p class = "popupkanji_p"><span>訓読み : </span>${liste[id].kunyomi}</p>
    <p class = "popupkanji_p"><span>フランス語 : </span>${liste[id].Francais}</p>
    `;
    innerHTML += `<p class = "popupkanji_p">`;
    let wordlistaufinal = "";
    for(let i = 0;i < liste[id].wordlistdukanjiaufinal.length ; i++){
        if(i == liste[id].wordlistdukanjiaufinal.length-1){
            wordlistaufinal += liste[id].wordlistdukanjiaufinal[i].kanji;
        }else{
            wordlistaufinal += liste[id].wordlistdukanjiaufinal[i].kanji+"、";
        }
    }
    innerHTML += wordlistaufinal;
     innerHTML += "</p>";
    popup.innerHTML = innerHTML;
    // popup.innerHTML = kanji_list[id].kanji

}

function OpenPopUp_voc(id, liste){
    popup_voc.style.display = "block";
    popup_voc.innerHTML = "";
    let innerHTML;
    innerHTML = `
    <div id = "divkanji"><p>${liste[id].kanji}</p></div>
    <p class = "popupkanji_p"><span>仮名 : </span>${liste[id].kana}</p>
    <p class = "popupkanji_p"><span>フランス語 : </span>${liste[id].french}</p> 
    `;
    popup_voc.innerHTML = innerHTML;
}

function closepopup(){
    popup.style.display = "none";
}

function closepopup_voc(){
    popup_voc.style.display = "none";
}

function kanji_search(){
    if(search_input.value == "")
    {
        button_kanji.innerHTML = "";
        let innerHTML = "";
        for(let i = 0;i < kanji_list.length-1 ; i++)
        {
            innerHTML += `<button id = "${i}" onclick="OpenPopUp(${i},kanji_list)">${kanji_list[i].kanji}</button>`

        }
        button_kanji.innerHTML = innerHTML;
    }
    else
    {
        search_list = [];
        for(let i = 0; i < kanji_list.length-1 ; i++)
        {
            if(kanji_list[i].kanji.includes(search_input.value))
            {
                search_list.push(kanji_list[i]);
            }
            else if(kanji_list[i].onyomi.includes(search_input.value))
            {
                search_list.push(kanji_list[i]);
            }
            else if(kanji_list[i].kunyomi.includes(search_input.value))
            {
                search_list.push(kanji_list[i]);
            }
            else if(kanji_list[i].Francais.includes(search_input.value))
            {
                search_list.push(kanji_list[i]);
            }

        }
        button_kanji.innerHTML = "";
        let innerHTML = "";
        for(let i = 0;i < search_list.length ; i++)
        {
            innerHTML += `<button id = "${i}" onclick="OpenPopUp(${i},search_list)">${search_list[i].kanji}</button>`
        }
        button_kanji.innerHTML = innerHTML;

    }

}

function minna(){
    section_kanji.style.display = "none";
    section_vocabulaire.style.display = "none";
    section_minna.style.display = "flex";
    n_keyboard_container.style.display = "none";
    meaning.style.display = "none";
    Hscore.style.display = "none";
    devine_moi.style.display = "none";
    answer.style.display = "none";
    progression_bar.style.width = `0%`;


    // n_keyboard_container
    // section_minna.innerHTML = "";
    // let innerHTML = "";
    // innerHTML = "<div id='divminna'>";
    
    // innerHTML += "</div>";
    // section_minna.innerHTML = innerHTML;
}

function All(){
    section_kanji.style.display = "flex";
    section_minna.style.display = "none";
    n_keyboard_container.style.display = "none";
    section_vocabulaire.style.display = "none";

}

function Start(){
    section_failed.innerHTML = "";
    score = 0;
    progression = 1;
    
    failed_list = [];
    meaning.innerHTML = "";
    randomCurrentIndex = 0;
    random_list = [];
    Hscore.style.display = "flex";
    for(let i = 0;i < word_list.length ; i++){
        if(word_list[i].lesson == select_lesson.value || select_lesson.value == 0)
        {
            random_list.push(word_list[i]);
        }
    }
    random_list = zt_randomizeList(random_list);
    answer.style.display = "flex";
    devine_moi.style.display = "flex";
    meaning.style.display = "flex";
    display_training();
    switch (select_type.value){
    case "kanji_to_hiragana":
        n_keyboard_container.style.display = "flex";
        devine_moi.style.fontSize = "50px";
        
        break;
    case "fr_to_kana":
        n_keyboard_container.style.display = "flex";
        devine_moi.style.fontSize = "15px";
        
        break;
    case "kanji_to_kami":
        n_keyboard_container.style.display = "none";
        Hscore.style.display = "none";
        break;
    }
    Hscore.innerHTML = `Score : ${score}/${random_list.length}`;
    progression_bar.style.width = `${(progression/random_list.length)*100}%`;
}

function zt_randomizeList(pList) {
    let tmp = 0;
    let rndIndex = 0;
    for (let i = 0; i < pList.length; i++) {
        rndIndex = rnd(0, pList.length);
        tmp = pList[i];
        pList[i] = pList[rndIndex];
        pList[rndIndex] = tmp;
    }

    return pList;
}

function rnd(pMin, pMax) { //? pMax NON COMPRIS
    return Math.floor(Math.random() * (pMax - pMin)) + pMin;
}

function display_training(){
    answer.innerHTML = "?"; 
    switch (select_type.value){
        case "kanji_to_hiragana":
            devine_moi.innerHTML = `${random_list[randomCurrentIndex].kanji}`;
            break;
        case "fr_to_kana":
            devine_moi.innerHTML = `${random_list[randomCurrentIndex].french}`;
            break;
        case "kanji_to_kami":
            devine_moi.innerHTML = `${random_list[randomCurrentIndex].kana}`;
            break;  
    }
}

function Next(){
    waiting_answer = true;
    if(k_input.value == random_list[randomCurrentIndex].kana){
    }else{
        
    }
    randomCurrentIndex++;
    progression++;
    if(randomCurrentIndex == random_list.length){
        randomCurrentIndex = 0;
        // alert(`score : ${score}/${random_list.length}`);
        n_keyboard_container.style.display = "none";
        let innerHTML = "";
        innerHTML = "<ul>";
        for(let i = 0;i < failed_list.length ; i++){
            innerHTML += `<li>${failed_list[i].kanji} : ${failed_list[i].kana} : ${failed_list[i].french}</li>`;
        }
        innerHTML += "</ul>";
        section_failed.innerHTML = innerHTML;
        section_failed.style.display = "flex";
        devine_moi.style.display = "none";
        answer.style.display = "none";
    }else{
    }
    display_training();
    meaning.innerHTML = "";
    k_input.value = "";
}

function Check(){
    waiting_answer = false;
    switch (select_type.value){
        case "kanji_to_hiragana":
            if(k_input.value == random_list[randomCurrentIndex].kana){
                answer.innerHTML = `<span class="vert">${random_list[randomCurrentIndex].kana}</span>`;
                score++;
            }else{
                failed_list.push(random_list[randomCurrentIndex])
                answer.innerHTML = `<span class="rouge">${random_list[randomCurrentIndex].kana}</span>`;
            }
            meaning.innerHTML = random_list[randomCurrentIndex].french;
            break;
        case "fr_to_kana":
            if(k_input.value == random_list[randomCurrentIndex].kana){
                answer.innerHTML = `<span class="vert">${random_list[randomCurrentIndex].kana}</span>`;
                score++;
            }else{
                answer.innerHTML = `<span class="rouge">${random_list[randomCurrentIndex].kana}</span>`;
            }
            meaning.innerHTML = random_list[randomCurrentIndex].kanji;
            break;
    }
     progression_bar.style.width = `${(progression/random_list.length)*100}%`;
     Hscore.innerHTML = `Score : ${score}/${random_list.length}`;
   
}

function vocabulaire(){
    section_kanji.style.display = "none";
    section_minna.style.display = "none";
    section_vocabulaire.style.display = "flex";
    search_input_vocabulaire.value = ""
    // button_vocabulaire.innerHTML = "";
    // let innerHTML = "";
    // innerHTML = ""
    // for(let i = 0;i < word_list.length ; i++){
    //     innerHTML += `<button id = "${i}" onclick="OpenPopUp_voc(${i},word_list)">${word_list[i].kanji}</button>`;
    // }
    // button_vocabulaire.innerHTML = innerHTML;
    vocabulaire_search();
}

function vocabulaire_search(){

    if(search_input_vocabulaire.value == ""){
        button_vocabulaire.innerHTML = "";
        let innerHTML = "";
        innerHTML = ""
        for(let i = 0;i < word_list.length ; i++){
            if (i != 0 && word_list[i].lesson != word_list[i-1].lesson){
                innerHTML += `<h2 class="Titre_separation">Leçon ${word_list[i].lesson}</h2>`;
            }
            innerHTML += `<button id = "${i}" onclick="OpenPopUp_voc(${i},word_list)">${word_list[i].kanji}</button>`;
        }
        button_vocabulaire.innerHTML = innerHTML;
    } else {
        search_list = [];
        for(let i = 0; i < word_list.length-1 ; i++)
        {
            if (i==1){console.log(word_list[i].kanji);}
            if(word_list[i].kanji.includes(search_input_vocabulaire.value))
            {
                search_list.push(word_list[i]);
            }
            else if(word_list[i].kana.includes(search_input_vocabulaire.value))
            {
                search_list.push(word_list[i]);
            }
            else if(word_list[i].french.includes(search_input_vocabulaire.value))
            {
                search_list.push(word_list[i]);
            }
        }
        button_vocabulaire.innerHTML = "";
        let innerHTML = "";
        for(let i = 0;i < search_list.length ; i++)
        {
            innerHTML += `<button id = "${i}" onclick="OpenPopUp_voc(${i},search_list)">${search_list[i].kanji}</button>`
        }
        button_vocabulaire.innerHTML = innerHTML;

    }

}