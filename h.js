let lesson_list = [];
let kanji_list = [];
let word_list = [];
let popup;
let section_kanji = document.getElementById("section_kanji");
let search_input = document.getElementById("search_input");
let button_kanji = document.getElementById("button_kanji");
let bminna = document.getElementById("bminna");
let section_minna = document.getElementById("section_minna");
let select_lesson = document.getElementById("select_lesson");

All();
search_input.addEventListener("keydown",e=>{
    if (e.code == "Enter"){
        kanji_search();
    }
});
// e.code="Enter"
let search_list = [];
popup = document.getElementById("PopUp");
readFile("日本語 - ぼＢ.tsv", "KANJI");
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
        rei: row[i][3],
        exemple: row[i][4],
        Francais:row[i][5]
      };
      kanji_list.push(kanji);
       //list.push(row[i][0]);
       
    }
    kanji_search();
}

function createMinna(pFile) {
    let row = pFile.split(/\r\n|\n/);
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        if (row[i][0][0] == "@") {
            let lesson = row[i][0].split("@");
            lesson_list.push(lesson[1]);
        } else {
            let kanji = {
                id : i-1,
                kanji: row[i][0],
                kana: row[i][1],
                french: row[i][2],
                lesson: row[i][3]
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
    console.log(lesson_list);
}

function OpenPopUp(id, liste){
    popup.style.display = "block";
    popup.innerHTML = "";
    let innerHTML;
    innerHTML = `
    <div id = "divkanji"><p>${liste[id].kanji}</p></div>
    <p class = "popupkanji_p"><span>音読み : </span>${liste[id].onyomi}</p> 
    <p class = "popupkanji_p"><span>訓読み : </span>${liste[id].kunyomi}</p>
    <p class = "popupkanji_p"><span>れい : </span>${liste[id].rei}</p> 
    <p class = "popupkanji_p"><span>例 : </span>${liste[id].exemple}</p> 
    <p class = "popupkanji_p"><span>フランス語 : </span>${liste[id].Francais}</p>
    `;
    popup.innerHTML = innerHTML;
    // popup.innerHTML = kanji_list[id].kanji

}
function closepopup(){
    popup.style.display = "none";
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
    section_minna.style.display = "flex";
    n_keyboard_container.style.display = "none";


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

}

function Start(){

    switch (select_type.value){
    case "kanji_to_hiragana":
        n_keyboard_container.style.display = "flex";
        console.log("test")
        break;
    case "fr_to_kana":
        n_keyboard_container.style.display = "flex";
        console.log("test2")
        break;
    case "kanji_to_kami":
        n_keyboard_container.style.display = "none";
        break;
    }

}